import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";

actor {
  type Message = {
    name : Text;
    email : Text;
    message : Text;
  };

  let messages = Map.empty<Nat, Message>();
  var nextId = 0;

  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    let newMessage : Message = {
      name;
      email;
      message;
    };
    messages.add(nextId, newMessage);
    nextId += 1;
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    messages.values().toArray();
  };
};
