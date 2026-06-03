import React from "react";
import { View, Text , Image, TouchableOpacity} from "react-native";


const GetStarted =({navigation})=>{
    return(
        <View style={{
            flex:1, backgroundColor:'#191717ee'


        }}>
            <View style={{
                marginTop:25
            }}>
              <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                  <Text style={{
                    color:'white', textAlign:'right', padding:10, marginRight:10, fontSize:15
                }}>Sign in</Text>
              </TouchableOpacity>
            </View>
            <Image source={require('../../assets/computer.png')}
            style={{
                height:300, width:300, alignSelf:'center', marginTop:'25%'
            }}
            />
            <View style={{
                backgroundColor:'black', height:200, marginTop:'30%', flex:1
            }}>
              <View style={{
                padding:15,alignItems:'center', justifyContent:'center', alignSelf:'center'
              }}>
                  <Text style={{
                    color:'white', fontWeight:900, fontSize:26, textAlign:'center', lineHeight:40, paddingTop:10
                }}>Always take Control of your finances </Text>
                  <Text style={{
                color:'gray', marginLeft:45, marginTop:5, fontSize:13, lineHeight:20
              }}>Finances must be arranged to set a better lifestyle in future</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('SignUp')} style={{
                backgroundColor:'#9bfc3bff', marginTop:20,paddingHorizontal:100, paddingVertical:15, borderRadius:15
              }}>
                <Text style={{
                    fontWeight:900, fontSize:16
                }}>Get Started</Text>
              </TouchableOpacity>
              </View>
            

            </View>
          

        </View>
    )
};
export default GetStarted;