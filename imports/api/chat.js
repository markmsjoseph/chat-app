import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Chat = new Mongo.Collection('chat');

if(Meteor.isServer){
  //meteor publish only runs on server not both client and server
  //publish takes a string and a function determining what data each client should have access too
  //must use es5 function because we need this binding
  Meteor.publish('specificChatSubscription', function(){
    //we get the user id because of the this binding from es5 functions, the user calling this publication will have that id
    return Chat.find({});
  })
}

Meteor.methods({
      'chat.create'(sellerId){
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        console.log("CREATING A NEW CHAT");
        Chat.insert({
          senderId: this.userId,
          receiverId: sellerId[0],
          recieverIdName:sellerId[1],
          senderIdName:sellerId[2],
          date:new Date(),
          messages:[]
        })
      },
      // 'chat.insertMsg'(receiverId,msgArray){
      //   if(!this.userId){
      //     throw new Meteor.Error('not authorized');
      //   }
      //   // console.log("RECIEVER ID", receiverId[0]);
      //   console.log("UPDATING CHAT", receiverId[1]);
      //
      //   //update the chat with sender and reciever id's matching, and completely overwrite the msges array with the new one
      //   Chat.update({senderId:this.userId, receiverId:receiverId[0]},
      //   {$set:{messages : receiverId[1]}}
      //   )
      // }

      'chat.insertMsg'(arrayOfData){
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        // console.log("RECIEVER ID", receiverId[0]);
    //     console.log("UPDATING CHAT SENDER", senderID);
    // console.log("UPDATING CHAT REC", receiverId);
    //     console.log("UPDATING CHAT MSG", msgArray);
        //update the chat with sender and reciever id's matching, and completely overwrite the msges array with the new one
        Chat.update({senderId:arrayOfData[0], receiverId:arrayOfData[1]},
        {$push:{messages : arrayOfData[2]}}
        )
      },

      'chat.remove'(postId){
        //if user is not logged in throw error
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        //update specific post where user id matches and push the id of the post you are saving to the cart array of this specific post item
        Chat.remove({_id : postId})
      }

});
