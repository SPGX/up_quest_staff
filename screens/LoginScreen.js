import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { firebase } from './firebase/config';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                console.log(uid)
                storeUserData(uid)
                const usersRef = firebase.firestore().collection('staff')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        const user = firestoreDocument.data()
                        navigation.navigate('Home', {user: user})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    const storeUserData = async(uid) => {
        try{
            AsyncStorage.setItem("uid", uid);
            console.log(uid)
        }catch(err){
            alert(err)
        }
    }

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    return (
        <View style={{ flex: 1, alignItems:'center', backgroundColor:'#CCBAFF'}}>
                <Text>
                    UP Quest For Staff
                </Text>
                <TextInput
                    style={{ textAlign: 'center', backgroundColor:'white', marginTop:150 }}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={{ textAlign: 'center', backgroundColor:'white' }}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Button
                    title="เข้าสู่ระบบ"
                    onPress={() => onLoginPress()}
                />
                <View>
                    <TouchableOpacity>
                        <Text onPress={onFooterLinkPress}>
                            สมัครสมาชิก
                        </Text>                        
                    </TouchableOpacity>

                </View>
            <Button 
                title="Go Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

export default LoginScreen;