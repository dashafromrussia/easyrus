import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator, Image, TouchableOpacity, Alert} from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { useDispatch, useSelector } from 'react-redux'
import { readMessage } from '../store/actions/post'

export const Chats = ({onOpen, el}) =>{
  //  const el = els ? els : {}
    const dispatch = useDispatch()
    const usersWithMe = useSelector(state => state.post.users)
    const cookie = useSelector(state => state.post.cookie)
    const statuses = useSelector(state => state.post.statuses)
    const myStatus = statuses.find(elem=>elem.userid.toString()===el.id.toString()) ? statuses.find(elem=>elem.userid.toString()===el.id.toString()).status : null
    const allMess = useSelector(state => state.post.messages)
    const youmess = allMess.filter(elem=>elem.name.toString()===cookie.toString() && elem.towhome.toString()===el.id.toString())
    const mymess = allMess.filter(elem=>{
      if(el.id.toString()!==cookie.toString()){ //для того чтобы не было проблем с чатом с самим собой
      return elem.name.toString()===el.id.toString() && elem.towhome.toString()===cookie.toString()
      }
      return null 
    })
  
    const  allmessages = [...youmess,...mymess]
     allmessages.sort((a, b) => Number(a.id) > Number(b.id) ? 1 : -1)
    const newmess = mymess.filter(m=>m.new==='yes')


     let lastmess = allmessages.length-1
     let lastmessage 
     if(lastmess>=0){
       lastmessage = allmessages[lastmess].mess
     }
     else{
      lastmessage = '...'
     }
  
     useEffect(()=>{
       
     },[])

  const readMessages =()=>{
   if(allmessages.length!==0){
    let info ={name:el.id.toString(),towhome:cookie.toString(), new:"no"}
   readMessage(info)(dispatch)
  }
    onOpen(el.id)
    console.log(allMess, cookie, el.id)
  }


    return(
        <TouchableOpacity onPress={()=>readMessages()}>
        <View style={styles.block}>
        <View style={styles.row}>
          <View>
          {<Image style={styles.imagef} source={{uri:el.image}}/>}
          {
      myStatus==='active' ?
        <View style={{ position: 'absolute', right: 0, bottom: 0, backgroundColor: 'blue', borderRadius: 9, width: 14, height: 14, justifyContent: 'center', alignItems: 'center' }}>
        </View> : null
        }
        </View>
          <View marginLeft={20}>
          <Text style={styles.text}>{el.name} {el.surname}</Text>
          </View>
        </View>
        <View flexDirection='row'>
        <View justifyContent='center' alignItems='center'><Text /*style={styles.text}*/style={/*allmessages[lastmess].new ==='yes'&&*/ allmessages[lastmess]?.towhome.toString()===cookie.toString() ?styles.bold :styles.text}>{lastmessage}</Text></View>
        {newmess.length!=0 ? <View style={{marginLeft:1.2*Dimensions.get('window').width/2, backgroundColor: '#cff4fc', borderRadius:30, width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}><View justifyContent='center' alignItems='center'><Text style={styles.text}>+{newmess.length}</Text></View></View>: null}
        </View>
        </View>
        </TouchableOpacity>
    )
}

      

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding:10,
    fontFamily:'open-regular',
  //  alignItems:'center',
  },
  text:{
    color:"black",
    fontFamily:'open-regular',
    fontSize: 15
  },
  bold:{
    color:"black",
    fontFamily:'open-bold',
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