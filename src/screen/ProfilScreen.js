import React, {useState,useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions, Button, Image, Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { addReqFriend, updateFriend, deleteRequest, addsContacts, updateContact, updateBlock, addBlock, removeBlockMessage } from '../store/actions/post'


export const ProfilScreen = ({navigation}) =>{
    const dispatch = useDispatch()
    const cookie = useSelector(state => state.post.cookie)
    const users = useSelector(state => state.post.users)
    const friends = users.find(el=>el.id.toString()===cookie.toString()) ? users.find(el=>el.id.toString()===cookie.toString()).friends : []
    const blocks = useSelector(state => state.post.blocks)
    const myBlock = blocks.find(u=>u.userid.toString()===cookie.toString()) ? blocks.find(u=>u.userid.toString()===cookie.toString()).blocks : []
    /*const inblock =[]
    blocks.forEach(el=>{
      el.blocks.forEach(elem=>{
        if(elem.id.toString()===cookie.toString()){
          inblock.push({id:el.userid})
        }
      })
    })
    const myusers = []
    const allblocked = [...inblock,...myBlock]
    users.forEach(el=>{
      if(myBlock.find(elem=>elem.id.toString()===el.id.toString())===undefined && inblock.find(elem=>elem.id.toString()===el.id.toString())===undefined){
       myusers.push(el)
      }
    })*/
    
    const data = navigation.getParam('data')  
    const contacts = useSelector(state => state.post.contacts)
    const myContacts = contacts.find(el=>el.userid.toString()===cookie.toString())
    const userContacts = contacts.find(el=>el.userid.toString()===data.id.toString())
    const statuses = useSelector(state => state.post.statuses)
    const status = statuses.find(el=>el.userid.toString()==data.id.toString())
    const requestfriend = useSelector(state => state.post.requestfriend)
    const myreq = requestfriend.find(el=>el.who.toString()===cookie.toString() && el.whom.toString()===data.id.toString())
    const youreq = requestfriend.find(el=>el.who.toString()===data.id.toString() && el.whom.toString()===cookie.toString())

    const addToFriend =(user)=>{ // заявка
      if(requestfriend.find(el=>el.who.toString()===cookie.toString() && el.whom===user.id.toString())){
        Alert.alert('Вы уже отправили заявку!')
        return false
      }
      addReqFriend({who:cookie.toString(),whom:user.id.toString()})(dispatch)
      Alert.alert(`Вы отправили заявку дружбы ${user.login} !`)
      }

      const removeFriend =async()=>{
       await updateFriend({id:cookie, friends:friends.filter(el=>el.id.toString()!==data.id.toString())})(dispatch)
       await updateFriend({id:data.id, friends:data.friends.filter(el=>el.id.toString()!==cookie.toString())})(dispatch)
          }
          const accepted =(el)=>{
            const myfriends = [...friends,{id:el.id.toString()}]
            const yourfriends = [...el.friends,{id:data.id.toString()}]
            const thisreq = myrequest.find(elem=>elem.who.toString()===el.id.toString()&& elem.whom.toString()===data.id.toString()).id
            deleteRequest(thisreq)(dispatch)
        //  {myid:data.id,yourid:el.id,myfriends:myfriends,yourfriends:yourfriends}
        updateFriend({id:data.id,friends:myfriends})(dispatch)
        updateFriend({id:el.id,friends:yourfriends})(dispatch)
        console.log('my',{id:data.id,friends:myfriends})
        console.log('your',{id:el.id,friends:yourfriends})
             }
        
        
             const rejected =(el)=>{
               const thisreq = myreq.find(elem=>elem.who.toString()===el.id.toString()&& elem.whom.toString()===data.id.toString()).id
                 deleteRequest(thisreq)(dispatch)
             }


      const actionContacts = (data)=>{
      if(myContacts){
        updateContact({userid:cookie.toString(),contacts:[...myContacts.contacts,{id:data.id.toString()}]})(dispatch)
      }else{
        addsContacts({userid:cookie.toString(),contacts:[{id:data.id.toString()}]})(dispatch)
      }
      navigation.navigate('Message',{userid:data.id})
       }

        const sendMess = (data)=>{ //добавл чел в список св контактов
         // navigation.navigate('Message',{userid:data.id})
          if(myContacts){
            if(myContacts.contacts.find(elem=>elem.id.toString()===data.id.toString())){
              navigation.navigate('Message',{userid:data.id})
            }
          }
          else{
          Alert.alert(
            'Подтвердите действие',
            `Добавить ${data.name} в Ваш список контактов ?`,
            [
              {
                text: "Отмена",
                onPress: () => {console.log('aa')},
                style: "cancel"
              },
              { text: "OK", onPress: () => actionContacts(data)}
            ]
          );
         
          }
       
        }
        
      const addinBlock =async()=>{
        if(blocks.find(u=>u.userid.toString()===cookie.toString())){
         await updateBlock({userid:cookie.toString(),blocks:[...myBlock, {id:data.id.toString()}]})(dispatch)
        }else{
         await addBlock({userid:cookie.toString(),blocks:[{id:data.id.toString()}]})(dispatch)
        }
       await updateContact({userid:cookie.toString(),contacts:[...myContacts.contacts.filter(el=>el.id.toString()!==data.id.toString())]})(dispatch)
       await updateContact({userid:data.id.toString(),contacts:[...userContacts.contacts.filter(el=>el.id.toString()!==cookie.toString())]})(dispatch)
      await removeFriend(data)
      await removeBlockMessage({name:cookie.toString(),towhome:data.id.toString()})(dispatch)
        navigation.navigate('Group')
      }


    return(
        <ScrollView>
        <View style={styles.admin}>
          {/*<Button title='contacts' onPress={()=>console.log(contacts)}/>*/}
        <View style={styles.block1}>
         <View> 
        <Image style={styles.image} source={{uri:data?.image}}/>
        {
        status ==='active' ?
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
         <Button title='Написать сообщение' color='blue' onPress={()=>sendMess(data)}/>
        <Button title='Заблокирвать' color='red' onPress={addinBlock}/>   
        </View>
        {myreq ? <Button title='Отменить заявку' onPress={()=>rejected(data)}/>:
        youreq ? <Button title='Принять заявку' onPress={()=>accepted(data)}/> :
         data.friends.find(el=>el.id.toString()===cookie.toString()) ? <Button title='Удалить из друзей' color='black' onPress={()=>removeFriend()}/> : <Button title='Добавить в друзья' color='black' onPress={()=>addToFriend(data)}/>}
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
        <Text style={styles.header}> Цели: </Text>
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
            
    )
}


    
    ProfilScreen.navigationOptions = ({ navigation }) => {
    
      const data = navigation.getParam('data')  
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
                   {data.login}
                  </Text>
                );
              },
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
         // width:3*Dimensions.get('window').width/2
        },
        buttons:{
          flexDirection:"row",
          alignItems:"center",
          justifyContent:"space-between",
          marginBottom:30
        },
      })