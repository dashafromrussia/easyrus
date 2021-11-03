import React,{useState,useEffect} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, FlatList, TextInput, Image, Button} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { RadioButton } from 'react-native-paper';
import { addArticle } from '../store/actions/post'
import { ScrollView } from 'react-native-gesture-handler'

export const CreateArticleScreen = ({navigation}) =>{
  
  //const posts= useSelector(state => state.post.posts)
  const [picture,setPicture] = useState([]) 
  const [visible,setVisible] = useState(true)
  const [header,setHeader] = useState('') 
  const [twoheader,setTwoheader] = useState('') 
  const [text,setText] = useState('') 
  const [checked,setChecked] = useState('other')
  const cookie= useSelector(state => state.post.cookie)
  const dispatch = useDispatch()
/*const navToPage =(data,content)=>{
  navigation.navigate('Page',{data:data,content:content})
}*/
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
        setPicture(prev=>[...prev,{id:Date.now().toString(),image:img['uri']}]);
      }
      setVisible(false)
      // console.log(img,'img')
     //  console.log('state', picture)
    }
   // const info ={author:cookie.toString(), header:header,twoheader:twoheader,text:text,images:picture,category:checked,time:time,views:0,likes:[]}
  
    const sendData =()=>{
        let time = new Date()
        const info ={author:cookie.toString(), header:header,twoheader:twoheader,text:text,images:picture,category:checked,time: time.toLocaleString(), views:0,likes:[]}
        addArticle({author:cookie.toString(), header:header,twoheader:twoheader,text:text,images:picture,category:checked,time:time.toLocaleString(),views:0,likes:[]})(dispatch)
        console.log(info)
        navigation.navigate('Quote')
    }


  return(
   <ScrollView>
    <View style={styles.main}>
    <Text style={styles.text}>Создать статью</Text>
    <View paddingHorizontal={10} paddingVertical={15}>
    <View style={styles.input}> 
           <TextInput placeholder="Придумайте заголовок......." fontSize={15} value={header} onChangeText={setHeader}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Придумайте подзаголовок...." fontSize={15} value={twoheader} onChangeText={setTwoheader}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Введите текст статьи...." fontSize={15} value={text} onChangeText={setText} multiline/>
            </View>
            </View>
            {visible&&<View paddingHorizontal={10} paddingVertical={10}><Button title="Добавить картинку" color='blue' onPress={takePhoto}/></View>}
            {picture.length!==0 ? picture.map(el=><Image style={styles.image} key={el.id} source={{uri:el.image}}/>):null}
            <Text style={styles.text}>Выберите категорию статьи:</Text>
            <View style={styles.block}> 
              <Text  style={styles.text}>Интересные факты</Text> 
              <RadioButton
                value="interest"
                status={ checked === 'interest' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('interest')}
              />
              </View>
              <View style={styles.block}> 
              <Text style={styles.text}>Разное</Text> 
              <RadioButton
                value="other"
                status={ checked === 'other' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('other')}
              />
              </View>
            <View style={styles.block}> 
             <Text style={styles.text}>Лайфкахи</Text> 
             <RadioButton
                value="lifehack"
                status={ checked === 'lifehack' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('lifehack')}
              />
              </View> 
              <View style={styles.block}> 
             <Text style={styles.text}>Полезный календарь</Text> 
             <RadioButton
                value="calendar"
                status={ checked === 'calendar' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('calendar')}
              />
              </View>
              <View padding={10}><Button title='Отправить данные' color='black' onPress={sendData}/></View>
    </View>
    </ScrollView> 
  )
}

CreateArticleScreen.navigationOptions = ({ navigation }) => {
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
          Создать статью
        </Text>
      );
    },
    }
  }

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding:10
  },
  block:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    padding:5
  },
  text:{
    color:"grey",
    fontFamily:'open-regular',
    fontSize: 17,
  },
  center: {
    flex: 1,
    padding:10,
    alignItems:'center',
    fontFamily:'open-regular',
    justifyContent:'center'
  },
  input:{
    alignItems:"center",
    justifyContent:"center",
    borderRadius:2,
    borderColor:'grey',
    borderWidth:0.5,
    padding:5
  },
  image:{
      width:200,
      height:200
  }
})
