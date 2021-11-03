import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'
import { useSelector } from 'react-redux'

export const ArticleScreen = ({navigation}) =>{
   
  const posts= useSelector(state => state.post.posts)
  let videos =[]
  if(posts.length!==0){
 videos = posts.filter(el=>el.category==='video')
  }
  const loading = useSelector(state => state.post.loading)



const navToPage =(data,content)=>{
  navigation.navigate('Page',{data:data,content:content})
}

if(loading){
  return(
    <View style={styles.main}>
     <ActivityIndicator color="black"/>
    </View>
  )
}

if(posts.length==0){
  <Text style={styles.text}>Пока нет учебников...</Text> 
}

  return(
    <View style={styles.main}>
    <Text style={styles.text}>Категория: Статьи</Text>  
    {videos.length!=0 ? <FlatList data={videos} keyExtractor={elem => elem.id.toString()}
    renderItem={({item})=>{
        return(
            <PostList data={item} openPost={navToPage}/>
        )
    }}
  />:<View style={styles.center}><Text>Видео нет...</Text></View>}
  
    </View>
  )
}
ArticleScreen.navigationOptions = ({ navigation }) => {
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
        </HeaderButtons>
    }
  }

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding:10
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
})
