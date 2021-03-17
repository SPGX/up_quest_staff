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
        <View style={{ flex: 1, alignItems:'center', backgroundColor:'#B4B4B4'}}>
            {/* <View style={{ marginTop: 30}}>
                <Text>
                    หน้าเข้าสู่ระบบสำหรับพนักงาน
                </Text>
            </View> */}
            <View style={{ alignItems: 'center', marginTop: 75 }}>
                        <Image
                            style={{ width:250, height:250}}
                            source={{uri:'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WPVG_icon_2016.svg/1024px-WPVG_icon_2016.svg.png'}}
                        />  
                    </View>
            <View style={{ width: '100%', alignItems: 'center', backgroundColor: '#AA67FF', height: '1%', marginTop: 30}}></View>
            <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'white', height: '35%'}}>
                <View style={{ width: '90%' }}>
                        <View style={{ marginTop: 30, alignItems: 'center'}}>
                            <Text style={{ fontSize: 20, marginBottom: 10 }}>
                                หน้าเข้าสู่ระบบสำหรับพนักงาน
                            </Text>
                        </View>
                    <TextInput
                        style={{ textAlign: 'center', backgroundColor:'white', marginTop: 10, height: 35, borderWidth: 1 }}
                        placeholder='ชื่อผู้ใช้'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={{ textAlign: 'center', backgroundColor:'white', marginTop: 10, height: 35, borderWidth: 1 }}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='รหัสผ่าน'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <View style={{ marginTop: 10}}>
                        <Button
                            title="เข้าสู่ระบบ"
                            onPress={() => onLoginPress()}
                        />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 5 }}>
                        <TouchableOpacity>
                            <Text onPress={onFooterLinkPress} style={{ fontSize: 15 }}>
                                สมัครสมาชิก
                            </Text>                        
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;