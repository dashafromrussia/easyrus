import React,{useEffect,useState} from 'react'
import {ScrollView, Text, StyleSheet,FlatList, Button, View, Image,TextInput} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

export const BadgeMess= ({info}) => {
    
    const cookie = useSelector(state => state.post.cookie)
    const allMess = useSelector(state => state.post.messages)//сообщения из чатов
    const newmessages = allMess.filter(el=>el.towhome.toString()===cookie.toString() && el.new==="yes") 
   
    
    return(
    <View marginLeft={17} paddingVertical={15}>
         <Text style={styles.text}>Чаты</Text> 
        {
        newmessages.length > 0 ?
        <View style={{ position: 'absolute', right: -13, top: 10, backgroundColor: 'red', borderRadius: 9, width: 14, height: 14, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white',fontSize:10 }}>{newmessages.length}</Text>
        </View> : null
        }
    </View>
    )
}

const styles = StyleSheet.create({
    text:{
     // fontFamily:'open-regular',
     fontWeight:'bold',
     fontSize:13.8
    },
    
  })