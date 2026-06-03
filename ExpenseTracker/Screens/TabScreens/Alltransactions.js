import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useState } from "react";
import { db , auth} from "../../../firebase";
import { getDocs , collection} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
  import { deleteDoc, doc } from "firebase/firestore";
  import { onSnapshot } from "firebase/firestore";
import { ArchiveBoxIcon} from "react-native-heroicons/solid";

const All = ({navigation})=>{

const getRandomColor=()=>{
  const letters= "0123456789ABCDEF";
  let color = "#";
  for(let i=0; i<6;i++){
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color;
}

  
        const [allData, setAllData]= useState([]);
useEffect(() => {
  const user = auth.currentUser;

  const ref = collection(db, "ExpenseCollection", user.email, "transactions");

  const unsubscribe = onSnapshot(ref, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAllData(data);
  });

  return () => unsubscribe();
}, []);



  //function to del a transaction





const deleteTransaction = async(id)=>{
  const user= auth.currentUser;
  try {

   await deleteDoc(
      doc(db,"ExpenseCollection", user.email,"transactions", id)
    );
    setAllData(allData.filter(item=>item.id !=id));
    console.log('item deleted')
    
  } catch (error) {
    console.log(error)
    
  }
}







    return(
<View style={{
            backgroundColor:'#191717ee', flex:1, padding:20
        }}>

            <View style={{
                padding:20, marginTop:35, alignItems:'center', padding:15
            }}>
                <Text style={{
                    color:'white', fontWeight:900, fontSize:18
                }}>Your Transactions</Text>
            </View>
            <ScrollView>
{
    allData.map((item, index)=>{
        return(
            <View key={index}>
               <View
                 style={{
                  backgroundColor:getRandomColor(),  width:'99%',height:70, marginTop:10, 
                  borderRadius:10, elevation:10
            }}>
            <View style={{
              flexDirection:'row', padding:10, justifyContent:'space-between'
            }}>  <View>
                <Text style={{
                  color:'white',
                  fontWeight:900,
                }}>{item.category}</Text>
               <Text style={{
                color:'white', fontSize:11, marginTop:6
               }}>{item.title}</Text>
              </View>
              <View>
            {
              item.type == 'income'?
              (
                <Text style={{
                  color:'green'
                }}>+{item.amount}$</Text>
              ):(
                <Text style={{
                  color:'#d14444ff'
                }}>-{item.amount}$</Text>
              )
            }
          <View style={{
            flexDirection:'row',
            gap:10,marginTop:10
          }}>
                    <TouchableOpacity onPress={()=>deleteTransaction(item.id)}>
              <ArchiveBoxIcon color={"white"} size={18}  style={{
                marginTop:2
              }}/>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>navigation.navigate('Edit',{item})}>
               <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/4226/4226577.png'}} style={{
                height:20, width:23
               }} />
               </TouchableOpacity>
          </View>
                
                </View>
               </View>
             
               </View>
                
                </View>
        )
    })
}
</ScrollView>
</View>
    )
};

export default All;