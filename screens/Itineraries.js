import React, { useState } from "react";
import { Alert, Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { Ionicons } from '@expo/vector-icons'; 
import Comment from "./Comment";
import Activity from "./Activity";


const Itineraries = ({userLogged, itinerary, addOrRemoveLike, loadActivitiesAction, props, addComment}) => {
  
  // const userData = JSON.parse(localStorage.getItem('userLogged'))
  const {comments, usersLiked, _id, price, duration, hashtags, itineraryName, author} = itinerary
  const [toggleItineraries, setToggleItineraries] = useState({button: false,text: "View More", display: {display:'none'}})
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
      ? {button: false, text: "View More", display: {display:'none'}}
      : {button: true, text: "View Less", display: {display:'flex'}}
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

      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:40, overflow:'hidden', marginTop:30, width:'98%', marginLeft:4, }}>
        <ImageBackground style={styles.itineraryBanner} source={require('../assets/img/itineraryBackground.jpg')}> 
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style={{alignItems:'center', width:110, }}>
                          <Image style={{width:100, height:100, borderRadius:100, borderColor:'black',borderWidth:2,}}  source={{uri: author.imageURL}}></Image>
                          <Text style={{textAlign:'center', fontSize:15, width:110, textShadowColor: 'rgba(0, 0, 0, 1)',textShadowOffset: {width: 1, height: 0}, textShadowRadius: 3}}>{author.userName}</Text>
                    </View >
                    <View style={{alignItems:'flex-start', width:260, marginLeft:20}}>
                          <View style={{alignSelf:'center'}}>
                              <Text style={{fontSize:20, width:200, marginBottom:20,textShadowColor: 'rgba(0, 0, 0, 1)',textShadowOffset: {width: 1, height: 0}, textShadowRadius: 3, textAlign:'center', marginTop:15}}>{itineraryName}</Text> 
                          </View>
                          <View style={{alignItems:'flex-start', width:260, marginLeft:30 }}>                                                            
                              <Text >     
                                {!userFounded && like.usersLiked.length === 1 
                                ? `${like.usersLiked[0].firstName} like this!` 
                                : null}                  
                                {userLogged && userFounded && like.usersLiked.length === 1
                                ? `You like this!` 
                                : null}
                                {like.usersLiked.length === 0 && "Nobody like this yet, be the first!"}
                                {/* <Text style={{position:'relative', textDecoration: 'underline', color: 'black', fontSize:'18px'}}>{like.usersLiked.length > 1 && <SimplePopover key="popover" like={like} userFounded={userFounded} userLogged={userLogged}/> }</Text> */}
                                  {userFounded  
                                  ? <Ionicons onPress={!like.fetching ? () => likeToggle() : null} name="heart-sharp" size={24} color="red" />
                                  : <Ionicons onPress={!like.fetching ? () => likeToggle() : null} name="heart-outline" size={24} color="red" />
                                  }               
                              </Text>
                              <Text style={{fontSize:15, textShadowColor: 'rgba(0, 0, 0, 1)',textShadowOffset: {width: 1, height: 0}, textShadowRadius: 1}}>Duration:{"🕒".repeat(duration)}</Text>
                              <Text style={{fontSize:15, textShadowColor: 'rgba(0, 0, 0, 1)',textShadowOffset: {width: 1, height: 0}, textShadowRadius: 1}}>Price: {"💵".repeat(price)}</Text>
                          </View>
                          <Text style={{fontSize:12, textShadowColor: 'rgba(0, 0, 0, 0.5)',textShadowOffset: {width: 1, height: 0}, textShadowRadius: 1, maxWidth:210, marginBottom:20,marginLeft:30, alignSelf:'flex-start'}}>
                              {hashtags.map(hashtag =>{
                              return hashtag + " "
                              })}
                          </Text>
                    </View>
                </View>
                <View style={toggleItineraries.display}>
                    <View style={{backgroundColor:'#e2ceb5', width:'94%', marginLeft:8, borderRadius:30, marginTop:20}}>
                      <Text style={{fontSize:20, marginBottom:20,textShadowColor: 'rgba(0, 0, 0, 1)',textShadowOffset: {width: 1, height: 0}, textShadowRadius: 3, textAlign:'center', marginTop:15}}>Recommended Activities</Text>
                      <ScrollView horizontal={true} style={{width:'95%', height:150, flexDirection:'row', backgroundColor:'#d3b48f', }}>
                            {activity.activities.length !== 0 &&
                            activity.activities.map(activity => {
                              return <Activity key = {activity._id} activityInfo = {activity}/>
                            })}
                      </ScrollView >
                      <Text style={{fontSize:20, marginBottom:20,textShadowColor: 'rgba(0, 0, 0, 1)',textShadowOffset: {width: 1, height: 0}, textShadowRadius: 3, textAlign:'center', marginTop:15}}>Leave us a comment!</Text>
                      <View >
                            <View style={commentState.comments.length === 0 ? styles.historyEmptyComments : styles.historyComments} >
                              {commentState.comments.length !== 0 
                              ? commentState.comments.map(comment =>{
                                return <Comment key = {comment._id} commentInfo = {comment} itineraryId ={_id} itinerary ={itinerary} props={props.history} setCommentState = {setCommentState}/>
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
                              {/* <MdSend  onPress={() => sendComment()}/> */}
                        </View>                    
                      </View>
                    </View>
                </View>  
                <TouchableOpacity onPress={(e) => showMoreShowLess(e)} onPressIn={(e) =>loadActivities(_id)}>             
                        <Text style={styles.btnReadMore}>{toggleItineraries.text}</Text>
              </TouchableOpacity> 
          </ImageBackground>
      </View>
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
      width:'103%',
      height:'auto',
      marginLeft:8,
      alignSelf:'center',
      justifyContent:'center',
    },
    btnReadMore:{
      fontFamily:'sans-serif-medium',
      color:'#e2ceb5',
      backgroundColor:'black',
      zIndex:2,
      alignSelf:'center',
      textAlign:'center',
      textAlignVertical:'center',
      fontSize:20,
      width:150,
      height:40,  
      marginTop:10,
      marginBottom:5,
      justifyContent:'center',   
      borderTopRightRadius: 50,
      borderBottomLeftRadius: 50, 
    },
    historyEmptyComments:{
      borderRadius: 15,
      backgroundColor: '#e2ceb5',
      width: '98%',
      height: 300,
      overflow: 'scroll',
      alignItems: 'flex-start' ,
      justifyContent: 'flex-start',

    },
    historyComments:{
      borderRadius: 15,
      backgroundColor: '#e2ceb5',
      width: '98%',
      height: 300,
      overflow: 'scroll',
      alignItems: 'center' ,
      justifyContent: 'center',

    },


})



