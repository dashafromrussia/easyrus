import React, { useEffect } from 'react'
import {View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator, Image, TouchableOpacity, Alert} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useSelector, dispatch, useDispatch } from 'react-redux'
import { Chats } from '../components/Chats'
import { addsContacts, updateContact } from '../store/actions/post'

export const ChatScreen = ({navigation}) =>{
 const dispatch = useDispatch()
  const cookie = useSelector(state => state.post.cookie)
  const users = useSelector(state => state.post.users)
  const contacts = useSelector(state => state.post.contacts)
  const nomycontacts = contacts.filter(el=>el.userid.toString()!==cookie.toString())
  const elcontacts = contacts.find(el=>el.userid.toString()===cookie.toString()) 
  const myContacts = elcontacts ? elcontacts.contacts : []
 const aincontacts =[]


  nomycontacts.forEach(el=>{
   el.contacts.forEach(elems=>{
     if(elems.id.toString()===cookie.toString() && myContacts.find(elems=>elems.id.toString()===el.userid.toString())===undefined){
      aincontacts.push(users.find(s=>s.id.toString()===el.userid.toString()))
     }
   })
    })

useEffect(()=>{
  console.log(aincontacts,'aincontacts')
})
  
  const chats =[users.find(elem=>elem.id.toString()===cookie.toString())]

   myContacts.map(el=>{
  chats.push(users.find(elem=>elem.id.toString()===el.id.toString()))
})
 
useEffect(()=>{
  console.log(chats,'chats')
})


 const onOpen =(id)=>{
  navigation.navigate('Message',{userid:id})
 }

const actionContacts =(id)=>{
  if(elcontacts){
    updateContact({userid:cookie.toString(),contacts:[...myContacts,{id:id.toString()}]})(dispatch)
  }else{
    addsContacts({userid:cookie.toString(),contacts:[{id:id.toString()}]})(dispatch)
  }
  navigation.navigate('Message',{userid:id})
}

 const noContactOpen=(id)=>{
  Alert.alert(
    'Подтвердите действие',
    `Добавить ${users.find(el=>el.id.toString()===id.toString()).name} в Ваш список контактов ?`,
    [
      {
        text: "Отмена",
        onPress: () => {console.log('no')},
        style: "cancel"
      },
      { text: "OK", onPress: () => actionContacts(id)}
    ]
  );

 }

    return(
      <View style={styles.main}>
        {aincontacts.map((el,index)=><Chats el={el} onOpen={noContactOpen} key={index}/>)}
        {chats.map((el,index)=><Chats el={el} onOpen={onOpen} key={index}/>)}
      </View>
    )
}

ChatScreen.navigationOptions = ({ navigation }) => {
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
          Чаты
        </Text>
      );
    },
      headerLeft:()=> 
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
  main: {
    flex: 1,
    padding:10,
    fontFamily:'open-regular',
  //  alignItems:'center',
  },
  text:{
    color:"grey",
    fontFamily:'open-regular',
    fontSize: 15
  },
  center: {
    flex: 1,
    padding:10,
    alignItems:'center',
    fontFamily:'open-regular',
    justifyContent:'center'
  },
  block:{
    borderColor:'grey',
    borderBottomWidth: 0.7,
    paddingBottom:10
  },
  imagef: {
    width: 60,
    height: 60,
    borderRadius:50
  },
  row:{
    flexDirection:'row',
    paddingVertical:10
  }
})
