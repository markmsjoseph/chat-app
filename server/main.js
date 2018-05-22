import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
// You have only the stub method when you use Meteor.methods you need a method on the server side, whereas the client side is optional to simulate latency compensation.

// The way a Meteor call works is when you run a call it will immediately fire the client side one to simulate some UI effect while a response is returned from the server, then the server side call is fired.
//
// This exists so that you can have a method where the response seems immediate, even though the server may actually take time to respond.
//
// Since you don't have the corresponding server side method, when Meteor sends the call to the server it can't find it and responds with the error Method not found [404]
//
// If you want to have a method where only the client side has an effect you should use a standard js method instead, without the var keyword to ensure its globally scoped (and can be accessed from other client side files)
//

import '../imports/api/post';
import '../imports/api/images';
import '../imports/api/users';
import '../imports/api/chat';//needed because meteor method calls on the client need corresponding calls on the server
Meteor.startup(() => {


});
