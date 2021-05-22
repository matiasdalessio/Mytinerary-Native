import React, { useEffect, useState } from "react";
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";


const Activity = ({commentInfo, userLogged, setCommentState, itineraryId, editOrRemoveComment, props}) =>{ 

    const[editingComment, setEditComment]= useState({comment: commentInfo.comment , editing : false})

    var commentId = commentInfo._id
    // const userData = JSON.parse(localStorage.getItem('userLogged'))
    // const userLS= {
    //   token: localStorage.getItem('token'),
    //   ...userData
    // }
    const enterToSend = ((e) =>{
      e.key === 'Enter' && send()    
    })

    useEffect(()=> {
      setEditComment({...editingComment,
        editing:false})
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[commentInfo])

    const editOrRemove = async (editedComment= null , commentId, itineraryId) =>{
      var sendData = {editedComment, commentId} 
      const respuesta = await editOrRemoveComment(sendData, itineraryId, props, userLS)
      setCommentState({comments: respuesta})
    }
    
    // const options = (e)=> swal("Want to modify your comment?", "What option do you prefer?", {
    //     buttons: {
    //       signup: {text: "Edit", value: "edit"},
    //       login: {text: "Delete", value: "delete"},
    //       cancel: "Cancel",
    //     },
    //   })
    //   .then((value, willDelete) => {
    //     switch (value) {         
    //       case "delete":
    //         swal({
    //           title: "Your comment will be deleted...",
    //           text: "Are you sure?",
    //           icon: "warning",
    //           buttons: ["Nope", "I'm Sure!"],
    //           dangerMode: true,
    //         })
    //         .then((willDelete) => {
    //           if (willDelete) {
    //               editOrRemove(null, commentId, itineraryId)
    //               swal("Poof! Your comment has been deleted!", {
    //                   icon: "success",
    //             });
    //           } else {
    //             swal("Okay! We'll keep it alive then");
    //           }
    //         });                
    //         break      
    //       case "edit":
    //         editComment()
    //         break         
    //       default:           
    //     }
    //   })

    const editComment = (() => {
      setEditComment({...editingComment, editing:true})
    })

    const readComment = ((e) => {
      setEditComment({
        ...editingComment,
        comment : e.value
      })
    })

    const send = (() => {
        if (editingComment.comment !=="") {
          var comment = editingComment.comment
          editOrRemove(comment, commentInfo, itineraryId)
        } else {
          //  swal("You cannot send an empty comment", "Write something!", "error")
        }        
    })
    

    return(
        <View >
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginVertical:3, marginHorizontal:15,backgroundColor:'#d3b48f', borderRadius:50}}>            
                <Image style={{width:50, height:50, borderRadius:100, marginLeft:5}} source={{uri: commentInfo.img}}/>
                    <View style={{width:240, marginHorizontal:10, marginVertical:3}}>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>{commentInfo.firstName} {commentInfo.lastName}:</Text>
                        {!editingComment.editing 
                        ?<Text style={{marginLeft:15}}>{commentInfo.comment}</Text> 
                        :<View > 
                              {/* <TextInput className="editCommentInput" onKeyPress={(e)=> enterToSend(e)} name ="comment" onChange={(e)=> readComment(e.target)} type="text" value={editingComment.comment} ></TextInput> */}
                              <FontAwesome5 name="edit" size={24} color="black" onPulse={() => send()} /> 
                              <MaterialCommunityIcons name="cancel" size={24} color="black" onPress={() => setEditComment({...editingComment, editing:false})} />  
                        </View> } 
                    </View>                                
            {/* {!editingComment.editing && userLogged && userLogged.id === commentInfo.userId ? */}
            <MaterialIcons name="more-vert" size={24} color="black"  style={{marginRight:15}}  className={commentInfo.comment} onPress={(e) => options(e.target)}/>
            {/* : null } */}
            </View> 
        </View> 
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.loginReducer.userLogged,
    }
  }
const mapDispatchToProps = {
  editOrRemoveComment: itinerariesActions.editOrRemoveComment,
}


export default connect(mapStateToProps, mapDispatchToProps)(Activity)
