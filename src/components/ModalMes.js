import React, {useState} from 'react';
import { StyleSheet, Image, View,Text, Modal,TouchableOpacity, Button} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'


export const ModalMes = ({visible,name,onCancel,onOpen}) =>{
   
    /*const usersWithMe = useSelector(state => state.post.students)
    const users = usersWithMe.filter(el=>el.name!==name)
    
    

    return(
        <Modal visible={visible} animationType="slide">
          <View>
        {users.map(elem=>
            <View key={elem.id}>
            <Student id={elem.id} name={elem.name} myName={name} onOpen={onOpen}/>
            </View>
            )}
        </View>   
         <Button title="<< отмена" onPress={()=>onCancel()}/>
        </Modal>
    )*/
    const cookie = useSelector(state => state.post.cookie)
    const users = useSelector(state => state.post.users)
    const contacts = useSelector(state => state.post.contacts)
    const myContacts = contacts.find(el=>el.userid.toString()===cookie.toString()) ? contacts.find(el=>el.userid.toString()===cookie.toString()).contacts : []
    
  const chats =[]
  myContacts.map(el=>{
    chats.push(users.find(elem=>elem.id.toString()===el.id.toString()))
  })
   
    
  
      return(
        <Modal visible={visible} animationType="slide"> 
        <View style={styles.main}>
          {chats.map((el,index)=><TouchableOpacity key={index} onPress={()=>onOpen()}>
          <View style={styles.block}>
          <View style={styles.row}>
            <Image style={styles.imagef} source={{uri:el?.image}}/>
            <View marginLeft={20}>
            <Text style={styles.text}>{el?.name} {el?.surname}</Text>
            </View>
          </View>  
          </View>
          </TouchableOpacity>)}
          <Button title="<< отмена" onPress={()=>onCancel()}/>
        </View>
        </Modal>
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
  