/*import React, { Component, useState,useEffect } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';

import firebase from 'react-native-firebase';

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export const FirebaseScreen = ({navigation}) =>{

   
 let unsubscribe = null;
const [user,setUser] = useState(null)
const [message,setMessage] = useState('')   
const [codeInput,setCodeInput]=useState('')     
const [phoneNumber,setPhoneNumber] = useState('+79278888716')     
const [confirmResult,setConfirmResult] = useState(null)      
   
useEffect(()=>{
    unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUser(user.toJSON())
        } else {
          // User has been signed out, reset the state
          setUser(null)
          setMessage('')
          setCodeInput('')
          setPhoneNumber('+79278888716')
          setConfirmResult(null)
        }
      });
},[])
  


 
useEffect(()=>{
if (unsubscribe) this.unsubscribe();
})
  



  const signIn = () => {
    setMessage('Sending code ...')

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => {setConfirmResult(confirmResult)
         setMessage('Code has been sent!')} )
      .catch(error => setMessage( `Sign In With Phone Number Error: ${error.message}`));
  };

const  confirmCode = () => {

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          setMessage('Code Confirmed!')
        })
        .catch(error => setMessage(`Code Confirm Error: ${error.message}`));
    }
  }

 const signOut = () => {
    firebase.auth().signOut();
  }
  
 const renderPhoneNumberInput=()=>{
   
      
    return (
      <View style={{ padding: 25 }}>
        <Text>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={setPhoneNumber}
          placeholder={'Phone number ... '}
          value={phoneNumber}
        />
        <Button title="Sign In" color="green" onPress={signIn} />
      </View>
    );
  }
  
 const renderMessage=()=>{

  
    if (!message.length) return null;
  
    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }
  
 const renderVerificationCodeInput=()=> {
 
  
    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={setCodeInput}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button title="Confirm Code" color="#841584" onPress={confirmCode} />
      </View>
    );
  }


  
    return (
      <View style={{ flex: 1 }}>
        
        {!user && !confirmResult && renderPhoneNumberInput()}
        
        {renderMessage()}
        
        {!user && confirmResult && renderVerificationCodeInput()}
        
        {user && (
          <View
            style={{
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#77dd77',
              flex: 1,
            }}
          >
            <Image source={{ uri: successImageUri }} style={{ width: 100, height: 100, marginBottom: 25 }} />
            <Text style={{ fontSize: 25 }}>Signed In!</Text>
            <Text>{JSON.stringify(user)}</Text>
            <Button title="Sign Out" color="red" onPress={this.signOut} />
          </View>
        )}
      </View>
    );
}*/