import React,{ useEffect, useState } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {View, Text, StyleSheet,FlatList, ActivityIndicator, Button, TextInput, ScrollView, Alert, Linking, Platform, Image, Dimensions, AppState, TouchableNativeFeedback} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addCookie, addUsers, addView, loadComments, loadLogin, loadPosts, loadingUsers, loadViews, updateView, loadReqFriend, loadStatus, addStatuses, delStatus, updatesStatus, loadsContacts, loadMessage, loadsBlock, loadsArticle, loadsComments } from '../store/actions/post'
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons';
import { DB } from '../db'
//import PushNotification from 'react-native-push-notification';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { ModalImage } from '../components/ModalImage'
//const SmsAndroid = require('react-native-sms-android');


export const MainScreen = ({navigation}) =>{
  const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
  const [appState,setAppState] = useState(AppState.currentState)
  const [cook,setCook] = useState('0')
  const [visible,setVisible] = useState(false)
  useEffect( //перенесли в апп
    () => {
      AppState.addEventListener('change', _handleAppStateChange);
      return () => AppState.addEventListener('change', _handleAppStateChange);
    },
    []
  );

  
useEffect(()=>{
  if(cook==='0' || cook===null){
}else{
  console.log({userid:cook,status:appState},'adadaadda')
  console.log('aaaa',statuses.find(el=>el.userid.toString()===cook.toString()))
  updateStatus()
}
console.log(statuses,'STST')
  },[appState,cook])
 

const updateStatus =async()=>{
  await loadStatus()(dispatch)
  if(statuses.find(el=>el.userid.toString()===cook.toString())){
    console.log('update')
    console.log(appState)
      updatesStatus({userid:cook.toString(),status:appState})(dispatch)
  }
else{
  addStatuses({userid:cook.toString(),status:appState})(dispatch)
}
}

const  _handleAppStateChange = (nextAppState) => {
  if (appState.match(/inactive|background/) && nextAppState === 'active') {
    console.log('App has come to the foreground!')
  }
  setAppState(nextAppState);
}

const getData = async () => { 
  const value = await AsyncStorage.getItem('@storage_Key')  
await loadReqFriend()(dispatch) //проблема грузит кольцо
await loadStatus()(dispatch)
await loadsArticle()(dispatch)
await loadsContacts()(dispatch)
await loadsComments()(dispatch)
  await loadingUsers()(dispatch)
  await loadMessage({name:value.toString()})(dispatch)
  await loadsBlock()(dispatch)
  // if(value!==null){
    await addCookie(value)(dispatch)
    setCook(value)
    navigation.setParams({cook:value})
  // }
}

  
   const dispatch = useDispatch()
    useEffect(()=>{
      getData()
    },[])

   /*useEffect(()=>{  
  if(cookie!==0 || cookie!==null){
     await loadMessage({name:cookie.toString()})(dispatch)
  }
    },[cookie])*/


   useEffect(()=>{ //экспрементально
      console.log(cookie,'cookkk')
    })

   const users= useSelector(state => state.post.users)
   const articles = useSelector(state => state.post.articles)
    const cookie= useSelector(state => state.post.cookie)
    const loading= useSelector(state => state.post.loading)
    const statuses = useSelector(state => state.post.statuses)
    const contacts = useSelector(state => state.post.contacts)
    const messages = useSelector(state => state.post.messages)
    const comments = useSelector(state => state.post.comments)
    const blocks = useSelector(state => state.post.blocks)
   const myblock = blocks.find(u=>u.userid.toString()===cookie.toString())


  const goBack =async()=>{
    delStatus(cook)(dispatch)
    await AsyncStorage.setItem('@storage_Key', "0")
    addCookie("0")(dispatch)
    setCook("0")
    navigation.setParams({cook:"0"})
  }

  
  const del =async()=>{
   // await AsyncStorage.setItem('@storage_Key', "0")
  //  await DB.deleteOne()
   // console.log('dell')
   const users = await DB.loadUsers()
   console.log(users)
  }

 
  const removeAll =async()=>{
   await DB.deleteStatus()
   await AsyncStorage.setItem('@storage_Key', "0")
  }

  const toProfile =(elem)=>{
    if(cookie.toString()==elem.id.toString()){
      navigation.navigate('Main')
    }else{
       navigation.navigate('Profil',{data:elem})
    }
    navigation.navigate('Profil',{data:elem})
  }


  const data =cookie !==null ? users.find(el=>el.id.toString()===cookie.toString()) :{}
  if(loading || cookie==''){
    return  <ActivityIndicator color="black"/>
  }

  const getdata =async()=>{
    await DB.deleteContacts()
  }

  const openPhoto =()=>{
    setVisible(true)
  }

  const clearall =async()=>{
await DB.deleteAllMess()
await DB.deleteAllReqFriend()
await DB.deleteBlock()
await DB.deleteContacts()
console.log('dd')
  }

    return(
      <>
     {/*<Text>Current state is: {appState}</Text>*/}
     {/*<Button title='blocks' onPress={()=>console.log(statuses)}/>*/}
     {<Button title="dd" onPress={()=>clearall()}/>}
     {/*<Button title="cтатус" onPress={()=>console.log(statuses)}/>*/}
      {cookie==null || cookie=="0" ? <View style={styles.main}>
        <Button title="Войти" onPress={()=>navigation.navigate('Entry')}/>
        <Button title="Регистрация" onPress={()=>navigation.navigate('Regist')}/>
      </View>:
      <ScrollView>
      <View style={styles.admin}>
      <View style={styles.block1}>
       <View>
     <ModalImage visible={visible} image={data?.image} onCancel={()=>setVisible(false)}/>    
     <TouchableOpacity onPress={openPhoto}>     
      <Image style={styles.image} source={{uri:data?.image}}/>
      </TouchableOpacity>
      {
      appState==='active' ?
        <View style={{ position: 'absolute', right: 17, bottom: 20, backgroundColor: '#00e600', borderRadius: 9, width: 14, height: 14, justifyContent: 'center', alignItems: 'center' }}>
        </View> : null
        }
      </View>
      <View justifyContent="center" paddingLeft={20}>
      <Text style={styles.header}>{data?.name}</Text>
      <Text style={styles.header}>{data?.surname}</Text>
      <Text style={styles.header}>{data?.age} года</Text>
      </View>
      </View>
      <View marginBottom={20}>
       <View marginBottom={10}>
         <View flexDirection="row" justifyContent="center">
       <View style={styles.icons} >  
       <Wrapper style={styles.icons} onPress={()=> navigation.navigate('Update',{data:data})}>
       <AntDesign name="edit" size={35} color="black"/>  
       </Wrapper>
       </View>
       <View style={styles.icons} >
       <Wrapper style={styles.icons} onPress={()=>navigation.navigate('Friend')}>
       <SimpleLineIcons name="people" size={35} color="black"/>
       </Wrapper>
       </View>
       <View style={styles.icons}>
       <Wrapper onPress={()=>navigation.navigate('Block')}>
       <Entypo name="block" size={35} color="black"/>
       </Wrapper>
       </View>
       <View style={styles.icons}>
       <Wrapper onPress={()=>goBack()}>
       <MaterialIcons name="exit-to-app" size={35} color="black" />
       </Wrapper>
       </View>
       <View>
       </View>
       </View>
      {/*<Button title='Редактировать' onPress={()=> navigation.navigate('Update',{data:data})}/>*/}
      {/*<Button title='Мои друзья' color='black' onPress={()=>navigation.navigate('Friend')}/>*/}
      {/*<Button title='Заблокированные' color='black' onPress={()=>navigation.navigate('Block')}/>*/}
      {data?.friends.length!==0 ? 
      <View marginTop={10}>
       <View paddingTop={10}><Text style={styles.text}>Мои друзья</Text></View>
        <View style={styles.friends}>
     {data?.friends.filter((f,index)=>index<=3).map(elem=><View style={styles.friend} key={elem.id.toString()}><TouchableOpacity onPress={()=>toProfile(users.find(el=>el.id.toString()===elem.id.toString()))}>
     <Image style={styles.imagef} source={{uri:users.find(el=>el.id.toString()===elem.id.toString())?.image}}/>
     <View style={styles.centername}><Text>{users.find(el=>el.id.toString()===elem.id.toString())?.name}</Text></View>
     </TouchableOpacity></View>)}
        </View>
      </View>
      :null}
      </View>
      </View>
      <View style={styles.block1}>
        <Text style={styles.header}>Город: </Text>
        <Text style={styles.text}>{data?.city}</Text>
      </View>
      <View style={styles.block1}>
      <Text style={styles.header}>Страна: </Text>
      <Text style={styles.text}>{data?.country}</Text>
      </View>
      <View style={styles.block1}>
      <Text style={styles.header}>Работа: </Text>
      <Text style={styles.text}>{data?.work}</Text>
      </View>
      <View style={styles.block1}>
      <Text style={styles.header}>Деятельность: </Text>
      <Text style={styles.text}>{data?.activity}</Text>
      </View>
      <View style={styles.block1}>
      <Text style={styles.header}>Родной язык: </Text>
      <Text style={styles.text}>{data?.motherlan}</Text>
      </View>
      <View style={styles.block1}>
      <Text style={styles.header}>Уровень русского языка: </Text>
      <Text style={styles.text}>{data?.level}</Text>
      </View>
      <View style={styles.block1}>
      <Text style={styles.header}>Цели: </Text>
      <View>
      {data?.myachives.map((el,index)=><View key={index} paddingVertical={3} paddingHorizontal={5}><Button key={index} color='hotpink' title={el.achive} onPress={()=>false}/></View>)}
      </View>
      </View>
      <View style={styles.block1}>
      <Text style={styles.header}>О себе : </Text>
      <View width={Dimensions.get('window').width/2}>
      <Text style={styles.text}>{data?.about}</Text>
      </View>
      </View>
      <View style={styles.block1}>
      <Text style={styles.header}>Дата регистрации: </Text>
      <Text style={styles.text}>{data?.time}</Text>
      </View>
      </View>
      </ScrollView>
      }
      </>
    )
  
}

MainScreen.navigationOptions = ({ navigation }) => {
  const cookie = navigation.getParam('cook')
  const header = <Text
    style={{
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20
    }}
  >
  {cookie !=="0" ? 'Главная' : 'Регистрация'}
  </Text>
  

  const drawer = cookie !=="0" ? <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
  <Item
    title='Toggle Drawer'
    iconName='ios-menu'
    onPress={()=>navigation.toggleDrawer()}
  />
</HeaderButtons> : ''
 return { headerTitle: () => 
 header,
  headerLeft:()=> 
  drawer
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
    marginRight:15,
    color:'black'
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
  imagef: {
    width: 60,
    height: 60,
    borderRadius:50
  },
  block1:{
    flexDirection:"row",
    marginBottom:15,
    alignItems:"center",
   // width:3*Dimensions.get('window').width/2
  },
  buttons:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:30
  },
  friends:{
    flexDirection:"row",
    alignItems:"center",
    marginTop:10
  },
  icons:{
    paddingHorizontal:20
  },
  friend:{
    paddingLeft:30,
    alignItems:"center",
    justifyContent:"center",
  },
  centername:{
    alignItems:"center",
    justifyContent:"center",
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
    "@notifee/react-native": "^3.0.1",
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
    "react-native-notifications": "^4.1.2",
    "react-native-paper": "^4.9.2",
    "react-native-push-notification": "^8.1.1",
    "react-native-reanimated": "^1.13.1",
    "react-native-safe-area-context": "3.2.0",
    "react-native-screens": "~3.4.0",
    "react-native-select-dropdown": "^1.1.0",
    "react-native-sms": "^1.11.0",
    "react-native-sms-android": "^0.4.1",
    "react-native-swipe-gestures": "^1.0.5",
    "react-native-web": "~0.13.12",
    "react-native-web-webview": "^1.0.2",
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
}
*/