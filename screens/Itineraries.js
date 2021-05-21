import React, { useState } from "react";
// import Activity from "./Activity";
// import Comment from "./Comment";
import { Alert, Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";


const Itineraries = ({userLogged, itinerary, addOrRemoveLike, loadActivitiesAction, props, addComment}) => {
  
  // const userData = JSON.parse(localStorage.getItem('userLogged'))
  const {comments, usersLiked, _id, price, duration, hashtags, itineraryName, author} = itinerary
  const [toggleItineraries, setToggleItineraries] = useState({button: false,text: "View More", class:"hidden",})
  const [like, setLike] = useState({usersLiked, fetching:false})  
  const [activity, setActivity] = useState({activities:[]})
  const [commentState, setCommentState] = useState({comments: comments})
  const [commentText, setCommentText] = useState({comment:""})
  var userFounded = userLogged && like.usersLiked.some(user => user.userId === userLogged.id)
  
//   const userLS= {
//     token: localStorage.getItem('token'),
//     ...userData
//   }


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
      const respuesta = await addOrRemoveLike(sendData, _id, 
        // userLS
        )
        setLike({usersLiked: respuesta, fetching:false})
    } else{
      return Alert.alert('tenes que estar logueado')
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
        // swal("You cannot send an empty comment", "Write something!", "error")
      }
    } else{
      // return logAlert()
    }    
  }

  const loadActivities= async (id) => {
    if (activity.activities.length ===0 ) {
      const respuesta = await loadActivitiesAction(id)
      setActivity({activities: respuesta})
    } else { 
       return null
    }
      
  }

  return (

      <ScrollView >
        <ImageBackground style={styles.itineraryBanner} source={require('../assets/img/itineraryBackground.jpg')}> 
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
                    <View style={{alignItems:'center', marginRight:50}}>
                          <Image style={{width:100, height:100, borderRadius:100}}  source={{uri: author.imageURL}}></Image>
                          <Text>{author.userName}</Text>
                    </View >
                    <View style={{alignItems:'flex-end'}}>
                          <View >                  
                              <Text >{itineraryName}</Text> 
                              <Text >Duration:{"🕒".repeat(duration)}</Text>
                              <Text >Price: {"💵".repeat(price)}</Text>
                          </View>
                          <Text >                  
                              {!userFounded && like.usersLiked.length === 1 
                              ? `${like.usersLiked[0].firstName} like this!` 
                              : null}                  
                              {userLogged && userFounded && like.usersLiked.length === 1
                              ? `You like this!` 
                              : null}
                              {like.usersLiked.length === 0 && "Nobody like this yet, be the first!"}
                          </Text>
                              {/* <Text style={{position:'relative', textDecoration: 'underline', color: 'black', fontSize:'18px'}}>{like.usersLiked.length > 1 && <SimplePopover key="popover" like={like} userFounded={userFounded} userLogged={userLogged}/> }</Text> */}
                          <Text >
                              {hashtags.map(hashtag =>{
                              return hashtag + " "
                              })}
                          </Text>
                    </View>
                </View>
                <View style={{display:'none'}}>
                    <View >
                      <View>
                            {activity.activities.length !== 0 &&
                            activity.activities.map(activity => {
                              return <Activity key = {activity._id} activityInfo = {activity}/>
                            })}
                      </View>
                      <Text >Leave us a comment!</Text>
                      <View >
                            <View className={commentState.comments.length === 0 ? "historyEmptyComments" : "historyComments"}>
                              {commentState.comments.length !== 0 
                              ? commentState.comments.map(comment =>{
                                // return <Comment key = {comment._id} commentInfo = {comment} itineraryId ={_id} itinerary ={itinerary} props={props.history} setCommentState = {setCommentState}/>
                              })
                              : <View >
                                  <Text >Nobody left a comment yet...</Text>
                                  <Text >Be the first!</Text>
                                  {/* <TiArrowDownThick  /> */}
                                </View>
                            }
                        </View> 
                        <View >  
                              <TextInput  name ="comment" onKeyPress={(e)=> enterToSend(e)} placeholder="Write your comment here!" onChange={(e)=> readComment(e.target)} type="text" value={commentText.comment} ></TextInput> 
                              {/* <MdSend  onClick={() => sendComment()}/> */}
                        </View>                    
                      </View>
                    </View>
                </View>                
              <Text onClick={(e) => showMoreShowLess(e)} onFocus={() => loadActivities(_id) }>{toggleItineraries.text}</Text>
          </ImageBackground>
      </ScrollView>
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

const styles = StyleSheet.create({
    itineraryBanner:{
      width:'100%',
      height:'auto',
      alignItems:'center',
      justifyContent:'center',
    }

})



