import React, { useState } from "react";
import { connect } from "react-redux";
import swal from 'sweetalert'
import itinerariesActions from "../redux/actions/itinerariesActions";
import Activity from "./Activity";
import Comment from "./Comment";
import { MdSend } from "react-icons/md";
import { TiArrowDownThick } from "react-icons/ti";
import SimplePopover from "./Popover";


const Itineraries = ({userLogged, itinerary, addOrRemoveLike, loadActivitiesAction, props, addComment}) => {
  
  const heartFilled= "M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
  const heartEmpty = "M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
  const userData = JSON.parse(localStorage.getItem('userLogged'))
  const {comments, usersLiked, _id, price, duration, hashtags, itineraryName, author} = itinerary
  const [toggleItineraries, setToggleItineraries] = useState({button: false,text: "View More", class:"hidden",})
  const [like, setLike] = useState({usersLiked, fetching:false})  
  const [activity, setActivity] = useState({activities:[]})
  const [commentState, setCommentState] = useState({comments: comments})
  const [commentText, setCommentText] = useState({comment:""})
  var userFounded = userLogged && like.usersLiked.some(user => user.userId === userLogged.id)
  
  const userLS= {
    token: localStorage.getItem('token'),
    ...userData
  }
  const logAlert = ()=> swal("You must be logged to like or comment!", "Want to Log in/Sign up?", "warning", {
    buttons: {
      signup: {text: "Sign Up", value: "catch"},
      login: {text: "Log in", value: "login"},
      cancel: "Maybe later",
    },
  })
  .then((value) => {
    switch (value) {         
      case "login":
        props.history.push('/login');              
        break      
      case "catch":
        props.history.push('/signup')
        break         
      default:
    }
  })

  const showMoreShowLess = ((e) => {
    setToggleItineraries(toggleItineraries.button 
      ? {button: false, text: "View More", class:"hidden"}
      : {button: true, text: "View Less", class:"showMore"}
    )}
  ) 
  
  const likeToggle = async () => {
    if (userLogged) {
      setLike({...like, fetching:true})
      var addLike = {add:true}
      var removeLike= {add: false}
      var sendData = userFounded ? removeLike: addLike
      const respuesta = await addOrRemoveLike(sendData, props.history, _id, userLS)
        setLike({usersLiked: respuesta, fetching:false})
    } else{
      return logAlert()
    }    
  }

  const readComment = ((e) => {
    setCommentText({
      ...commentText,
      comment : e.value
    })
  })
  const enterToSend = ((e) =>{
    e.key === 'Enter' && sendComment()    
  })

  const sendComment = async () => {
    if (userLogged) {
      if (commentText.comment !=="") {
        var comment = commentText.comment
        var sendData = {comment}
        const respuesta = await addComment(sendData, props.history, _id, userLS)
        setCommentState({comments: respuesta})
        setCommentText({comment: ""})
      }else {
        swal("You cannot send an empty comment", "Write something!", "error")
      }
    } else{
      return logAlert()
    }    
  }

  const loadActivities= async (id) => {
     if (activity.activities.length ===0 ) {
      const respuesta = await loadActivitiesAction(id, props.history)
      setActivity({activities: respuesta})
     } else { return null}
      
  }

  return (
      <div className="itineraryBanners">
        <div className="animate__animated animate__fadeIn itineraryBanner" style={{backgroundImage: `url('/img/itineraryBackground.jpg')`}}> 
                <h1 className="itineraryTitle">{itineraryName}</h1> 
                <div className="authorDiv">
                    <div className="avatarAuthor" style={{backgroundImage: `url(${author.imageURL}`}}></div>
                    <h3>{author.userName}</h3>
                </div>
                <div className="itineraryObservations">
                  <svg onClick={!like.fetching ? () => likeToggle() : null} aria-hidden="true" focusable="true" data-prefix="far" data-icon="heart" className={userFounded  ? "filled" : "empty"} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path fill="currentColor" d={userFounded  ? heartFilled : heartEmpty}></path></svg>                    
                  <p className="duration">Duration:{"🕒".repeat(duration)}</p>
                  <p className="price">Price: {"💵".repeat(price)}</p>
                </div>
                <span className="likes">                  
                  {!userFounded && like.usersLiked.length === 1 
                    ? `${like.usersLiked[0].firstName} like this!` 
                    : null}                  
                  {userLogged && userFounded && like.usersLiked.length === 1
                    ? `You like this!` 
                    : null}
                  {like.usersLiked.length === 0 && "Nobody like this yet, be the first!"}
                </span>
                <span style={{position:'relative', textDecoration: 'underline', color: 'black', fontSize:'18px'}}>{like.usersLiked.length > 1 && <SimplePopover key="popover" like={like} userFounded={userFounded} userLogged={userLogged}/> }</span>
                <p className="hashtags">
                    {hashtags.map(hashtag =>{
                    return hashtag + " "
                    })}
                </p>
                <div className={toggleItineraries.class}>
                    <div className="containerShowMore">
                      <div className="divActivities">
                        {activity.activities.length !== 0 &&
                        activity.activities.map(activity => {
                          return <Activity key = {activity._id} activityInfo = {activity}/>
                        })}
                      </div>
                      <h3 className="commentariesTittle">Leave us a comment!</h3>
                      <div className="commentaries">
                        <div className={commentState.comments.length === 0 ? "historyEmptyComments" : "historyComments"}>
                          {commentState.comments.length !== 0 
                          ? commentState.comments.map(comment =>{
                            return <Comment key = {comment._id} commentInfo = {comment} itineraryId ={_id} itinerary ={itinerary} props={props.history} setCommentState = {setCommentState}/>
                          })
                          : <div className="emptyCommentariesBox">
                              <h2 className="emptyCommentariesTitle">Nobody left a comment yet...</h2>
                              <h3 className="emptyCommentariesTitle">Be the first!</h3>
                              <TiArrowDownThick className="arrowDownward" />
                            </div>
                        }
                        </div> 
                        <div className="divInputComment">  
                            <input className="commentInput" name ="comment" onKeyPress={(e)=> enterToSend(e)} placeholder="Write your comment here!" onChange={(e)=> readComment(e.target)} type="text" value={commentText.comment} ></input> 
                            <MdSend className="sendComment" onClick={() => sendComment()}/>
                        </div>                    
                      </div>
                    </div>
                </div>                
            <button className= "btnReadMore" onClick={(e) => showMoreShowLess(e.target.textContent)} onFocus={toggleItineraries.class === "hidden" ? () => loadActivities(_id) : null}>{toggleItineraries.text}</button>
          </div>
      </div>
  );
}

const mapStateToProps = state => {
  return {
      itineraries: state.cityReducer.itineraries,
      userLogged: state.loginReducer.userLogged,
  }
}
const mapDispatchToProps = {
  loadItineraries: itinerariesActions.loadItineraries,
  addOrRemoveLike:itinerariesActions.addOrRemoveLike,
  addComment: itinerariesActions.addComment,
  loadActivitiesAction: itinerariesActions.loadActivitiesAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)

