import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, Dimensions, Button} from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe';

export const PostList= ({openPost, data}) =>{
const[content,setContent] = useState(<></>)

useEffect(()=>{
  if(data.category==='video'){
    setContent(
     <View marginBottom={-50}>
       <View paddingVertical={10}>
       <Text style={styles.title}>{data.data[0].describe}</Text>
       </View>
       <YoutubePlayer
         height={300}
         play={true}
         videoId={data.data[0].video.substring(data.data[0].video.length-11,data.data[0].video.length)}
       />
     </View>
    )
  }else if(data.category==='picture'){
    setContent(
     <View marginVertical={10}>
      <View marginBottom={12}>
       <Text style={styles.title}>Мемасик от Смайлер</Text>
      </View>
      <View style={styles.center}>
        <Image style={styles.image} source={{uri:data.data[0].describe}}/>
      </View>
    </View> 
    )
  }else if(data.category==='joke'){
    setContent(<View marginVertical={10}>
      <Text style={styles.title}>Анекдот от Смайлер</Text>
      <View style={styles.center}>
         <Text>{data.data[0].describe}</Text>
      </View>
    </View>)
  }else if(data.category==='status'){
    setContent(<View marginVertical={10}>
      <Text style={styles.title}>Статус от Смайлер</Text>
      <View style={styles.center}>
         <Text>{data.data[0].describe}</Text>
      </View>
    </View>)
  }else if(data.category==='quote'){
    setContent(<View marginVertical={10}>
      <Text style={styles.title}>Цитата от Смайлер</Text>
      <View style={styles.center}>
         <Text>{data.data[0].describe}</Text>
      </View>
    </View>)
  }
},[])


  return(
   <View>{content}
   <Button title="Перейти к комментариям >>>>>" color="red" onPress={()=>openPost(data,content)}/>
   </View>
  
  )
}

const styles = StyleSheet.create({
    
    title:{
        color:"grey",
        fontFamily:'open-regular',
        fontSize: 20
    },
      image:{
        width:300,
        height:400
      },
      center: {
        flex: 1,
        padding:10,
        alignItems:'center',
        fontFamily:'open-regular',
        justifyContent:'center'
      }
})