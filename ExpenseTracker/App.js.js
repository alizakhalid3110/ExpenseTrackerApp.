import React, { useState, useEffect, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { auth , db,} from "./firebase";
import { collection , onSnapshot} from "firebase/firestore";
import { dataContext } from "./ExpenseTracker/Components/context";

// screens
import Welcome from "./ExpenseTracker/Screens/WelcomeScreen";
import Login from "./ExpenseTracker/Screens/Login";
import GetStarted from "./ExpenseTracker/Screens/GetStarted";
import SignUP from "./ExpenseTracker/Screens/SignUpScr";
import Home from "./ExpenseTracker/Screens/TabScreens/Home";
import Statitics from "./ExpenseTracker/Screens/TabScreens/Statitics";
import S3 from "./ExpenseTracker/Screens/TabScreens/Alltransactions";
import S4 from "./ExpenseTracker/Screens/TabScreens/profile";
import Add from "./ExpenseTracker/Screens/AddTransaction";
import Edit from "./ExpenseTracker/Screens/EditScreen";

// icons
import {
  ChartBarIcon as ChartOutline,
  WalletIcon as WalletOutline,
  UserIcon as UserOutline,
  HomeIcon as HomeOutline,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeSolid,
  ChartBarIcon as ChartSolid,
  WalletIcon as WalletSolid,
  UserIcon as UserSolid,
} from "react-native-heroicons/solid";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#343232ff" },
        tabBarActiveTintColor:'gray',tabBarInactiveTintColor:'gray'
        
      }}
    >

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeSolid color={"#9bfc3bff"} />
            ) : (
              <HomeOutline color={"lightgray"} />
            ),
            
        }}
      />
           <Tab.Screen
        name="Transactions"
        
        component={S3}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <WalletSolid color={"#9bfc3bff"} />
            ) : (
              <WalletOutline color={"lightgray"} />
            ),
        }}
      />
      
         <Tab.Screen
        name="Statistics"
        component={Statitics}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ChartSolid color={"#9bfc3bff"} />
            ) : (
              <ChartOutline color={"lightgray"} />
            ),
        }}
      />
   
 
      <Tab.Screen
        name="Profile"
        component={S4}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <UserSolid color={"#9bfc3bff"} />
            ) : (
              <UserOutline color={"lightgray"} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}


const Main = () => {
  const [user, setUser]=useState();


//fetching the transactional data for context api:

          const [TranData, setTranData]= useState([]);
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    setInitializing(false);
  });
  return unsubscribe;
}, []);

useEffect(() => {
  if (!user) return;
  const ref = collection(db, "ExpenseCollection", user.email, "transactions");
  const unsubscribe = onSnapshot(ref, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTranData(data);
  });
  return () => unsubscribe();
}, [user]);



 

  return (
      <dataContext.Provider value={{TranData}}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
         
          <Stack.Screen name="Tabs" component={Tabs} />
      
       
        
        
          
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUP} />
            <Stack.Screen name="Add" component={Add}/>
              <Stack.Screen name="Edit" component={Edit}/>
        
      
      </Stack.Navigator>
    </NavigationContainer>
    </dataContext.Provider>
  
  );
};

export default Main;
