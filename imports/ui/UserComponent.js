import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class UserComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isOpen:false
      };
    }

    deleteUser(){
      Meteor.call('users.removeUser', this.props.userId)
    }


    render() {
      return (
        <div>
          <p>User Name: {this.props.username} </p>
          <p>Email: {this.props.email} </p>
          <p>User ID: {this.props.userId} </p>
          <button className='addPost__form__Submit' onClick={()=>this.setState({isOpen:true})}>Remove User</button>

          <Modal isOpen = {this.state.isOpen} contentLabel="Remove User">
                <p>Are you sure you want to completely remove user {this.props.userId} ? </p>

              <button onClick={this.deleteUser.bind(this)}>Yes</button>
              <button onClick={()=>this.setState({isOpen:false})}>No</button>
          </Modal>
        </div>
      );
    }


  }
