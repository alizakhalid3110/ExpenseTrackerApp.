import React from "react";
import { View, Text, ScrollView } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useContext } from "react";
import { dataContext } from "../../Components/context";
import { useMemo } from "react";
const Statitics = ()=>{
    const {TranData}= useContext(dataContext);
   
   
         const categoryTotals= useMemo(()=>{
          const totals ={};
          TranData.forEach((item)=>{
            if(item.type == "expense"){
              const category = item.category;
              const amount = Number(item.amount);

              if(totals[category]){
                totals[category] += amount;
              }
              else{
                totals[category]= amount
              }
            }
          });
          return totals
         },[TranData])

      
        

 

 




 

    let TotalExpense = TranData.filter(item=>item.type == 'expense').reduce((sum, item)=>
    sum+parseInt(item.amount),0 
    );  
  console.log(TotalExpense)

    


 
  const colors = ["#d36e38ff", "#FFD93D", "#6BCB77", "#4D96FF", "#9D4EDD","green","red", "orange"];

const pieData = Object.keys(categoryTotals).map((cat, index) => {
  const value = categoryTotals[cat];
  const percent = TotalExpense>0 ? ((value / TotalExpense) * 100).toFixed(0):0;

 
  return{
    value,
    percent:percent,
    text:cat,
    color: colors[index % colors.length],
  };
});
  if (TotalExpense === 0) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191717ee'
      }}>
        <Text style={{ color: 'white', fontSize: 18 }}>
          No expenses added yet
        </Text>
      </View>
    );
  }


  return(

  
  <View style={{
    backgroundColor:'#191717ee', flex:1
  }}>
    <View style={{
      marginTop:40,alignSelf:'center'
    }}>
      <Text  style={{
        marginTop:20, marginBottom:50, color:'white', fontWeight:900, fontSize:20,textAlign:'center'
      }}>Spending Summary</Text>
  <PieChart data = {pieData} donut  innerCircleColor={"#191717ee"}
  showText
  textColor= "black"
  textSize={9}
 
  
  
  
  
  
  />
    </View>
    {/* percentage of spending */}
 <ScrollView style={{
  padding:13,marginTop:20
 }}>
  {
    pieData.map((item, index)=>{
      return(
        <View key={index} style={{
          flexDirection:'row',
          justifyContent:'space-between',
          backgroundColor:item.color,
          padding:10,marginTop:10,borderRadius:15
        }}>

          <Text style={{
            marginLeft:5,fontSize:14,fontWeight:900
          }}>{item.text}</Text>
          <View style={{
            marginRight:5
           
          }}>
             <Text  style={{
            fontSize:12
            }}>{item.percent}%</Text>
            <Text style={{
            fontSize:12
            }}>{item.value}$</Text>
           
          </View>

        </View>
      )
    })
  }
 </ScrollView>
   
 
  </View>
  )
};


export default Statitics;