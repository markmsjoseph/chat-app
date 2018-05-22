import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Images} from '../api/images';
import Modal from 'react-modal';
// let holder = document.getElementById("charsLeft");
// let commentsInput = document.getElementById("postDes");
// function updateRemainingCharacters() {
//
//     var charsLeft = 300 - commentsInput.value.length;
//     holder.innerText = "(" + charsLeft + ")";
//
// }
// //
// commentsInput.addEventListener('keyup', updateRemainingCharacters);
// commentsInput.addEventListener('paste', updateRemainingCharacters);


export default class AddPostForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error:'',
      characterCount:0,
      nameCharacterCount:0,
      countError:"",
      nameError:"",
      numberError:'',
        isOpen:false
    };
  }


  onSubmit(e){
    const name = this.refs.nameRef.value.trim();
    const priceString = parseInt(this.refs.priceRef.value.trim());
    const price = priceString;
    const description = this.refs.descriptionRef.value.trim();
    const image = this.refs.imageRef.value.trim();
    const username = Meteor.user().username;


    // let users = Meteor.users.find({}).fetch();
    // let username = users[0].username;
    // console.log("NEW USERSSSSS", username);

    // var file = document.getElementById('myFile').files[0];
    // console.log("FILE TO INSERT:", file);
    // //g we're doing is passing the browser-provided File object
    // // to Images.insert(). This will create a FS.File from the File,
    // //link it with the Images FS.Collection, and then immediately begin uploading the data to the server with reactive progress updates.
    // Images.insert(file, function (err, fileObj) {
    //   if(err){
    //       console.log(err);
    //   }
    //   else {
    //     console.log("Everything went well");
    //   }
    //
    //   // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
    // });
    // console.log("Insert complete");

      e.preventDefault();

      //call meteor method post.insert with the data which is stored in description
      Meteor.call('post.insert', [name, price, description, image, username], (err, result)=>{
        if(err){
            this.setState({error:err.reason});
          }
          else{
            this.setState({error:''});
          }

      });

      // Meteor.call('image.insert', fileObj)
      //clear whatever value wa,s in inputbox
      this.refs.nameRef.value = '';
      this.refs.priceRef.value = '';
      this.refs.descriptionRef.value = '';
      this.refs.imageRef.value = '';

     // var file = document.getElementById('myFile').files[0];
     // console.log("FILE", file);
    // if(file){
    //
    //     fsFile = new FS.file(file)
    //     console.log("Has image");
    //
    //     UserImages.insert(fsFile, function(err, result) {
    //       if(err){
    //         throw new Meteor.Error(err);
    //       }
    //       else {
    //         console.log("No error");
    //       }
    //     })
    // }

    console.log("UPDATED()(()())(()()()()))()()())");
  }


dispayCharacters(e){
  let count = e.target.value.length;
  if(count>= 40){
      this.setState({countError:"Character Count Exceeded"});
  }
  else{
      this.setState({countError:""});
  }
    this.setState((previousState)=> {
          return {
             characterCount:  count
          };
    });
}

nameCharacters(e){
  let count = e.target.value.length;
  if(count>= 30){
      this.setState({nameError:"Character Count Exceeded"});
  }
  else{
      this.setState({nameError:""});
  }
    this.setState((previousState)=> {
          return {
             nameCharacterCount:  count
          };
    });
}

numberCharacters(e){
  let count = e.target.value.length;
  if(count>= 8){
      this.setState({numberError:"Character Count Exceeded"});
  }
  else{
      this.setState({numberError:""});
  }
}


  render() {
    return (
      <div className="addpost__WrapperForm">

                      <form  onSubmit={this.onSubmit.bind(this)}>
                        <p className="login-error">  {this.state.error ? <p>{this.state.error}</p> : undefined }</p>


                            <label className ="addPostForm__label">Post Name</label>
                                <p className="login-error">  {this.state.nameError} </p>
                              <p>{this.state.nameCharacterCount}/30 characters left</p>
                            <input className = 'form-control form-control-lg' type="text" ref="nameRef" placeholder="Post Name" onKeyUp={this.nameCharacters.bind(this)} /><br/>

                            <label className ="addPostForm__label">Post Price</label>
                            <p className="login-error">  {this.state.numberError} </p>
                                <p>Must be number(no special characters) </p>
                            <input className = 'form-control form-control-lg' type="text" ref="priceRef" placeholder="Enter Price" onKeyUp={this.numberCharacters.bind(this)} /><br/>
                            <p id="holder"> </p>


                            <label className ="addPostForm__label">Post Description</label>
                            <p className="login-error">  {this.state.countError} </p>
                            <p>{this.state.characterCount}/40 characters left</p>
                            <input id= "postDes" className = 'form-control form-control-lg' type="text" ref="descriptionRef" placeholder="Enter Description" onKeyUp={this.dispayCharacters.bind(this)}/><br/>

                            <label className ="addPostForm__label">Enter URL for post image</label>
                            <input id= "myFile" className = 'form-control form-control-lg' type="text" ref="imageRef"  placeholder= "Upload Image"/><br/>

                            <button className='addPost__form__Submit' onClick={()=>this.setState({isOpen:true})}>Add Post </button>




                            <Modal isOpen = {this.state.isOpen} contentLabel="Add Post">
                                  <p>Once you add a post, it will not show up in the list of all post immediately. It needs to be approved by the admin first. </p>


                                <button onClick={()=>this.setState({isOpen:false})}>Ok</button>
                            </Modal>


                      </form>

      </div>
    );
  }


  }















  // import React from 'react';
  // import { Meteor } from 'meteor/meteor';
  // import {UserImages} from '../api/images';
  //
  // export default class AddPostForm extends React.Component {
  //
  //
  //   onSubmit(e){
  //     const name = this.refs.nameRef.value.trim();
  //     const price = this.refs.priceRef.value.trim();
  //     const description = this.refs.descriptionRef.value.trim();
  //     const image = this.refs.imageRef.value.trim();
  //     console.log("image:", image);
  //     e.preventDefault();
  //     if(description){
  //       //call meteor method post.insert with the data which is stored in description
  //       Meteor.call('post.insert', [name, price, description, image])
  //       //clear whatever value was in inputbox
  //       this.refs.nameRef.value = '';
  //       this.refs.priceRef.value = '';
  //       this.refs.descriptionRef.value = '';
  //       this.refs.imageRef.value = '';
  //     }
  //      // var file = document.getElementById('myFile').files[0];
  //      // console.log("FILE", file);
  //     // if(file){
  //     //
  //     //     fsFile = new FS.file(file)
  //     //     console.log("Has image");
  //     //
  //     //     UserImages.insert(fsFile, function(err, result) {
  //     //       if(err){
  //     //         throw new Meteor.Error(err);
  //     //       }
  //     //       else {
  //     //         console.log("No error");
  //     //       }
  //     //     })
  //     // }
  //
  //
  //   }
  //
  //   render() {
  //     return (
  //       <div>
  //       <div className="container centered">
  //
  //                   <div className="col-lg-12 col-md-8 col-sm-12">
  //                       <form className=" form" onSubmit={this.onSubmit.bind(this)}>
  //
  //                             <label >Post Name</label>
  //                             <input className = 'form-control form-control-lg' type="text" ref="nameRef" placeholder="Post Name"/><br/>
  //
  //                             <label >Post Price</label>
  //                             <input className = 'form-control form-control-lg' type="text" ref="priceRef" placeholder="Enter Price"/><br/>
  //
  //                             <label >Post Description</label>
  //                             <input className = 'form-control form-control-lg' type="text" ref="descriptionRef" placeholder="Enter Description"/><br/>
  //
  //                             <label >Enter URL for post image</label>
  //                             <input className = 'form-control form-control-lg' type="text" ref="imageRef"  placeholder= "Upload Image"/><br/>
  //
  //                             <button className='btn btn-primary btn-lg'>Add Post </button>
  //                       </form>
  //                   </div>
  //
  //               </div>
  //       </div>
  //     );
  //   }
  //
  //
  //   }
