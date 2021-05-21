import { useEffect, useState } from "react";
import { MdMoreVert, MdEdit, MdClear } from "react-icons/md";
import { connect } from "react-redux";
import swal from "sweetalert";
import itinerariesActions from "../redux/actions/itinerariesActions";

const Activity = ({commentInfo, userLogged, setCommentState, itineraryId, editOrRemoveComment, props}) =>{ 

    const[editingComment, setEditComment]= useState({comment: commentInfo.comment , editing : false})

    var commentId = commentInfo._id
    const userData = JSON.parse(localStorage.getItem('userLogged'))
    const userLS= {
      token: localStorage.getItem('token'),
      ...userData
    }
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
    
    const options = (e)=> swal("Want to modify your comment?", "What option do you prefer?", {
        buttons: {
          signup: {text: "Edit", value: "edit"},
          login: {text: "Delete", value: "delete"},
          cancel: "Cancel",
        },
      })
      .then((value, willDelete) => {
        switch (value) {         
          case "delete":
            swal({
              title: "Your comment will be deleted...",
              text: "Are you sure?",
              icon: "warning",
              buttons: ["Nope", "I'm Sure!"],
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                  editOrRemove(null, commentId, itineraryId)
                  swal("Poof! Your comment has been deleted!", {
                      icon: "success",
                });
              } else {
                swal("Okay! We'll keep it alive then");
              }
            });                
            break      
          case "edit":
            editComment()
            break         
          default:           
        }
      })

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
        } else { swal("You cannot send an empty comment", "Write something!", "error")}        
    })
    

    return(
        <div className="comment" >
            <div className="commentContent">            
                <div className="commentProfileImg" style={{backgroundImage: `url('${commentInfo.img}')`}}/>
                <div className="nameAndComment">
                    <p>{commentInfo.firstName} {commentInfo.lastName}:</p>
                    {!editingComment.editing 
                    ?<h4 className="userComment">{commentInfo.comment}</h4> 
                    :<div className="divEditCommentInput"> 
                          <input className="editCommentInput" onKeyPress={(e)=> enterToSend(e)} name ="comment" onChange={(e)=> readComment(e.target)} type="text" value={editingComment.comment} ></input>
                          <MdEdit className="iconsEditComment" onClick={() => send()}/>
                          <MdClear className="iconsEditComment"onClick={() => setEditComment({...editingComment, editing:false})} /> 
                    </div> }
                </div>                                    
            </div> 
            {!editingComment.editing && userLogged && userLogged.id === commentInfo.userId ?
            <MdMoreVert className="optionIcons" name={commentInfo.comment} onClick={(e) => options(e.target)}/> : null }
        </div> 
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
