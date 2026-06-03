import React from "react";
import { View, Text, Image } from "react-native";
import { useContext } from "react";
import { dataContext } from "../../Components/context";
import { SafeAreaView } from "react-native-safe-area-context";
import { EnvelopeIcon , UserCircleIcon} from "react-native-heroicons/solid";
import { useState, useEffect } from "react";
import { db, collection, auth } from "../../../firebase";
import { onSnapshot, doc } from "firebase/firestore";


const Profile   = ()=>{
const [Data, setData]= useState();

   useEffect(()=>{
    const user = auth.currentUser;
    if(!user) return;
    const userRef =doc(db,"ExpenseCollection", user.email);
    const unsub = onSnapshot(userRef,(snapshot)=>{
        if(snapshot.exists()){
            setData(snapshot.data());
        }
    });
    return()=> unsub()
   },[])


    return(
        <View  style={{
            backgroundColor:'#191717ee', flex:1
        }}>
<SafeAreaView>
    <View style={{
        
    }}>
        <Text style={{
            textAlign:'center',fontWeight:900, fontSize:18, marginTop:15,color:'white'
        }}>Profile</Text>

        <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpd4mJRIUwqgE8D_Z2znANEbtiz4GhI4M8NQ&s'}}
    style={{
        height:200, width:200, borderRadius:100, alignSelf:'center', marginTop:50
    }}/>
    <View style={{
        padding:50, marginTop:40
    }}>
<View style={{
    flexDirection:'row',gap:50
}}>
    <View style={{
    backgroundColor:"#d36e38ff", padding:7, borderRadius:8, marginBottom:8
}}>
    <EnvelopeIcon color={"white"} /></View>
    <Text style={{
        color:'white',fontWeight:'bold', marginTop:4,fontSize:14
    }}>{Data ?.email}</Text>
</View>
   <View style={{
    flexDirection:'row',gap:50
   }}>
     <View style={{
    backgroundColor:"#9D4EDD", padding:7, borderRadius:8
}}>
    <UserCircleIcon color={"white"} /></View>
    <Text style={{
         color:'white',fontWeight:'bold', marginTop:4,fontSize:14
    }}>{Data ?.username}</Text>
   </View>
    </View>
    
    
    </View>
</SafeAreaView>
        </View>
    )
};

export default Profile;