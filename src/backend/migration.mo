import Map "mo:core/Map";
import Storage "blob-storage/Storage";

module {
  type Message = {
    name : Text;
    email : Text;
    message : Text;
  };

  type Certificate = {
    name : Text;
    blob : Storage.ExternalBlob;
  };

  type OldActor = {
    messages : Map.Map<Nat, Message>;
    nextId : Nat;
  };

  type NewActor = {
    messages : Map.Map<Nat, Message>;
    nextMessageId : Nat;
    certificates : Map.Map<Nat, Certificate>;
    nextCertificateId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    {
      messages = old.messages;
      nextMessageId = old.nextId;
      certificates = Map.empty<Nat, Certificate>();
      nextCertificateId = 0;
    };
  };
};
