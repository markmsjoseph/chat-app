import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});
//To allow users to submit files to the FS Collection, you must create an allow rule in Server code:
  if(Meteor.isServer){
    Images.allow({
    'insert': function () {
      // add custom authentication code here
      return true;
    },
    update: function () {
       // add custom authentication code here
      return true;
      }
  });

}

Meteor.methods({
      //we use ' ' to use the . operator on the object property video 73 4:50
      'image.insert'(image){
        console.log('INSERTING IMAGE', image);
        //if user is not logged in throw error
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        Images.insert({
            image:image
        })
      }

});
