import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {Session} from 'meteor/session';
// IN ORDER TO VERIFY EMAILS ETC, WE NEED AN SMTP ACCOUNT. THIS STEP WAS SKIPPED but
// THIS URL HAS DATA ON IT https://themeteorchef.com/tutorials/sign-up-with-email-verification AND
//https://docs.meteor.com/api/passwords.html#Accounts-verifyEmail

export default class Login extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        error:''
      };
    }

    componentWillMount() {
      Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id
    }

    onSubmitHandler(e){
        e.preventDefault();
        //all refs are stored on the this.refs object, trim is to take off all leading and after spaces
        let email = this.refs.myEmail.value.trim();
        let password = this.refs.myPassword.value.trim();

        //takes 3 arguments, first is object with email or login,
        Meteor.loginWithPassword({email}, password, (err)=>{
          if(err){
            this.setState({error:"Login Failed. Check Email and Password"});
          }
          else{
            this.setState({error:''});
          }

        });

    }

    onSubmitHandlerRegister(e){
        e.preventDefault();
        //all refs are stored on the this.refs object, trim is to take off all leading and after spaces
        let email = this.refs.myEmail.value.trim();
        let password = this.refs.myPassword.value.trim();
        let username = this.refs.userName.value.trim();



        if(password.length < 6){
          return this.setState({error: 'Password must be more than 6 characters long'})
        }
        //accounts.createUser takes 2 args, first is an obj, an email and password, second arg is a callback,
        //second arg gets called with an err arg, if there are any it is displayed
        Accounts.createUser({username, email, password}, (err)=>{
          if(err){
            this.setState({error:err.reason});
          }
          else{
            this.setState({error:''});
          }

        });


    }

    render() {
          return (
            <div className="container">
                  <div className="row">
                  <div className="boxed-view">
                        <div className="boxed-view__box">
                                  <Tabs defaultIndex={1} onSelect={index => console.log(index)}>

                                         <TabList>
                                           <h1> Welcome to the poerty app</h1>
                                           <Tab>Login</Tab>
                                           <Tab>Register</Tab>
                                         </TabList>

                                         <TabPanel>
                                              <h4 className="login-error">  {this.state.error ? <p>{this.state.error}</p> : undefined }</h4>
                                                <h3>Already have an account? You can login below</h3>
                                                <form onSubmit={this.onSubmitHandler.bind(this)} noValidate>
                                                    <input className = 'form-control form-control-lg' type="email" name="email" ref = "myEmail" placeholder = "email"/>
                                                    <br></br>
                                                    <input className = 'form-control form-control-lg' type="password" name="password" ref = "myPassword" placeholder= "password"/>
                                                    <br></br>
                                                    <button className='button'> Login</button>
                                                </form>
                                         </TabPanel>

                                         <TabPanel>
                                              <h3>Register with us below to login</h3>
                                                <p className="login-error">  {this.state.error ? <p>{this.state.error}</p> : undefined }</p>

                                               <form onSubmit={this.onSubmitHandlerRegister.bind(this)} noValidate>


                                                      <input className = 'form-control form-control-lg' type="text" name="userName" ref = "userName" placeholder = "User Name"/>
                                                      <br></br>

                                                      <input className = 'form-control form-control-lg' type="email" name="email" ref = "myEmail" placeholder = "Email"/>
                                                     <br></br>

                                                     <input className = 'form-control form-control-lg' type="password" name="password" ref = "myPassword" placeholder= "Password"/>
                                                     <br></br>

                                                      <button className=' button'> Create Account</button>
                                               </form>

                                        </TabPanel>
                                  </Tabs>
                      </div>
                      </div>
                          </div>
            </div>
        );
    }

}
