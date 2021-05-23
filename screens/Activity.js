import { ImageBackground, Text, View } from "react-native"
import React, { useState } from "react";

const Activity = ({activityInfo}) =>{ 

    return(
        <View style={{ overflow:'hidden', width:200, height:100, alignItems:'center', borderRadius:30, marginTop:25, justifyContent:'center', marginHorizontal:5, borderColor:'black',borderWidth:2,}}>
            <ImageBackground style={{width:'100%',height:100, marginHorizontal:10, alignItems:'center' }} source={{uri: activityInfo.activityImage}}>
                <Text style={{ top:"10%", fontSize: 15, zIndex:20, textAlign:'center', width:'100%',  backgroundColor:'rgba(0, 0, 0, 0.550)', color:'#e2ceb5', shadowColor: "white",}}>{activityInfo.activityName}</Text>
            </ImageBackground>  
        </View>
    )
}


export default Activity
