import React,{useEffect,useState} from 'react'
import {ScrollView, Text, StyleSheet,FlatList, Button, View, Image,TextInput} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'


export const BadgeComponent= ({info}) => {
    
    const cookie = useSelector(state => state.post.cookie)
    const requests = useSelector(state => state.post.requestfriend)
    const myreq = requests.filter(el=>el.whom.toString()===cookie.toString()) 
   
    
    return(
    <View marginLeft={17} paddingVertical={15}>
        <Text style={styles.text}>Друзья</Text> 
        {
       myreq.length > 0 ?
        <View style={{ position: 'absolute', right: -10, top: 10, backgroundColor: 'red', borderRadius: 9, width: 14, height: 14, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white',fontSize:10 }}>{myreq.length}</Text>
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

