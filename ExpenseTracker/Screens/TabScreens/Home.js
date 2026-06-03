import React from "react";
import { View, Text , Image, ActivityIndicator, ScrollView, TouchableOpacity} from "react-native";
import { db, firebase } from "../../../firebase";
import { useState, useEffect } from "react";
import { EllipsisHorizontalIcon , ArrowDownIcon, ArrowUpIcon, PlusIcon} from "react-native-heroicons/solid";
import Recents from "../../Components/RecentTransections";
import { useContext } from "react";
import { dataContext } from "../../Components/context";
import { useNavigation } from "@react-navigation/native";

const Home = ()=>{
    const navigation = useNavigation();
    const {TranData}= useContext(dataContext)

    const [userData, setUserData]= useState();
    const [Loading, setLoading]= useState(true);
    const [expences,setExpenses]= useState([]);
    const [incomes, setIncome]= useState([]);
    

    

    let totalIncome = TranData.filter(item=>item.type == 'income').reduce((sum, item)=>
    sum+parseInt(item.amount),0 
    );                     
       let totalExpense = TranData.filter(item=>item.type == 'expense').reduce((sum,item)=>
    sum+parseInt(item.amount),0 
    );     
    
    let Totalbalance = totalIncome-totalExpense;



useEffect(()=>{
    const user = firebase.auth().currentUser;
    //current user ab user ha
    if(user){
        const userRef = db.collection('ExpenseCollection').doc(user.email);
        userRef.get().then((doc)=>{
            if(doc.exists){
     setUserData(doc.data())
        
        console.log('data gained')
        setLoading(false)
            }
            else{
                console.log('data is not fetch yet')
                setLoading(true)
            }
        })
       
    }
    else{
        setLoading(true)
    }
},[TranData])


    return(
        <View style={{
            backgroundColor:'#191717ee', flex:1
        }}>
            {/* userdata */}
<View style={{
    marginTop:50, marginLeft:20
}}>
    {
        Loading?(   <View>
        <ActivityIndicator size={70}/>
    </View>):(
     <View>
       <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpd4mJRIUwqgE8D_Z2znANEbtiz4GhI4M8NQ&s'}}
    style={{
        height:50, width:50, borderRadius:50
    }}
    
    />
    <Text style={{
        marginTop:15, color:'white',fontSize:20, fontWeight:'500'
    }}>Welcome,{userData.username}</Text>
 </View>

 )
    }
  
 


</View>
  <View style={{
        height:200, width:'90%', backgroundColor:'#bcbca2ff', alignSelf:'center'
        ,borderRadius:20, marginTop:70

    }}>
        <View style={{
            padding:20
        }}>
       <View style={{
        flexDirection:'row',
        justifyContent:'space-between'
       }}>
             <Text style={{
                fontSize:13
            }}>Total balance</Text>
            <EllipsisHorizontalIcon />
            
        </View >
        {
            Totalbalance ?(  <Text style={{
            fontWeight:900, fontSize:20
        }}>${Totalbalance}.00</Text>):(  <Text style={{
            fontWeight:900, fontSize:20
        }}>$0.00</Text>)
        }
      
        <View style={{
            marginTop:70, flexDirection:'row',
            justifyContent:'space-between'
        }}>
            <View >
                <View style={{
                    flexDirection:'row', gap:1
                }}>
<ArrowUpIcon size={15} style={{
    marginTop:1.5
}}/>
<Text>Income</Text>
                </View>
              {
                totalIncome ?(  <Text style={{
                    color:'green',fontSize:12, marginLeft:7
                }}>${totalIncome}.00</Text>):(  <Text style={{
                    color:'green',fontSize:12, marginLeft:7
                }}>$0.00</Text>)
              }
            </View>


             <View >
                <View style={{
                    flexDirection:'row', gap:1
                }}>
<ArrowDownIcon size={15} style={{
    marginTop:1.5
}}/>
<Text>Expense</Text>
                </View>
             {
                totalExpense ?(   <Text style={{
                    color:'red',fontSize:12, marginLeft:9
                }}>${totalExpense}.00</Text>):(   <Text style={{
                    color:'red',fontSize:12, marginLeft:9
                }}>$0.00</Text>)
             }
            </View>
        </View>
       </View>
       <View>
    
       </View>

    </View>
    <View style={{
        flexDirection:'row', justifyContent:'space-between',
        padding:25, borderBottomColor:'lightgray',
        borderBottomWidth:0.5
    }}>
        <Text style={{
            color:'#cacac4ff', fontWeight:'bold', fontSize:16
        }}>Add a new Transaction</Text>
         <TouchableOpacity onPress={()=>navigation.navigate('Add')} style={{
                backgroundColor:'#9bfc3bff', justifyContent:'center', alignItems:'center',padding:5, alignSelf:'flex-end'
                , borderRadius:'50%'
              }}>
                  <PlusIcon style={{}}/>
              </TouchableOpacity>

    </View>
    <View style={{
        padding:20
    }}>
<View style={{
 backgroundColor:'#9bfc3bff',padding:20, marginTop:70,borderRadius:20,elevation:10
}}>
    <Text>You can add a new transaction with different categories and 
        after adding you can again edit or delete them</Text>
</View>
    </View>

        </View>
    )
};

export default Home;