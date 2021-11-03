import React,{useEffect,useState} from 'react'
import {ScrollView, Text, StyleSheet,FlatList, Button, View, Image, TextInput,TouchableOpacity,AppState} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ContentMess } from '../components/ContentMess'
import { addsPech, deletePech, loadMessage, loadsPech, removeMessage } from '../store/actions/post'
import { sendMessage } from '../store/actions/post'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { ImageWithModal } from '../components/ImageWithModal'
import { NewImageModal } from '../components/NewImageModal'
import { EditModal } from '../components/EditModal'
import { ModalMes } from '../components/ModalMes'
import { Icon } from 'react-native-elements'

export const MessageScreen = ({navigation}) => {
  const userid= navigation.getParam('userid')
  
  const redirectMessage =navigation.getParam('redirect')
  const redirectPost = navigation.getParam('redirectpost')

  let redirectpost
  if(redirectPost==undefined){
    redirectpost = []
  }else{
    redirectpost = redirectPost
  }

  let redirectmessage 
  if(redirectMessage===undefined){
    redirectmessage = []
  }else{
    redirectmessage = redirectMessage
  }
  const [appState,setAppState] = useState(AppState.currentState)
  const [sharepost,setSharepost] = useState(redirectpost)
  const [redirect,setRedirect]=useState([])
  const [modaldirect,setModaldirect]=useState(false)
  const dispatch = useDispatch()
  const usersWithMe = useSelector(state => state.post.users)
  const cookie = useSelector(state => state.post.cookie)
  const writing= useSelector(state => state.post.writing)
  const allMess = useSelector(state => state.post.messages)
  const youmess = allMess.filter(elem=>elem.name.toString()===cookie.toString() && elem.towhome.toString()===userid.toString())
  const mymess = allMess.filter(elem=>{
    if(userid.toString()!==cookie.toString()){ //для того чтобы не было проблем с чатом с самим собой
    return elem.name.toString()===userid.toString() && elem.towhome.toString()===cookie.toString()
    }
    return null 
  })

  let allmessages = [...youmess,...mymess]
   allmessages.sort((a, b) => Number(a.id) > Number(b.id) ? 1 : -1)
  const [mess,setMess]=useState('')
  const [images,setImages]=useState([])
 const[modal, setModal] = useState(false)
  
useEffect(()=>{
return ()=>deletePech({whome:userid.toString(),name:cookie.toString()})(dispatch)
},[])



useEffect(()=>{ //печатает...
  if(appState==='active'){
 setInterval(
  () => loadsPech({whome:cookie.toString(),name:userid.toString()})(dispatch),
  20000
)
  }else{
    clearInterval( setInterval(
      () => loadsPech({whome:cookie.toString(),name:userid.toString()})(dispatch),
      20000
    ))
  }
return ()=>clearInterval( setInterval(
  () => loadsPech({whome:cookie.toString(),name:userid.toString()})(dispatch),
  20000
))
},[appState])


useEffect(()=>{ //сообщения
  if(appState==='active'){
 setInterval(
  () => loadMessage({name:userid.toString()})(dispatch),
  20000
)
  }else{
    clearInterval( setInterval(
      () => loadMessage({name:userid.toString()})(dispatch),
      20000
    ))
  }
return ()=>clearInterval( setInterval(
  () =>loadMessage({name:userid.toString()})(dispatch),
  20000
))
},[appState])

/*const memoizedCallback = useCallback( 
  () => {
    dispatch(pechatRemove(id)) 
  },
  [id,dispatch],
);*/

/*useEffect(()=>{
  if(mypechat.length!==0){
    dispatch(pechatRemove(mypechat[0].id)) 
  }
},[])*/

async function askForPermissions() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Ошибка', 'Вы не дали прав на доступ к фото')
      return false
    }
    return true
  }
  
  
    const takePhoto = async () => {
      const hasPermissions = await askForPermissions()
      if (!hasPermissions) {
        return
      }
      const img = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.All, 
        quality: 0.7,
        allowsEditing: true,
        aspect: [3, 4]
      })
      if (!img.cancelled) {
        let id=Date.now().toString()
        setImages((prev)=>[...prev,{id:id,image:img.uri}])
      }
     // setVisible(false)
    }

    

  const delPicture =(id)=>{
   setImages(images.filter(elem=>elem.id!==id))
  }

  let sendmess=[]
  let send
 
  const sendMes =()=>{ //чтобы элемент массива редирект не был вложенным,делаем следующее
    let time = new Date()
    if(redirectmessage.length===0){ //еслм переслан сообщ нет
    send={name:cookie.toString(), mess:mess, images:images, towhome:userid.toString(),new:'yes', sharepost:sharepost, redirect:[], time:time.toLocaleString()}
  }else{
    redirectmessage.forEach(el=>{ //если есть пересланное сообщ,но у него нет пересланного
      if(el.redirect.length===0){
      send={name:cookie.toString(), mess:mess, images:images, towhome:userid.toString(),new:'yes',redirect:redirectmessage,sharepost:sharepost, time:time.toLocaleString()}
      }else{ //если есть пересланное и у него тоже есть пересланное
    sendmess.push({id:el.id,name:el.name,mess:el.mess,images:el.images,towhome:el.towhome, new:el.new, sharepost:el.sharepost, time: el.time})
    el.redirect.forEach(elem=>{
    sendmess =[...sendmess,{...elem}]
    send={name:cookie.toString(), mess:mess, images:images, towhome:userid.toString(), new:'yes',sharepost:sharepost,redirect:sendmess, time:time.toLocaleString()}
  })
    }
    }) 
  }
  dispatch(sendMessage(send))
  deletePech({whome:userid.toString(),name:cookie.toString()})(dispatch)
  redirectmessage=[]
  setRedirect([])
  setImages([])
  setMess('')
  setSharepost([])
 console.log(send)
  }


  const removeMess =(id)=>{
    deletePech({whome:userid.toString(),name:cookie.toString()})(dispatch)
      let delmes =allmessages.filter(el=>el.id===id && el.name.toString()===cookie.toString())
      if(delmes.length!==0){
    dispatch(removeMessage(id))
      }   
  }  
  
  
  const redirectMess =(data)=>{ //пересылка сообщ другому пользователю
    setRedirect([{...data}])
    setModaldirect(true)
    deletePech({whome:userid.toString(),name:cookie.toString()})(dispatch)
}

const cancelModal =()=>{
  setRedirect([])
  setModaldirect(false)
}

//кому шлем
const onOpen =(id)=>{
  navigation.navigate('Message',{useid:id,redirect:redirect})
  setModaldirect(false)
  deletePech({whome:userid.toString(),name:cookie.toString()})(dispatch)
}
//

const onePhoto =(data)=>{
//  navigation.navigate('Photo',{data:data,name:myName})
       }

/*let pech = {id:Date.now().toString(), name:myName,towhome:name,status:"Печатает...."}
const writeMess =(text)=>{ //печатает...
  setMess(text)
  if(mypechat.length===0){
  dispatch(pechatMess(pech))
  }
}*/

const toProfile =(elem)=>{
    if(cookie==elem.id.toString()){
      navigation.navigate('Main')
    }else{
       navigation.navigate('Profil',{data:elem})
    }
    navigation.navigate('Profil',{data:elem})
    deletePech({whome:userid.toString(),name:cookie.toString()})(dispatch)
  }

  const pechatMess =(text)=>{
    setMess(text)
    console.log(writing.find(el=>el.whome===userid.toString() && el.name===cookie.toString()),'messsss')
  if(writing.find(el=>el.whome===userid.toString() && el.name===cookie.toString())===undefined){
    addsPech({whome:userid.toString(),name:cookie.toString()})(dispatch)
  }
  }

  return(
    <View flex={1}>
     <ScrollView>
       <View>
         <View style={styles.block}>
         <TouchableOpacity activeOpacity={0.7} onPress={()=>toProfile(usersWithMe.find(el=>el.id.toString()===userid.toString()))}> 
         <View style={styles.block}>
         <Image style={styles.imageuser} source={{uri:usersWithMe.find(el=>el.id.toString()===userid.toString()).image}}/>  
         <View marginLeft={15}><Text style={styles.text}>Пользователь {usersWithMe.find(el=>el.id.toString()===userid.toString()).name}:</Text></View>
         </View>
         </TouchableOpacity> 
         </View>
         {allmessages.map(elem=>
          <ContentMess key={elem.id} data={elem} name={cookie.toString()} redirectMess={redirectMess} removeMess={removeMess} onePhoto={onePhoto}/>
          )}
          {images.map((elem)=><TouchableOpacity key={elem.id} activeOpacity={0.7} onPress={()=>setModal(true)}>
            <EditModal image={elem.image} visible={modal} onCancel={()=>setModal(false)}/>
            <Image style={styles.image} source={{uri:elem.image}}/>
            </TouchableOpacity> 
         )}
          {images.map((elem)=>
          <NewImageModal key={elem.id} id={elem.id} image={elem.image} delPicture={delPicture}/>
        )}
         {<ModalMes visible={modaldirect} onOpen={onOpen} onCancel={cancelModal}/>}
          {redirect.map(el=>
            <View backgroundColor="pink" key={el.id}>
              <Text>{usersWithMe.find(elem=>elem.id.toString()===el.name.toString()).name}</Text>
              <Text>{el.mess}</Text>
              {el.images.map(elem=>
            <Image key={elem.id} style={styles.imagemini} source={{uri:elem.image}}/>
              )}
            {/*el.sharepost.map(val=><View key={val.id}>
              <Text style={styles.text}>"Пост из галереи от {val.name}"</Text>
                <Image style={styles.imagemini} source={{uri:val.image}}/> 
            </View>)*/}
            {el.redirect.map(element=>
            <View key={element.id}>
              <Text style={styles.text}>{usersWithMe.find(elem=>elem.id.toString()===el.name.toString()).name}</Text>
              <Text>{element.mess}</Text>
              {element.images.map(img=>
            <Image key={img.id} style={styles.imagemini} source={{uri:img.image}}/>
              )}
              {/*element.sharepost.map(val=><View key={val.id}>
              <Text style={styles.text}>"Пост из галереи от {val.name}"</Text>
                <Image style={styles.imagemini} source={{uri:val.image}}/> 
              </View>)*/}
            </View>
              )}
            </View>
              )}
          {/*sharepost.map(val=><View key={val.id}>
              <Text style={styles.text}>"Пост из галереи от {val.name}"</Text>
                <Image style={styles.imagemini} source={{uri:val.image}}/> 
          </View>)*/}
          </View>
      </ScrollView>
      <View style={{position:'absolute',bottom:20, alignSelf:'center'}}>
      <View style={styles.block}>
          <TextInput placeholder="Введите сообщение....." width={270} value={mess} onChangeText={(text)=>pechatMess(text)}/>
          {writing.find(el=>el.whome===cookie.toString() && el.name===userid.toString())&&<Text>Печатает....</Text>}
          <Icon name='sc-telegram' type='evilicon' size={50} onPress={sendMes} color="black"/>
          <Icon name='camera' type='evilicon' size={50} onPress={takePhoto} color="black"/>
          </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    marginTop: 10
  },
  imagemini:{
    width: 70,
    height: 70
  },
  text:{
    fontFamily:'open-bold' 
   },
   block:{
     flexDirection:"row",
     alignItems:"center",
     marginBottom:15,
     padding:5
   },
   imageuser: {
    width: 30,
    height: 30,
    borderRadius:50,
    margin:5
  },
  block:{
    flexDirection:"row",
    alignItems:"center",
  //  backgroundColor:"#ffccdd",
    padding:5,
  }
})


MessageScreen.navigationOptions = ({ navigation }) => {
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
        Message
        </Text>
      );
    },
    }
  }

/*const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding:10,
    fontFamily:'open-regular'
  },
  text:{
    color:"black",
    fontFamily:'open-regular',
    fontSize: 24
  },
  center: {
    flex: 1,
    padding:10,
    alignItems:'center',
    fontFamily:'open-regular',
    justifyContent:'center'
  }
})*/
