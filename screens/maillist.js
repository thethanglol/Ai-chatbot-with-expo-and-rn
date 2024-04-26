
import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { ref, set } from "firebase/database";
import { db } from './config';

export default function Mail() {


    const [username, setName] = useState('');
    const [email, setEmail] = useState('');

    function create () {
        set (ref (db, 'users/' + username), {
        username: username,
        email: email,
        });
        };





    return (
        <View style={styles.container}>
        <Text>Firebase crud!</Text>
        <TextInput value={username} onChangeText={(username) => {setName(username)}} placeholder="Username" style={styles.textBoxes}></TextInput>
        <TextInput value={email} onChangeText={(email) => {setEmail (email)}} placeholder="Email" style={styles.textBoxes}></TextInput>
        <Button title="Submit Data" onPress={() => create()} />
        </View>
        );


}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
textBoxes: {
width: '90%',
fontSize: 18,
padding: 12,
borderColor: 'gray',
borderWidth: 0.2,
borderRadius:10
}})