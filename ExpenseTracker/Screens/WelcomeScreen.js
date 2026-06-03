import React from "react";
import { View, Text, Image } from "react-native";
import { useEffect } from "react";

const Welcome = ({navigation})=>{
    useEffect(()=>{
        setTimeout(()=>{
            navigation.replace('GetStarted')
        },3000)
    })

    return(
        <View style={{flex:1, backgroundColor:'#191717ee', alignItems:'center', justifyContent:'center'}}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/7742/7742884.png'}}
            
            style={{
                height:200, width:200, alignSelf:'center'
            }}
            
            
            
            />
        </View>
    )
};




export default Welcome;