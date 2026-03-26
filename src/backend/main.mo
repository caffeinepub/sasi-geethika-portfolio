import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Migration "migration";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

(with migration = Migration.run)
actor {
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Message type for contact form
  type Message = {
    name : Text;
    email : Text;
    message : Text;
  };

  // Message storage
  let messages = Map.empty<Nat, Message>();
  var nextMessageId = 0;

  // Certificate type
  type CertificateRecord = {
    name : Text;
    blob : Storage.ExternalBlob;
  };

  let certificates = Map.empty<Nat, CertificateRecord>();
  var nextCertificateId = 0;

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact form submission - accessible to everyone including guests
  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    let newMessage : Message = {
      name;
      email;
      message;
    };
    messages.add(nextMessageId, newMessage);
    nextMessageId += 1;
  };

  // Certificate upload - admin only
  public shared ({ caller }) func uploadCertificate(title : Text, blob : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upload certificates");
    };

    let newCertificate : CertificateRecord = {
      name = title;
      blob;
    };
    certificates.add(nextCertificateId, newCertificate);
    nextCertificateId += 1;
  };

  // Get all contact messages - admin only (contains private information)
  public query ({ caller }) func getAllMessages() : async [Message] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    messages.values().toArray();
  };

  // Get all certificates - public access
  public query ({ caller }) func getAllCertificates() : async [CertificateRecord] {
    certificates.values().toArray();
  };

  // Get specific certificate - public access
  public query ({ caller }) func getCertificate(id : Nat) : async ?CertificateRecord {
    certificates.get(id);
  };
};
