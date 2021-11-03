import React,{useEffect, useState} from 'react'
import {View, Text, StyleSheet, Dimensions, ActivityIndicator, FlatList, ScrollView, Image, TouchableOpacity, Button, Alert} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useDispatch, useSelector } from 'react-redux'
import { addReqFriend, updateFriend, deleteRequest } from '../store/actions/post'
import { Ionicons } from '@expo/vector-icons'; 
import { DB } from '../db'
import { Searchbar } from 'react-native-paper';

export const GroupScreen = ({navigation}) =>{
  const [searchQuery, setSearchQuery] = useState('');
  const cookie= useSelector(state => state.post.cookie)
  let users= useSelector(state => state.post.users)


  const blocks = useSelector(state => state.post.blocks)
  const myBlock = blocks.find(u=>u.userid.toString()===cookie.toString()) ? blocks.find(u=>u.userid.toString()===cookie.toString()).blocks : []
  const inblock =[]
  blocks.forEach(el=>{
    el.blocks.forEach(elem=>{
      if(elem.id.toString()===cookie.toString()){
        inblock.push(el.userid)
      }
    })
  })
  let myusers = []

  users.forEach(el=>{
    if(myBlock.find(elem=>elem.id.toString()===el.id.toString())===undefined && inblock.find(elem=>elem.toString()===el.id.toString())===undefined){
     myusers.push(el)
    }
  })
  const friends = users.find(el=>el.id.toString()===cookie.toString()) ? users.find(el=>el.id.toString()===cookie.toString()).friends : []
  const statuses = useSelector(state => state.post.statuses)
  const requestfriend = useSelector(state => state.post.requestfriend)
  const data = users.find(el=>el.id.toString()===cookie.toString())


 const dispatch = useDispatch()

useEffect(()=>{
 /* console.log(requestfriend,'reqqqqqqqqqqqqqq')
  console.log(data,'data')
  console.log(myusers.filter(el=>el.id.toString()!==cookie.toString()),'myyusersssss')
  console.log('usersss',users)*/
})


  const toProfile =(elem)=>{
    if(cookie==elem.id.toString()){
      navigation.navigate('Main')
    }else{
       navigation.navigate('Profil',{data:elem})
    }
  }

  const addToFriend =(user)=>{ // заявка
  if(requestfriend.find(el=>el.who.toString()===cookie.toString() && el.whom.toString()===user.id.toString())){
    Alert.alert('Вы уже отправили заявку!')
    return false
  }else if(requestfriend.find(el=>el.who.toString()===user.id.toString() && el.whom===cookie.toString())) {
    Alert.alert('Вам уже отправили заявку!')
    return false
  }
  addReqFriend({who:cookie.toString(),whom:user.id.toString()})(dispatch)
  Alert.alert(`Вы отправили заявку дружбы ${user.login} !`)
  console.log({who:cookie.toString(),whom:user.id.toString()})
  console.log(requestfriend)
  }

  const accepted =(el)=>{
    const myfriends = [...friends,{id:el.id.toString()}]
    const yourfriends = [...el.friends,{id:data.id.toString()}]
    const thisreq = requestfriend.find(elem=>elem.who.toString()===el.id.toString() && elem.whom.toString()===data.id.toString()).id
    deleteRequest(thisreq)(dispatch)
// {myid:data.id,yourid:el.id,myfriends:myfriends,yourfriends:yourfriends}
updateFriend({id:data.id,friends:myfriends})(dispatch)
updateFriend({id:el.id,friends:yourfriends})(dispatch)
console.log('my',{id:data.id,friends:myfriends})
console.log('your',{id:el.id,friends:yourfriends})
     }


     const cancel =async(el)=>{
       const thisreq = requestfriend.find(elem=>elem.whom.toString()===el.id.toString() && elem.who.toString()===data.id.toString()).id
        await deleteRequest(thisreq)(dispatch)
        console.log(requestfriend)
     }


     const removeFriend =(elem)=>{
      updateFriend({id:data.id,friends:friends.filter(el=>el.id.toString()!==elem.id.toString())})(dispatch)
      updateFriend({id:elem.id,friends:elem.friends.filter(el=>el.id.toString()!==data.id.toString())})(dispatch)
        }


        const getdatareq =async()=>{
          updateFriend({id:1,friends:[]})(dispatch)
        // const req = await DB.loadReqFriends()
        // console.log(req)
        // await DB.deleteAllReqFriend()
        }
 
        const onChangeSearch = query =>{
          setSearchQuery(query)
        } 
        myusers = myusers.filter(el=>{
          return el.fullname.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
        })

    return(
    <View>
      <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
      <ScrollView>
      <View style={styles.main}>
        <View style={styles.cards}>
  {myusers.filter(el=>el.id.toString()!==cookie.toString()).map(elem=><View key={elem.id.toString()} style={styles.card}><TouchableOpacity onPress={()=>toProfile(elem)}><View>
      <View justifyContent="center" alignItems='center'/*marginRight={10}*/>
      <Image style={styles.image} source={{uri:elem.image}}/>
      {
      statuses.find(s=>s.userid.toString()===elem.id.toString()) && statuses.find(s=>s.userid.toString()===elem.id.toString()).status === 'active' ?
          <View style={{ position: 'absolute', right: 40, bottom: 20, backgroundColor: 'blue', borderRadius: 9, width: 14, height: 14, justifyContent: 'center', alignItems: 'center' }}>
          </View> : null
          }
      </View>
      <View justifyContent="center" alignItems='center' paddingBottom={15}>
      <Text style={styles.text}>{elem.name}</Text>
      <Text style={styles.text}>{elem.surname}</Text>
      </View>
      <View>
      {elem.id.toString()===cookie.toString() ? null : elem.friends.find(el=>el.id.toString()===cookie.toString()) ? <View paddingVertical={10}><Button title='Delete' color='red' onPress={()=>removeFriend(elem)}/></View> :
       requestfriend.find(el=>el.who.toString()===cookie.toString() && el.whom.toString()===elem.id.toString()) ? <View paddingVertical={10} paddingHorizontal={5}><Button title='Отменить заявку' color='blue' onPress={()=>cancel(elem)}/></View> :
       requestfriend.find(el=>el.who.toString()===elem.id.toString() && el.whom.toString()===cookie.toString()) ? <View paddingVertical={10}><Button title='Принять заявку' color='blue' onPress={()=>accepted(elem)}/></View> : 
       <View paddingVertical={10}><Button title='+add' color="black" onPress={()=>addToFriend(elem)}/></View>}
      </View>
      </View>
      </TouchableOpacity>
  </View>
  )}
  </View>
      </View>
      </ScrollView>
      </View>
    )
} 
GroupScreen.navigationOptions = ({ navigation }) => {
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
          Сообщества
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
      paddingVertical:20,
   //  alignItems:"center",
  //   justifyContent:"center",
    },
    admin: {
      flex: 1,
     paddingVertical:20,
    // alignItems:"center",
   //  justifyContent:"center",
    },
    text:{
      color:"black",
      fontFamily:'open-regular',
      fontSize: 12
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
    },
    cards:{
      flexDirection:'row',
      flexWrap:'wrap',
      alignItems:"center",
      justifyContent:"center",
    },
    card:{
      borderWidth:0.1,
      borderColor:'blue',
      borderRadius:5,
      width:1.2*Dimensions.get('window').width/3,
      justifyContent:"space-between",
       alignItems:'center',
       margin:5,
       padding:5
    }
  })

  /*  {elem.friends.find(el=>el.id.toString()===cookie.toString()) ? <Button title='Удалить из друзей' onPress={()=>removeFriend(elem)}/> :
       requestfriend.find(el=>el.who.toString()===cookie.toString() && el.whom===elem.id.toString()) ? <Button title='Отменить заявку' onPress={()=>accepted(elem)}/> :
       requestfriend.find(el=>el.who.toString()===elem.id.toString() && el.whom===cookie.toString()) ? <Button title='Принять заявку'  onPress={()=>rejected(elem)}/> : 
       <Button title='+ Add' color="black" onPress={()=>addToFriend(elem)}/>
    }*/


    /*      <ScrollView>
      <View style={styles.main}>
        {<Button title='data requests' onPress={()=>getdatareq()}/>}
  {myusers.map(elem=><View key={elem.id.toString()} justifyContent="center" alignItems='center'><TouchableOpacity onPress={()=>toProfile(elem)}><View style={styles.block1}>
  <View marginRight={10}>
  <Image style={styles.image} source={{uri:elem.image}}/>
  {
  statuses.find(s=>s.userid.toString()===elem.id.toString()) && statuses.find(s=>s.userid.toString()===elem.id.toString()).status === 'active' ?
      <View style={{ position: 'absolute', right: 17, bottom: 20, backgroundColor: '#00e600', borderRadius: 9, width: 14, height: 14, justifyContent: 'center', alignItems: 'center' }}>
      </View> : null
      }
  </View>
  <View justifyContent="center" alignItems='center' paddingRight={40}>
  <Text style={styles.header}>{elem.name}</Text>
  <Text style={styles.header}>{elem.surname}</Text>
  </View>
  <View>
  {elem.id.toString()===cookie.toString() ? null : elem.friends.find(el=>el.id.toString()===cookie.toString()) ? <Button title='Delete' color='red' onPress={()=>removeFriend(elem)}/> :
   requestfriend.find(el=>el.who.toString()===cookie.toString() && el.whom.toString()===elem.id.toString()) ? <Button title='Отменить заявку' onPress={()=>cancel(elem)}/> :
   requestfriend.find(el=>el.who.toString()===elem.id.toString() && el.whom.toString()===cookie.toString()) ? <Button title='Принять заявку' onPress={()=>accepted(elem)}/> : 
   <Button title='+ Add' color="black" onPress={()=>addToFriend(elem)}/>}
  </View>
  </View>
  </TouchableOpacity>
</View>
)}
  </View>
  </ScrollView>*/