import React,{useState,useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView, Button, TextInput, Image, Alert, Dimensions} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker'
import { addCookie, addData } from '../store/actions/post'
import { useDispatch,useSelector } from 'react-redux'

export const AdminScreen = ({navigation}) =>{

}
AdminScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => {
        return (
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 20
            }}
          >
          Admin
          </Text>
        );
      },
      headerLeft: ()=>
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title='Toggle Drawer'
            iconName='ios-menu'
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
    }
  }


const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding:15,
    fontFamily:'open-regular',
  },

  block:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    padding:5
  },
  text:{
    fontFamily:'open-regular',
    fontSize:20
  },
  header:{
    fontSize:18,
    fontFamily:'open-bold'
  },
  modal:{
      flex: 1,
      padding:10,
      alignItems:'center',
      fontFamily:'open-regular',
      justifyContent:'center',
      marginVertical:Dimensions.get('window').height/3
    },
    blockmod:{
      flexDirection:"row",
      marginVertical:20
    }
})

/*{
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject"
  },
  "dependencies": {
    "@expo/vector-icons": "^12.0.5",
    "@react-native-async-storage/async-storage": "^1.15.7",
    "@react-native-community/masked-view": "0.1.10",
    "@react-navigation/native": "^6.0.1",
    "expo": "~42.0.1",
    "expo-app-loading": "^1.1.2",
    "expo-font": "^9.2.1",
    "expo-image-picker": "^10.2.3",
    "expo-permissions": "^12.1.1",
    "expo-sms": "^9.2.3",
    "expo-sqlite": "^9.2.1",
    "expo-status-bar": "~1.0.4",
    "react": "16.13.1",
    "react-dom": "16.13.1",
    "react-native": "https://github.com/expo/react-native/archive/sdk-42.0.0.tar.gz",
    "react-native-elements": "^3.4.2",
    "react-native-gesture-handler": "^1.10.3",
    "react-native-get-sms-android": "^2.1.0",
    "react-native-modalbox": "^2.0.2",
    "react-native-paper": "^4.9.2",
    "react-native-reanimated": "^1.13.1",
    "react-native-safe-area-context": "3.2.0",
    "react-native-screens": "~3.4.0",
    "react-native-select-dropdown": "^1.1.0",
    "react-native-sms": "^1.11.0",
    "react-native-sms-android": "^0.4.1",
    "react-native-swipe-gestures": "^1.0.5",
    "react-native-web": "~0.13.12",
    "react-native-webview": "^11.13.0",
    "react-native-youtube": "^2.0.2",
    "react-native-youtube-iframe": "^2.1.2",
    "react-navigation": "^4.4.4",
    "react-navigation-drawer": "^2.7.1",
    "react-navigation-header-buttons": "^6.3.1",
    "react-navigation-stack": "^2.10.4",
    "react-redux": "^7.2.4",
    "redux": "^4.1.1",
    "redux-thunk": "^2.3.0"
  },
  "devDependencies": {
    "@babel/core": "^7.9.0"
  },
  "private": true
}*/