import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';


if(Meteor.isServer){
  //meteor publish only runs on server not both client and server
  //publish takes a string and a function determining what data each client should have access too
  //must use es5 function because we need this binding
  Meteor.publish("userList", function () {
            return Meteor.users.find({});
     })
}


Accounts.validateNewUser((user)=>{
const email = user.emails[0].address;
      try{
        new SimpleSchema({
          email:{
            type:String,
            regEx:SimpleSchema.RegEx.Email
          }
        }).validate({email:email})
      }
      catch(e){
          throw new Meteor.Error(400, e.message);
      }

  return true;
});
