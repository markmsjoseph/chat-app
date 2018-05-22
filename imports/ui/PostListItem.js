import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
//https://stackoverflow.com/questions/44009618/uncaught-typeerror-cannot-read-property-push-of-undefined-react-router-dom
// import { Route , withRouter} from 'react-router-dom';
//      <Route exact path="/" render={(props) => <Dashboard {...props} handleClick={_this.handleClick} />} />

// import createHistory from 'history/createBrowserHistory';
// const history = createHistory();


export default class PostListItem extends React.Component {



    constructor(props) {
      super(props);
      this.state = {
        isOpen:false
      };
    }


    savePost(){
      Meteor.call('post.save', this.props._id)
      this.setState({
        isOpen:true
      });
    }


    render() {
      const customStyles = {content : {  top: '50%',  left: '50%',right: 'auto',bottom : 'auto',marginRight : '-50%',  transform : 'translate(-50%, -50%)'}};

      let redirectToChat = `/chat/${this.props.userId}/${this.props.username}`;
       if(Meteor.userId() == this.props.userId){
         console.log("TRYING TO MESSAGE YOURSELF");
         redirectToChat = '';
       }


      return (
          <div className = "wrapper wrapper__post">
                <div className="item">

                  <h3 className='item__post-title'> {this.props.name} </h3>
                  <p> Price: ${this.props.price} </p>
                  <p> Posted by: {this.props.username} </p>
                  <img className ='item__image' src={this.props.image}/><br/>
                    <p>{this.props.description} </p>

                  <button className='savepost__button' onClick={this.savePost.bind(this)}>Save Post </button>
                  <Modal  style={customStyles} isOpen = {this.state.isOpen} contentLabel="Remove post">
                    <p>Your post has been saved </p>
                              <button onClick={()=>this.setState({isOpen:false})}>Ok</button>

                  </Modal>

                  <Link to ={redirectToChat} className='goToChat__button'>go to chat</Link>
                </div>
          </div>
      );
    }

  }
