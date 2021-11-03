import React,{useState,useEffect} from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {View, Text, StyleSheet,FlatList, ActivityIndicator, Button, TextInput, ScrollView, Alert, Linking, Platform, Image, Dimensions} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { updateInfo } from '../store/actions/post'
import { RadioButton } from 'react-native-paper';

export const UpdateScreen = ({navigation}) =>{
  let allach = [{achive:"Общение и знакомства", id:'1234'},{achive:"Образование", id:'6784'},{achive:"Саморазвитие", id:'7089'},{achive:"Практика русского языка", id:'09898'},{achive:"За компанию", id:'09756'}]
  const data = navigation.getParam('data')  
  const users= useSelector(state => state.post.users)
  data.myachives.forEach(el=>{
  allach = allach.filter(elem=>elem.achive==el.achive)   
              })
              
    const dispatch = useDispatch()
    const [login,setLogin] = useState(data.login)
    const [password, setPassword] = useState(data.password)
    const [name, setName] = useState(data.name)
    const [surname, setSurname] = useState(data.surname)
    const [city,setCity] = useState(data.city)
    const [country,setCountry] = useState(data.country)
    const [age,setAge] = useState(data.age)
    const [inst,setInst] = useState(data.instagram)
    const [fb,setFb] = useState(data.facebook)
    const [work,setWork] = useState(data.work)
    const [motherlang,setMotherlang] = useState(data.motherlan)
    const [about, setAbout] = useState(data.about)
    const [activity,setActivity] = useState(data.activity)
    const [level,setLevel] = useState(data.level)
    const [image,setImage] = useState(data.image)
    const levels = ["A1", "A2", "B1", "B2", "C1", "C2"]
    const [achives,setAchives] = useState([{achive:"Общение и знакомства", id:'1234'},{achive:"Образование", id:'6784'},{achive:"Саморазвитие", id:'7089'},{achive:"Практика русского языка", id:'09898'},{achive:"За компанию", id:'09756'}])
    const [takeach,setTakeach] = useState(data.myachives)
    const [visible,setVisible] = useState(true)
    

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
          setPicture(img['uri']);
        }
        setVisible(false)
      }


      const takeAchive =(el)=>{
        setAchives((prev)=>prev.filter(elem=>elem.achive!==el.achive))
        setTakeach(prev=>[...prev,el])
        }
    
        const removeAchive =(el)=>{
          setTakeach((prev)=>prev.filter(elem=>elem.achive!==el.achive))
          setAchives(prev=>[...prev,el])
        }
    
        const updateData =async()=>{
          const dataSend= {login:login,password:password,name:name,surname:surname,country:country,city:city,
            age:age,instagram:inst,facebook:fb,work:work,activity:activity,about:about,motherlan:motherlang,
            level:level, myachives:takeach,time:data.time,image:image,fullname:`${name} ${surname}`
          }
          await updateInfo({id:data.id,data:dataSend})(dispatch)
          navigation.navigate('Main')
        }

        const checkLogin =(log)=>{
          setLogin(log)
          users.forEach(el=>{
            if(el.login===log && log!==data.login){
              Alert.alert(`Логин ${el.login} занят!`)
              return false
            }
          })
        }
    

  
  return(
    <View style={styles.main}>
    {<ScrollView>
     <View marginBottom={25}> 
     <Text style={styles.small}>Редактировать данные</Text>
     </View>
     <View style={styles.input}> 
          <TextInput placeholder="Придумайте логин...." style={styles.text} value={login} onChangeText={checkLogin}/>
           </View>
           <View style={styles.input} marginTop={10}>
           <TextInput placeholder="Придумайте пароль....." style={styles.text} value={password.toString()} onChangeText={setPassword}/>
           </View>
           <View style={styles.input} marginTop={10}>
           <TextInput placeholder="Ваше имя....." style={styles.text} value={name} onChangeText={setName}/>
           </View>
           <View style={styles.input} marginTop={10}>
           <TextInput placeholder="Ваша фамилия..." style={styles.text} value={surname} onChangeText={setSurname}/>
           </View>
           <View style={styles.input} marginTop={10}>
           <TextInput placeholder="Ваша страна..." style={styles.text} value={country} onChangeText={setCountry}/>
           </View>
           <View style={styles.input} marginTop={10}>
           <TextInput placeholder="Ваш город..." style={styles.text} value={city} onChangeText={setCity}/>
           </View>
           <View style={styles.input} marginTop={10}>
           <TextInput placeholder="Ваш возраст..." style={styles.text} value={age.toString()} onChangeText={setAge}/>
           </View>
           <View style={styles.input} marginTop={10}>
           <TextInput placeholder="Логин в intagram..." style={styles.text} value={inst} onChangeText={setInst}/>
           </View>
           <View style={styles.input} marginTop={10}>
           <TextInput placeholder="Имя в Facebook..." style={styles.text} value={fb} onChangeText={setFb}/>
           </View>
           <View style={styles.input} marginTop={10}>
           <TextInput placeholder="Кем работаете?" style={styles.text} value={work} onChangeText={setWork}/>
           </View>
           <View style={styles.input} marginTop={10}>
           <TextInput placeholder="Род деятельности" style={styles.text} value={activity} onChangeText={setActivity}/>
           </View>
           <View style={styles.input} marginTop={10}>
           <TextInput placeholder="Рассажите о себе..." multiline style={styles.text} value={about} onChangeText={setAbout}/>
           </View>
           <View style={styles.input} marginTop={10}>
           <TextInput placeholder="Родной язык..." style={styles.text} value={motherlang} onChangeText={setMotherlang}/>
           </View>
     <View marginVertical={20}>
           <Text style={styles.small}>Цели изучения русского языка:</Text>
           <View style={styles.row} marginTop={20}>
            {allach.map((el,index)=><View key={index} paddingVertical={3} paddingHorizontal={5}><Button color='green' title={el.achive} onPress={()=>removeAchive(el)}/></View>)}
          </View>
           <Text style={styles.small}>Выберите цели:</Text>
          <View style={styles.row} marginTop={20}>
            {achives.map((el,index)=><View key={index} paddingVertical={3} paddingHorizontal={5}><Button color='green' title={el.achive} onPress={()=>takeAchive(el)}/></View>)}
          </View>
          <Text style={styles.small}>Ваши цели:</Text>
          <View style={styles.row}>
            {takeach.map((el,index)=><View key={index} paddingVertical={3} paddingHorizontal={5}><Button key={index} color='hotpink' title={el.achive} onPress={()=>removeAchive(el)}/></View>)}
          </View>
           </View>
           <View style={styles.rowimage}>
           <View>
           {visible&&<View paddingBottom={10}><Button title="Добавить фото" color="black" onPress={takePhoto}/></View>}
           <Button title='Удалить фото' color="black" onPress={()=>setImage("https://img1.freepng.ru/20180529/bxp/kisspng-user-profile-computer-icons-login-user-avatars-5b0d9430b12e35.6568935815276165607257.jpg")}/>
           </View>
           {image&&<Image style={styles.image} source={{uri:image}}/>}
           </View>
           <View marginTop={20}>
             <Text style={styles.text} >Уровень владения русским языком</Text>
             <View style={styles.radio}>
              <Text style={styles.text}>A1</Text>  
              <RadioButton
                value="A1"
                status={ level=== 'A1' ? 'checked' : 'unchecked' }
                onPress={() => setLevel('A1')}
               />
               </View>
               <View style={styles.radio}> 
              <Text style={styles.text}>A2</Text> 
              <RadioButton
                value="A2"
                status={ level === 'A2' ? 'checked' : 'unchecked' }
                onPress={() => setLevel('A2')}
              />
             </View>
             <View style={styles.radio}> 
              <Text style={styles.text}>B2</Text> 
              <RadioButton
                value="B1"
                status={ level === 'B1' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('B1')}
              />
              </View>
              <View style={styles.radio}> 
              <Text style={styles.text}>B2</Text> 
              <RadioButton
                value="B2"
                status={ level === 'B2' ? 'checked' : 'unchecked' }
                onPress={() => setLevel('B2')}
              />
              </View>
            <View style={styles.radio}> 
             <Text style={styles.text}>C1</Text> 
             <RadioButton
                value="C1"
                status={ level === 'C1' ? 'checked' : 'unchecked' }
                onPress={() => setLevel('C1')}
              />
              </View>
              <View style={styles.radio}> 
             <Text style={styles.text}>C2</Text> 
             <RadioButton
                value="C2"
                status={ level === 'C2' ? 'checked' : 'unchecked' }
                onPress={() => setLevel('C2')}
              />
              </View>
              </View>
    </ScrollView>}
    <Button title='Обновить' color='black' /*padding={-10}*/ onPress={()=>updateData()}/>
     </View>
  )
}

UpdateScreen.navigationOptions = ({ navigation }) => {
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
        Редактировать
        </Text>
      );
    }
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
         width:'100%',
        flexDirection:'row',
        paddingLeft:6
      },
      rowimage:{
        flexWrap:"wrap",
         width:'100%',
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center",
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
      radio:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding:5
      }
})
