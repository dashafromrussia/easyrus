import React,{useEffect,useState} from 'react'
import {View, Text, StyleSheet, Dimensions, ActivityIndicator, FlatList, ScrollView, Image, TouchableOpacity, Button, Alert, TouchableNativeFeedback, TextInput} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useDispatch, useSelector } from 'react-redux'
import { addsComments, deleteArticle, deletesComments, updatesLikes } from '../store/actions/post'
import {AntDesign} from '@expo/vector-icons'


export const OneArticle = ({navigation}) =>{
  const [text,setText] = useState('')
  const [whom,setWhom] = useState('')
  const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
  const id =navigation.getParam('id') 
  const dispatch = useDispatch()
  const cookie= useSelector(state => state.post.cookie)
  const users= useSelector(state => state.post.users)
  const comments= useSelector(state => state.post.comments)
  const article = useSelector(state => state.post.articles).find(el=>el.id.toString()===id.toString())
  const likes = article.likes
//{author:cookie.toString(), header:header,twoheader:twoheader,text:text,images:picture,category:checked,time:time,views:0,likes:[]}
const delArticle =()=>{
    deleteArticle({id:article.id})(dispatch)
    navigation.navigate('Quote')
}

const updateYourLike =()=>{
if(likes.find(el=>el.id.toString()===cookie.toString())){
    updatesLikes({id:article.id, likes:likes.filter(el=>el.id.toString()!==cookie.toString())})(dispatch)
}else{
    updatesLikes({id:article.id, likes:[...likes,{id:cookie.toString()}]})(dispatch)
}
console.log(likes)
}

//idpost STRING, who STRING, whom STRING, new STRING, comment STRING, time STRING

const addComment =()=>{
    let time = new Date()
 addsComments({idpost:article.id.toString(), who:cookie.toString(), whom:whom, comment:text, time:time.toLocaleString(), new:'yes'})(dispatch)
 console.log({idpost:article.id.toString(), who:cookie.toString(), whom:whom, comment:text, time:time.toLocaleString(), new:'yes'})
setText('')
setWhom('')
}

const answerToComment =(id)=>{
setWhom(id.toString())
setText(`${users.find(el=>el.id.toString()===id.toString()).name},`)
}

const toProfile =(elem)=>{
  if(cookie.toString()===elem.id.toString()){
    navigation.navigate('Main')
  }else{
     navigation.navigate('Profil',{data:elem})
  }
}



if(!article){
    return <View></View>
}

    return(
      <ScrollView>
      <View style={styles.main}>
        <View paddingBottom={10}><Text style={styles.header}>{article.header}</Text></View>
        <Text style={styles.text}>{article.twoheader}</Text>
        <View flexDirection='row' alignItems='center' paddingBottom={15}>
          <View>
            <View paddingVertical={10}><Text style={styles.text}>Time:{article.time}</Text></View>
            <View flexDirection='row'>
            <View paddingRight={20}><Text style={styles.text}>Views:{article.views}</Text></View>
            <View padding={3} backgroundColor='black'><Text style={styles.cat}>{article.category}</Text></View>
            </View>
            </View>
              <View paddingLeft={50}>
            <Wrapper onPress={updateYourLike}>
              <AntDesign name={likes.find(el=>el.id.toString()===cookie.toString()) ? 'heart':'hearto'} size={28} color="black"/>
         </Wrapper>  
                <Text style={styles.text}>likes:{article.likes.length}</Text>
                </View>  
        </View>
        {article.images.length!==0 ? article.images.map(el=><Image style={styles.image} key={el.id} source={{uri:el.image}}/>):null}
        <View paddingVertical={10}><Text style={styles.text}>{article.text}</Text></View>
        <TouchableOpacity onPress={()=>toProfile(users.find(el=>el.id.toString()===article.author.toString()))}>
        <Text style={styles.text}>Автор статьи:  {users.find(el=>el.id.toString()===article.author.toString()).name}</Text>
        </TouchableOpacity>
        {cookie.toString()===article.author.toString() ? <View paddingVertical={10}><Button title='удалить статью' color='black' onPress={()=>delArticle()}/></View>:null}
        <View>
        <View paddingVertical={10}>  
        <TextInput placeholder="Введите комментарий..." fontSize={17} value={text} onChangeText={setText}/>
        </View>
        <Button title='Отправить' color='pink' onPress={()=>addComment()}/> 
        <Text style={styles.header}>Комментарии:</Text>
        {comments.filter(f=>f.idpost.toString()===article.id.toString()).map(el=><TouchableOpacity key={el.id} onPress={()=>answerToComment(el.who)} onLongPress={()=>deletesComments({id:el.id})(dispatch)}>
        <View backgroundColor='pink'>
            <Text>{el.time}</Text>
            <Text style={styles.text}>{users.find(elem=>elem.id.toString()===el.who.toString()).name}</Text>
            <Text style={styles.text}>{el.comment}</Text>
        </View>
        </TouchableOpacity>)}
        </View>
      </View>
      </ScrollView>
    )
} 

OneArticle.navigationOptions = ({ navigation }) => {
    const id =navigation.getParam('id') 
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
         Пост № {id}
        </Text>
      );
    },
  
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
    image:{
        width:200,
        height:200
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
    cat:{
      color:"white",
      fontFamily:'open-regular',
      fontSize: 12
    },
  })

