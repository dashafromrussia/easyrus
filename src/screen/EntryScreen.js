import React,{ useEffect, useState } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {View, Text, StyleSheet,FlatList, ActivityIndicator, Button, TextInput, ScrollView, Alert, Linking, Platform, Image, Dimensions} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addCookie, addUsers, addView, loadComments, loadLogin, loadPosts, loadingUsers, loadViews, updateView } from '../store/actions/post'
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign} from '@expo/vector-icons';
import { DB } from '../db'
import { RadioButton } from 'react-native-paper';
//const SmsAndroid = require('react-native-sms-android');

export const EntryScreen = ({navigation}) =>{
  const [sign,setSign] = useState(null)
  const [log,setLog] = useState('dashamilasha')
  const [pass, setPass] = useState('130695')

 
   const dispatch = useDispatch()
    

   const users= useSelector(state => state.post.users)

    const cookie= useSelector(state => state.post.cookie)



  const comeIn =async()=>{
    const dataUser = users.find(el=>el.login===log && el.password.toString()==pass.toString())
   if(dataUser){
    await AsyncStorage.setItem('@storage_Key',dataUser.id.toString())
   await addCookie(dataUser.id.toString())(dispatch)
   navigation.push('Main',{cook:dataUser.id.toString()})
   }else{
     Alert.alert('Неправильные данные!')
     return false
   }
  }


  const goBack =async()=>{
    await AsyncStorage.setItem('@storage_Key', "0")
    setSign(null)
  }

  const toMain=()=>{
    navigation.navigate('Main',{cookie:cookie})
  }
  


  

    return(
      <View style={styles.main}>
        <View style={styles.input}> 
           <TextInput placeholder="Логин......." fontSize={15} value={log} onChangeText={setLog}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Пароль....." fontSize={15} value={pass} onChangeText={setPass}/>
            </View>
        <Button title="Войти" color="black" onPress={comeIn}/>
        <Button title="Назад" color="black" onPress={toMain}/>
      </View>
    )
  }

EntryScreen.navigationOptions = ({ navigation }) => {

 return { headerTitle: () => 
<Text
    style={{
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20
    }}
  >
   Вход
  </Text>
}
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
   padding:20,
   alignItems:"center",
   justifyContent:"center",
  },
  admin: {
    flex: 1,
   padding:20,
  // alignItems:"center",
 //  justifyContent:"center",
  },
  text:{
    color:"grey",
    fontFamily:'open-regular',
    fontSize: 15
  },
  header:{
    color:"grey",
    fontFamily:'open-regular',
    fontSize: 17,
    marginRight:15
  },
  center: {
    flex: 1,
    padding:10,
    alignItems:'center',
    fontFamily:'open-regular',
    justifyContent:'center'
  },
  block:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    borderRadius:2,
    borderColor:'grey',
    borderWidth:0.5,
    padding:10
 //   marginLeft: 10,
    //marginVertical:15
  },
  row:{
    flexWrap:"wrap",
    alignContent:'flex-start',
     width:'100%',
    flexDirection:'row',
    paddingLeft:8
  },
  input:{
    alignItems:"center",
    justifyContent:"center",
    borderRadius:2,
    borderColor:'grey',
    borderWidth:0.5,
    padding:5
  },
  small:{
    color:"black",
    fontFamily:'open-regular',
    fontSize: 18
  },
  image: {
    width: 70,
    height: 70,
    margin: 15,
    borderRadius:50
  },
  block1:{
    flexDirection:"row",
    marginBottom:15,
    alignItems:"center",
   //justifyContent:'center'
  },
})