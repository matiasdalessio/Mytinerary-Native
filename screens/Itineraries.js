import React, { useEffect, useState } from "react";
import { Alert, Button, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { Ionicons, FontAwesome, MaterialIcons  } from '@expo/vector-icons'; 
import Comment from "./Comment";
import Activity from "./Activity";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from 'react-native-modal';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


const Itineraries = ({userLogged, itinerary, addOrRemoveLike, loadActivitiesAction, props, addComment}) => {
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({userLS:{}, userData:{}})
  const {comments, usersLiked, _id, price, duration, hashtags, itineraryName, author} = itinerary
  const [toggleItineraries, setToggleItineraries] = useState({button: false,text: "View More", display: {display:'none'}})
  const [like, setLike] = useState({usersLiked, fetching:false})  
  const [activity, setActivity] = useState({activities:[]})
  const [commentState, setCommentState] = useState({comments: comments})
  const [commentText, setCommentText] = useState({comment:""})

  var userFounded = userLogged && like.usersLiked.some(user => user.userId === userLogged.id)

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  useEffect(()=> {
    props.addListener('focus', () => {
      setLike({usersLiked: usersLiked, fetching:false})
    }) 
    getData()
       // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const logAlert = (e)=> Alert.alert(
    "You must be logged to like or comment!",
    `Want to Log in/Sign up?`,
    [
        {text: 'Maybe later'},
        {text: 'Sign Up', onPress: () => props.navigate('Sign Up')},
        {text: 'Log in', onPress: () => props.navigate('Log In')},
    ]
  )

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem('userLogged')
    const userData = JSON.parse(jsonValue) 
    const userLS= {
    token: await AsyncStorage.getItem('token'),
    ...userData
    }
    setUserData({userLS:userLS, userData: userData}) 
  }

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
      const respuesta = await addOrRemoveLike(sendData, props.navigate, _id, userData.userLS)
        setLike({usersLiked: respuesta, fetching:false})
    } else{
      return logAlert()
    }    
  }

  const readComment = ((text) => {
    setCommentText({
      ...commentText,
      comment : text
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
        const respuesta = await addComment(sendData, props.navigate, _id, userData.userLS)
        setCommentState({comments: respuesta})
        setCommentText({comment: ""})
      }else {
        Alert.alert("You cannot send an empty comment", "Write something!")
      }
    } else{
      return logAlert()
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
                    <View style={{alignItems:'center', width:'25%', }}>
                          <Image style={{width:100, height:100, borderRadius:100, borderColor:'black',borderWidth:2,}}  source={{uri: author.imageURL}}></Image>
                          <Text style={{textAlign:'center', fontSize:15, width:110, fontWeight:'bold' }}>{author.userName}</Text>
                    </View >
                    <View style={{alignItems:'flex-start', width:'65%', marginLeft:20}}>
                          <View style={{width:200, marginBottom:20, marginTop:15, flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                              {userFounded  
                                  ? <TouchableOpacity >
                                         <Ionicons onPress={!like.fetching ? () => likeToggle() : null} name="heart-sharp" size={30} color="red" />
                                    </TouchableOpacity>
                                  : <TouchableOpacity>
                                          <Ionicons onPress={!like.fetching ? () => likeToggle() : null} name="heart-outline" size={30} color="red" />
                                    </TouchableOpacity>}      
                              <Text style={{fontSize:20, marginLeft:10, textAlign:'center', fontWeight:'bold'}}>{itineraryName}</Text> 
                          </View>
                          <View style={{alignItems:'flex-start', width:260, marginLeft:30 }}>                                                            
                              <Text style={{fontSize:15,fontWeight:'bold' }}>Duration:{"🕒".repeat(duration)}</Text>
                              <Text style={{fontSize:15, fontWeight:'bold'}}>Price: {"💵".repeat(price)}</Text>
                          </View>
                          <Text style={{fontSize:12, maxWidth:210, marginLeft:30, alignSelf:'flex-start'}}>
                              {hashtags.map(hashtag =>{
                              return hashtag + " "
                              })}
                          </Text>
                              <Text style={{textAlign:'center', marginLeft:30,marginBottom:20 }}>     
                                {!userFounded && like.usersLiked.length === 1 
                                ? `${like.usersLiked[0].firstName} like this!` 
                                : null}                  
                                {userLogged && userFounded && like.usersLiked.length === 1
                                ? `You like this!` 
                                : null}
                                {like.usersLiked.length === 0 && "Nobody like this yet, be the first!"}                             
                                {like.usersLiked.length > 1 &&
                                <View >
                                  <TouchableOpacity onPress={toggleModal}>
                                  <Text style={{color:'black', fontWeight:'bold', textDecorationLine:'underline'}} >
                                  {userLogged && userFounded && like.usersLiked.length <= 2
                                          ? `You and ${like.usersLiked[0].firstName} like this!` 
                                          : null}
                                  {userLogged && userFounded && like.usersLiked.length > 2
                                          ? `You, ${like.usersLiked[0].firstName} and ${like.usersLiked.length -2} more like this!` 
                                          : null}
                                  {like.usersLiked.length === 1 &&` ${like.usersLiked[0].firstName} like this!`}
                                  {!userFounded && like.usersLiked.length > 1 && `${like.usersLiked[0].firstName} and ${like.usersLiked.length -1} more like this!`}
                                  {like.usersLiked.length === 0 && "Nobody like this yet, be the first!"}
                                    </Text>
                                  </TouchableOpacity>
                                  <Modal 
                                   animationType="fade"
                                   transparent={true}
                                  isVisible={isModalVisible} on
                                   onRequestClose={toggleModal}
                                >
                                  <TouchableOpacity 
                                     style={{width:'100%', height:'100%', justifyContent:'center', flexDirection:'row', alignItems:'center'}} 
                                    activeOpacity={1} 
                                     onPress={toggleModal}>
                                      <ScrollView 
                                       directionalLockEnabled={true} 
                                        contentContainerStyle={{width:300, height:'auto', alignSelf:'center', borderRadius:10,backgroundColor:'white', overflow:'hidden'}}>
                                       <TouchableWithoutFeedback>
                                          <View style={{backgroundColor:'black', width:'100%', height:'auto',alignSelf:'center' }}>
                                              <MaterialIcons style={{left:'90%', top:'3%'}} onPress={toggleModal} name="close" size={24} color="white"/>
                                                {like.usersLiked.map(user => {
                                                    return  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start',marginVertical:10}} key={user.userId} >
                                                                <Image style={{width:50, height:50, borderRadius:30, marginHorizontal:10}} source={{uri:user.img}}/>
                                                                <Text style={{color:'white', fontSize:20}}>{user.firstName} {user.lastName}</Text>
                                                            </View>
                                                })}
                                          </View>
                                      </TouchableWithoutFeedback>
                                    </ScrollView>
                                    </TouchableOpacity>   
                                  </Modal>
                                </View>}         
                            </Text>
                    </View>
                </View>
                <View style={toggleItineraries.display}>
                    <View style={{backgroundColor:'#e2ceb5', width:'94%', marginLeft:8, borderRadius:30, marginTop:20}}>
                      <Text style={{fontSize:20, marginBottom:20,fontWeight:'bold', textAlign:'center', marginTop:15}}>Recommended Activities</Text>
                      <ScrollView horizontal={true} style={{width:'95%', height:150, flexDirection:'row', marginLeft:10, borderRadius:30, backgroundColor:'#d3b48f', overflow:'hidden'}}>
                            {activity.activities.length !== 0 &&
                            activity.activities.map(activity => {
                              return <Activity key = {activity._id} activityInfo = {activity}/>
                            })}
                      </ScrollView >
                      <Text style={{fontSize:20, marginBottom:20,fontWeight:'bold', textAlign:'center', marginTop:15}}>Leave us a comment!</Text>
                      <View style={{backgroundColor:'#d3b48f', borderRadius:30, width:'94%', alignItems:'center', alignSelf:'center', marginBottom:10}} >
                          <ScrollView style={{height:'auto', minHeight:300}}>
                            {/* <View style={commentState.comments.length === 0 ? styles.historyEmptyComments : styles.historyComments} > */}
                              {commentState.comments.length !== 0 
                              ? commentState.comments.map(comment =>{
                                return <Comment key = {comment._id} commentInfo = {comment} itineraryId ={_id} itinerary ={itinerary} props={props} setCommentState = {setCommentState} />
                              })
                              : <View style={{alignSelf:'center', width:'100%', height:250, alignItems:'center', justifyContent:'center'}}>
                                  <Text style={{fontWeight:'bold', fontSize:23, textAlign:'center', width:'100%'}} >Nobody left a comment yet...</Text>
                                  <Text style={{fontWeight:'bold', fontSize:23, textAlign:'center'}}>Be the first!</Text>
                                  <FontAwesome style={{alignSelf:'center', marginTop:20, fontSize:35}} name="arrow-down" size={24} color="black" />
                                </View>
                            }
                            {/* </View>  */}
                          </ScrollView>
                        <View style={{width:'98%', flexDirection:'row', alignItems:'center', backgroundColor: '#e2ceb5',borderRadius:50, overflow:'hidden', height:'auto', marginBottom:5}}>                            
                              <TextInput multiline={true}  style={styles.input} name ="comment"  placeholder="Write your comment here!" onChangeText={(text)=> readComment(text)} type="text" value={commentText.comment} ></TextInput> 
                              <TouchableOpacity style={{position:'absolute', right:10}} onPress={() => sendComment()}>
                                  <MaterialIcons  name="send" size={35} color="black" />
                              </TouchableOpacity>
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
      alignItems: 'center' ,
      justifyContent: 'center',
      backgroundColor:'#d3b48f',
      marginTop:10

    },
    historyComments:{
      borderRadius: 15,
      backgroundColor: '#e2ceb5',
      width: '98%',
      height: 300,
      overflow: 'scroll',
      alignItems: 'flex-start' ,
      justifyContent: 'flex-start',
      backgroundColor:'#d3b48f',
      marginTop:10,

    },
    input: {
      fontFamily:'sans-serif-medium',
      width: '80%',
      height: 'auto',
      marginLeft:25,
      alignSelf:'center',
      fontSize: 20,
      marginTop: 10,
      marginBottom:10,
      maxHeight:100,
      borderBottomColor:'black',
      borderBottomWidth:0,
      textDecorationLine: 'none',
  },


})



