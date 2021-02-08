import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { firebase } from './screens/firebase/config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import EnrollQuestScreen from './screens/QuestEnrollScreen';
import QuestScreen from './screens/QuestScreen';
import QuestDetailScreen from './screens/QuestDetailScreen';


const Stack = createStackNavigator();

const App = () => {

  const [user, setUser] = useState(null)
  const [userLogged, setUserLogged] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('staffs');
    const authListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserLogged(user ? true : false);
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
    return authListener;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator   
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Login"
      >
        { userLogged == true ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Quest" component={QuestScreen} />
            <Stack.Screen name="EnrollQuest" component={EnrollQuestScreen} />
            <Stack.Screen name="QuestDetail" component={QuestDetailScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegisterScreen} />          
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;