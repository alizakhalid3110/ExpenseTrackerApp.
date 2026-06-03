import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// screens
import Welcome from "./ExpenseTracker/Screens/WelcomeScreen";
import Login from "./ExpenseTracker/Screens/Login";
import GetStarted from "./ExpenseTracker/Screens/GetStarted";
import SignUP from "./ExpenseTracker/Screens/SignUpScr";
import Home from "./ExpenseTracker/Screens/TabScreens/Home";
import S2 from "./ExpenseTracker/Screens/TabScreens/S2";
import S3 from "./ExpenseTracker/Screens/TabScreens/s3";
import S4 from "./ExpenseTracker/Screens/TabScreens/s4";

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

// ✅ Tabs component
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#343232ff" },
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
        name="Statistics"
        component={S2}
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
        name="Wallet"
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
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // ✅ Firebase listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) return null; // jab tak firebase check kar raha hai

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // ✅ agar user login hai
          <Stack.Screen name="Tabs" component={Tabs} />
        ) : (
          // ✅ agar user login nahi hai
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUP} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
