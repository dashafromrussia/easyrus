import React,{useEffect, useState} from 'react'
import {View, Text, StyleSheet, Dimensions, ActivityIndicator, FlatList, ScrollView, Image, TouchableOpacity, Button, Alert} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useDispatch, useSelector } from 'react-redux'
import { updatesViews } from '../store/actions/post'



export const ArticleList = ({navigation}) =>{
  const [type,setType] = useState('all')
  const articles= useSelector(state => state.post.articles)
  const dispatch = useDispatch()
  const cookie= useSelector(state => state.post.cookie)

  const toOne =(el)=>{
    if(el.author.toString()!==cookie.toString()){
    updatesViews({id:el.id,views:Number(el.views)+1})(dispatch)
    }
    navigation.navigate('Oneart',{id:el.id})
  }

 /* const filt =(elem)=>{
    if(type==='all'){
      return elem
    }else{
      return elem.category===type
    }
  }*/

 //if(type==='all'){
    return(
      <>
   <ScrollView>
      <View style={styles.main}>
        {/*<Button title='data' onPress={()=>console.log(articles)}/>*/}
        <View width={200}  paddingVertical={15}>
        <View flexDirection='row'>
      <View style={styles.buttons}>
      <Button title='Все статьи' color='orange' onPress={()=>setType('all')}/> 
      </View>
      <View style={styles.buttons}>  
      <Button title='Интересные факты' color='green' onPress={()=>setType('interest')}/>
      </View>
      <View style={styles.buttons}>
      <Button title='Разное' color='red' onPress={()=>setType('other')}/>
      </View>
      </View>
      <View flexDirection='row' marginTop={10}>
      <View style={styles.buttons}>
      <Button title='Лайфкаки' onPress={()=>setType('lifehack')}/>
      </View>
      <View style={styles.buttons}>
      <Button title='Полезный календарь' color='blue' onPress={()=>setType('calendar')}/>
      </View>
     </View>
      </View>
          <View /*marginTop={type==='all'? -60 : 20}*/>{type==='all' ? articles.map(el=><TouchableOpacity key={el.id.toString()} onPress={()=>toOne(el)}><View /*paddingVertical={10}*/>
          {el.images.length!==0 ? el.images.map(elem=><View key={elem.id}><Image style={styles.image} source={{uri:elem.image}}/>
          <View style={{ position: 'absolute', left: 40, bottom: 0, backgroundColor: 'blue', borderRadius: 9, padding:5, /*width: 14, height: 14,*/ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}>{el.category}</Text>
            </View>
          </View>):null}
              <View justifyContent='center'paddingVertical={10} paddingHorizontal={30}><Text style={styles.header}>{el.header}</Text></View>
              <View style={styles.str}><Text style={styles.header}>Time:{el.time}</Text></View>
              <View flexDirection='row'>
              <View style={styles.str}><Text style={styles.header}>Views:{el.views}</Text></View>
              <View style={styles.str}><Text style={styles.header}>Likes:{el.likes.length}</Text></View>
              </View>
          </View>
          </TouchableOpacity>):articles.filter(elem=>elem.category===type).map(el=><TouchableOpacity key={el.id.toString()} onPress={()=>toOne(el)}><View padding={10}>
            <Text style={styles.header}>{el.header}</Text>
        </View>
    </TouchableOpacity>)}</View>
    {/*articles.filter(filt).map(el=><TouchableOpacity key={el.id.toString()} onPress={()=>toOne(el)}><View padding={10}>
            <Text style={styles.header}>{el.header}</Text>
        </View>
  </TouchableOpacity>)*/}
      </View>
      </ScrollView>
    </>
  )

}



ArticleList.navigationOptions = ({ navigation }) => {
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
          Статьи
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
        </HeaderButtons>,
       headerRight:()=>
             <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
               <Item
                 title='add'
                 iconName='ios-add'
                 color='white'
                 onPress={() => navigation.navigate('Addart')}
               />
             </HeaderButtons>, 
    }
  }
  const styles = StyleSheet.create({
    main: {
    //  flex: 1,
   //  padding:20,
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
      width: Dimensions.get('window').width*0.9,
      height: 170,
      margin: 15,
      borderRadius:30
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
    buttons:{
      paddingHorizontal:5
    },
    text:{
     color:'white',
     fontSize:15 
    },
    str:{
      paddingLeft:20
    }
  })

  