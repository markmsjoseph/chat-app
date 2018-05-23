import React from 'react';
import { Link } from 'react-router-dom';
import PrivateHeader from './PrivateHeader';



export default class Home extends React.Component {

  constructor(props) {
    super(props);
        this.state = {
        username:""
        };
  }

    componentWillMount() {
        if(!Meteor.userId()) {
          console.log("No user but trying to go back: In ComponentDidMount from Link.js");
          this.props.history.push('/');
        }

    }

    componentDidMount() {
      this.postTracker =  Tracker.autorun(() => {
          console.log("USERNAME-----------------------:", Meteor.user());
          if(Meteor.user()){
            this.setState(()=>{
              return{
                username:Meteor.user().username
              }
            });
          }
          else{
            console.log("No User");
          }
      });

    }


    render() {
      return (
        <div>
        <div className = "wrapper wrapper-top">
                    <PrivateHeader  title="BoilerPlate"  />
                    <p className = "logged-in-as">Logged in as:{this.state.username} </p>


            </div>




        </div>
      );
    }


  }
