import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";
import    { firebase, db} from "../../firebase";

import { useNavigation } from '@react-navigation/native';
import {GlassIcon, ChevronLeftIcon, EyeIcon, EyeSlashIcon} from "react-native-heroicons/solid";
import { useState } from "react";





// Validation schema
const LoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("An email is required"),
  password: yup
    .string()
    .min(8, "Your password should be at least 8 characters")
    .required("Password is required"),
    username:yup.string().min(4,"username should atleast 4 chr").required("username is required")

     
});
const SignUp = () => {
  const navigation = useNavigation();

  const [showIcon, setShowIcon]= useState(true)


    const onSignUp = async(username,email, password)=>{
        try {
          const authuser=  await firebase.auth().createUserWithEmailAndPassword( email, password)
            console.log('my lord user created')
            await db.collection('ExpenseCollection').doc(authuser.user.email).set({
  owneruid: authuser.user.uid,
    username:username,
  email: authuser.user.email,


   
});


 navigation.replace('Tabs');

            
            
        } catch (error) {
          console.log('my Lord', error.message)
            
        }
    }
  return (
    <View style={{
        backgroundColor:'#191717ee', flex:1
    }}>
      <Formik
        initialValues={{ username: "",email: "" ,password: ""}}
        onSubmit={(values) => {
  onSignUp(values.username, values.email,values.password,);
}}

        
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
          touched,
        }) => (
         
          <View style={{ alignItems: "center", justifyContent: "center", marginTop:50 }}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{
                backgroundColor:'lightgray', width:30, height:30, borderRadius:30, padding:10, marginRight:300, alignItems:'center',
                justifyContent:'center'
            }}>
                <ChevronLeftIcon size={25} color={"wehite"} style={{
                }}/>
            </TouchableOpacity>
            <Text style={{
                            color:'white', fontWeight:900, fontSize:26, textAlign:'center', lineHeight:40, paddingTop:10
                        }}>Lets </Text>
                          <Text style={{
                            color:'white', fontWeight:900, fontSize:26, textAlign:'center', lineHeight:40, paddingTop:10
                        }}> Get Started</Text>

                        <Text style={{
                            color:'white', marginTop:20
                        }}>create an account to track tou expenses</Text>


            {/* username Field */}
            <View
              style={{
                marginTop: "30%",
                width: "80%",
                borderColor: "white",
                borderWidth: 1.5,
                height: 38,
                borderRadius:20,
              
              }}
            >
              <TextInput
                placeholder="Enter Name"
                textContentType="username"
                placeholderTextColor={"gray"}
                style={{ color: "white" ,paddingHorizontal:20 }}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>
            {touched.username && errors.username && (
              <Text style={{ color: "red", marginTop: 5 }}>{errors.username}</Text>
            )}
                   {/* Email Field */}
            <View
              style={{
                marginTop:'4%',
                width: "80%",
                borderColor: "white",
                borderWidth: 1.5,
                height: 38,
                borderRadius:20,
              
              }}
            >
              <TextInput
                placeholder="Enter Email"
                textContentType="emailAddress"
                placeholderTextColor={"gray"}
                style={{ color: "white" ,paddingHorizontal:20 }}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            {/* Password Field */}
            <View
              style={{
                marginTop: "4%",
                width: "80%",
                borderColor: "white",
                borderWidth: 1.5,
                height: 38,
                borderRadius:20,
                flexDirection:'row',
                justifyContent:'space-between',
              
              }}
            >
              <TextInput
                placeholder="Enter Password"
                
              
                placeholderTextColor={"gray"}
              secureTextEntry={!showIcon}
                style={{ color: "white", paddingHorizontal: 20 }}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
           {
            showIcon?(
   <TouchableOpacity onPress={()=>setShowIcon(!showIcon)}>
     <EyeIcon color={"gray"} style={{
              marginTop:4, marginRight:15
              }}/>
   </TouchableOpacity>
            ):(
 <TouchableOpacity onPress={()=>setShowIcon(!showIcon)}>
     <EyeSlashIcon color={"gray"} style={{
              marginTop:4, marginRight:15
              }}/>
   </TouchableOpacity>
            )
           }
          
            </View>
            {touched.password && errors.password && (
              <Text style={{ color: "red", marginTop: 5 }}>
                {errors.password}
              </Text>

            )}

        

            {/* Submit Button */}
            <TouchableOpacity
              onPress={()=>handleSubmit()}
              disabled={!isValid}
              
              style={{
                marginTop: "10%",
                width: "80%",
                backgroundColor: isValid ? "#9bfc3bff" : "#999",
                height: 38,
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* Footer */}
            <View
              style={{
                flexDirection: "row",
                marginTop: "8%",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 13, color:'white' }}>already have an account?  </Text>
              <TouchableOpacity onPress={()=>navigation.navigate("Login" )}>
                <Text style={{ color: "#9bfc3bff", fontSize: 13 }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;
