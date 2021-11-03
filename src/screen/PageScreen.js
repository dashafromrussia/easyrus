import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions, TextInput, Alert, Button} from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { addsComment, deleteCategoryComment, deleteComment, deletePost } from '../store/actions/post'


export const PageScreen = ({navigation}) =>{
 
}

PageScreen.navigationOptions = ({ navigation }) => {

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
               {data.category}
              </Text>
            );
          },
}
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding:10,
    fontFamily:'open-regular'
  },
  block:{
    flexDirection:"row",
    alignItems:"center",
    marginVertical:20
  },
  title:{
    color:"grey",
    fontFamily:'open-regular',
    fontSize: 20
},
  image:{
    width:3*Dimensions.get('window').width/2,
    height:3*Dimensions.get('window').height/2,
  },
  views:{
    color:"grey",
    fontFamily:'open-regular',
    fontSize: 10
},
})
