// import React from 'react';
// import { Link } from 'react-router-dom';
// import {Accounts} from 'meteor/accounts-base';
//
// export default class Signup extends React.Component {
//
//   constructor(props){
//     super(props);
//     this.state = {
//       error:''
//     };
//   }
//
//   componentWillMount() {
//       if(Meteor.userId()) {
//       console.log("No user but trying to go back: In ComponentDidMount from Signup.js");
//         this.props.history.push('/home');
//
//       }
//   }
//
//   onSubmitHandler(e){
//       e.preventDefault();
//       //all refs are stored on the this.refs object, trim is to take off all leading and after spaces
//       let email = this.refs.myEmail.value.trim();
//       let password = this.refs.myPassword.value.trim();
//
//       //accounts.createUser takes 2 args, first is an obj, an email and password, second arg is a callback,
//       //second arg gets called with an err arg, if there are any it is displayed
//       Accounts.createUser({email, password}, (err)=>{
//         if(err){
//           this.setState({error:err.reason});
//         }
//         else{
//           this.setState({error:''});
//         }
//
//       });
//
//       // this.setState({
//       //   error:"something went wrong"
//       // });
//   }
//
//
//   render() {
//     return <div>
//               <h1>Login or Signup</h1>
//               {this.state.error ? <p>{this.state.error}</p> : undefined }
//               <form onSubmit={this.onSubmitHandler.bind(this)}>
//                   <input type="email" name="email" ref = "myEmail" placeholder = "email"/>
//               <br></br>
//                   <input type="password" name="password" ref = "myPassword" placeholder= "password"/>
//                   <br></br>
//                   <button> Create Account</button>
//               </form>
//               <Link to ="/">Already Have an Account?</Link>
//           </div>
//   }
// }
