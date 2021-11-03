/*import React,{ useEffect, useState } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {View, Text, StyleSheet,FlatList, ActivityIndicator, Button, TextInput, ScrollView, Alert, Linking, Platform, Image, Dimensions} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addCookie, addUsers, addView, loadComments, loadLogin, loadPosts, loadingUsers, loadViews, updateView } from '../store/actions/post'
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign} from '@expo/vector-icons';
import { DB } from '../db'*/
import React,{ useEffect, useState } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {View, Text, StyleSheet,FlatList, ActivityIndicator, Button, TextInput, ScrollView, Alert, Linking, Platform, Image, Dimensions} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addCookie, addUsers, addView, loadComments, loadLogin, loadPosts, loadingUsers, loadViews, updateView } from '../store/actions/post'
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign} from '@expo/vector-icons';
import { DB } from '../db'
import { CheckBox } from 'react-native-elements'

export const RegistScreen = ({navigation}) =>{

  const [login,setLogin] = useState('dashamilasha')
  const [password, setPassword] = useState('130695')
  const [name, setName] = useState('Даша')
  const [surname, setSurname] = useState('Милашина')
  const [city,setCity] = useState('Казань')
  const [country,setCountry] = useState('Россия')
  const [age,setAge] = useState('24')
  const [inst,setInst] = useState('dashamimilasha')
  const [fb,setFb] = useState('DASHA MILASHA')
  const [work,setWork] = useState('Програмист')
  const [motherlang,setMotherlang] = useState('Русский')
  const [about, setAbout] = useState('Я Даша. Окончила Казансикй Федеральный Университет. Хочу найти друзей.')
  const [activity,setActivity] = useState('Разработка')
  const [level,setLevel] = useState('A1')
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"]
  const [achives,setAchives] = useState([{achive:"Общение и знакомства", id:'1234'},{achive:"Образование", id:'6784'},{achive:"Саморазвитие", id:'7089'},{achive:"Практика русского языка", id:'09898'},{achive:"За компанию", id:'09756'}])
  const [takeach,setTakeach] = useState([])
  const [number,setNumber] = useState('+79278888716')
  const [email,setEmail] = useState('dariavladimirowna@gmail.com')
  const [checked,setChecked] = useState(false)
   const dispatch = useDispatch()
 


    

   const users= useSelector(state => state.post.users)


    const takeAchive =(el)=>{
    setAchives((prev)=>prev.filter(elem=>elem.achive!==el.achive))
    setTakeach(prev=>[...prev,el])
    }

    const removeAchive =(el)=>{
      setTakeach((prev)=>prev.filter(elem=>elem.achive!==el.achive))
      setAchives(prev=>[...prev,el])
    }

    const checkLogin =(log)=>{
      setLogin(log)
      users.forEach(el=>{
        if(el.login===log){
          Alert.alert(`Логин ${el.login} занят!`)
          return false
        }
      })
    }


    let time = new Date()
    time=time.toLocaleString()
    const dataSend= {login:login,password:password,name:name,surname:surname,country:country,city:city,
      age:age,instagram:inst,facebook:fb,work:work,activity:activity,about:about,motherlan:motherlang,
      level:level, myachives:takeach,time:time,image:"https://img1.freepng.ru/20180529/bxp/kisspng-user-profile-computer-icons-login-user-avatars-5b0d9430b12e35.6568935815276165607257.jpg",
      phone:number,email:email, friends:[], fullname:`${name} ${surname}`
    }
    
    const sendData =()=>{
      if(checked===false){
        Alert.alert('Вы не согласны на обработку данных!')
        return false
      }
     // console.log('aaaaa')
      if(users.find(el=>el.login===login)){
        Alert.alert(`Логин ${users.find(el=>el.login===login).login} занят!`)
        console.log('logggg')
       return false
      }
     if(login==='' || name==='' || password==='' || surname===''){
        Alert.alert('Заполните пустые поля!')
        console.log('puusto')
        return false
      }
   addUsers(dataSend)(dispatch)
  navigation.navigate('Main')
  }     



  

    return(
      <View style={styles.main}>
     {<ScrollView>
      <View marginBottom={25}> 
      <Text style={styles.text}>Регистрация</Text>
      </View>
      <View style={styles.input}> 
           <TextInput placeholder="Придумайте логин......." fontSize={15} value={login} onChangeText={(text)=>checkLogin(text)}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Придумайте пароль....." fontSize={15} value={password} onChangeText={setPassword}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Ваше имя....." fontSize={15} value={name} onChangeText={setName}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Ваша фамилия..." fontSize={15} value={surname} onChangeText={setSurname}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Ваша страна..." fontSize={15} value={country} onChangeText={setCountry}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Ваш город..." fontSize={15} value={city} onChangeText={setCity}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Ваш возраст..." fontSize={15} value={age} onChangeText={setAge}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Логин в intagram..." fontSize={15} value={inst} onChangeText={setInst}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Имя в Facebook..." fontSize={15} value={fb} onChangeText={setFb}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Кем работаете?" fontSize={15} value={work} onChangeText={setWork}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Род деятельности" fontSize={15} value={activity} onChangeText={setActivity}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Рассажите о себе..." multiline fontSize={15} value={about} onChangeText={setAbout}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Родной язык..." fontSize={15} value={motherlang} onChangeText={setMotherlang}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Эл. почта..." fontSize={15} value={email} onChangeText={setEmail}/>
            </View>
            <View style={styles.input} marginTop={10}>
            <TextInput placeholder="Номер телефона..." fontSize={15} value={number} onChangeText={setNumber}/>
            </View>
            <View marginTop={20}>
              <View marginBottom={10}>
              <Text style={styles.small}>Ваш уровень владения русским языком:</Text>
              </View>
              <SelectDropdown
	data={levels}
    renderCustomizedButtonChild={()=> {return(<View style={styles.block}>
      <View marginRight={40}>
        <Text>{level}</Text>
      </View>
      <AntDesign name="caretdown" size={20} color="black"/>
      </View>)}}
	onSelect={(selectedItem, index) => {
    setLevel(selectedItem)
	}}
	rowTextForSelection={(item, index) => {
		return <Text>{item}</Text>
	}}
/>
</View>
      <View marginVertical={20}>
            <Text style={styles.small}>Цели изучения русского языка:</Text>
            <Text style={styles.small}>Выберите цели:</Text>
           <View style={styles.row} marginTop={20}>
             {achives.map((el,index)=><View key={index} paddingVertical={3} paddingHorizontal={5}><Button color='green' title={el.achive} onPress={()=>takeAchive(el)}/></View>)}
           </View>
           <Text style={styles.small}>Ваши цели:</Text>
           <View style={styles.row}>
             {takeach.map((el,index)=><View key={index} paddingVertical={3} paddingHorizontal={5}><Button key={index} color='hotpink' title={el.achive} onPress={()=>removeAchive(el)}/></View>)}
           </View>
            </View>
            <View style={styles.block1}>
            <CheckBox
              title={<Text style={styles.text}>Я согласен на обработку персональных данных и ознакомился с политикой конфиденциальности сервиса.</Text>}
              checked={checked}
              onPress={()=>setChecked(!checked)}
            />
            </View>
          <Button title='Зарегистрироваться' color='black' padding={-10} onPress={()=>sendData()}/>
</ScrollView>}
      </View>
    )
}

RegistScreen.navigationOptions = ({ navigation }) => {

 return { headerTitle: () => 
    <Text
    style={{
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20
    }}
  >
    Главная
  </Text>
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
  row:{
    flexWrap:"wrap",
    alignContent:'flex-start',
     width:'100%',
    flexDirection:'row',
    //paddingLeft:8
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
   //justifyContent:'center'
  },
})