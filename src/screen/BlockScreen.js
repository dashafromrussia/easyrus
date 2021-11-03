import React,{useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, ActivityIndicator, FlatList, ScrollView, Image, TouchableOpacity, Button, Alert} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useDispatch, useSelector } from 'react-redux'
import { addReqFriend, updateFriend, deleteRequest, updateBlock } from '../store/actions/post'
import { Ionicons } from '@expo/vector-icons'; 
import { DB } from '../db'


export const BlockScreen = ({navigation}) =>{
  const dispatch = useDispatch()
  const cookie= useSelector(state => state.post.cookie)
  const users= useSelector(state => state.post.users)
  const blocks = useSelector(state => state.post.blocks)
  const myBlock =  blocks.find(u=>u.userid.toString()===cookie.toString()) ? blocks.find(u=>u.userid.toString()===cookie.toString()).blocks : []
  /*const inblock =[]
  blocks.forEach(el=>{
    el.blocks.forEach(elem=>{
      if(elem.id.toString()===cookie.toString()){
        inblock.push(el.userid)
      }
    })
  })*/
  const blockusers = []

  users.forEach(el=>{
    if(myBlock.find(elem=>elem.id.toString()===el.id.toString())){
     blockusers.push(el)
    }
  })
 


        const outBlock =(elem)=>{
            updateBlock({userid:cookie.toString(),blocks:myBlock.filter(el=>el.id.toString()!==elem.id.toString())})(dispatch)
        }

     
    return(
      <ScrollView>
      <View style={styles.main}>
        <Text>Заблокированные пользователи</Text>
        <Button title='data requests' onPress={()=>getdatareq()}/>
  {blockusers.length!==0 ? blockusers.map(elem=><View key={elem.id.toString()}><TouchableOpacity onPress={()=>false}><View style={styles.block1}>
      <View marginRight={10}>
      <Image style={styles.image} source={{uri:elem.image}}/>
      </View>
      <View justifyContent="center" paddingRight={40}>
      <Text style={styles.header}>{elem.name}</Text>
      <Text style={styles.header}>{elem.surname}</Text>
      </View>
      <View marginLeft={40}>
       <Button title='Разблокировать' color="black" onPress={()=>outBlock(elem)}/>
      </View>
      </View>
      </TouchableOpacity>
  </View>
  ):<Text>Заблокированных пользователей нет...</Text>}
      </View>
      </ScrollView>
    )
} 
BlockScreen.navigationOptions = ({ navigation }) => {
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
          Заблокированные
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
     padding:20,
   //  alignItems:"center",
  //   justifyContent:"center",
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
      marginBottom:15,
      flexDirection:"row",
      marginBottom:15,
      alignItems:"center",
   //  justifyContent:'center'
    },
    buttons:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      marginBottom:30
    },
    list:{
    //  justifyContent:"space-between",
      flexDirection:"row",
    }
  })

