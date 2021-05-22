import { ImageBackground, Text, View } from "react-native"
import React, { useState } from "react";

const Activity = ({activityInfo}) =>{ 

    return(
        <View style={{ overflow:'hidden', width:200, height:100, alignItems:'center', borderRadius:30, marginTop:20, justifyContent:'center', marginHorizontal:5, borderColor:'black',borderWidth:2,}}>
            <ImageBackground style={{width:'100%',height:100, marginHorizontal:10, alignItems:'center' }} source={{uri: activityInfo.activityImage}}>
                <Text >{activityInfo.activityName}</Text>
            </ImageBackground>  
        </View>
    )
}


export default Activity
