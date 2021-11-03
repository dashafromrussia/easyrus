import React, {useState} from 'react';
import { StyleSheet, Image, View,Text, Modal, Button} from 'react-native';



export const ModalImage = ({visible,image,onCancel}) =>{
   

    
  
      return(
        <Modal visible={visible} animationType="slide"> 
        <View style={styles.main}>
           <View paddingHorizintal={10}> 
            <Image style={styles.imagef} source={{uri:image}}/>
            </View>
         <View marginTop={20}> 
          <Button title="<< на главную" color='black' onPress={()=>onCancel()}/>
          </View>
        </View>
        </Modal>
      )
}

const styles = StyleSheet.create({
    main: {
      flex: 1,
      fontFamily:'open-regular',
       alignItems:'center',
       justifyContent:'center'
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
      width: 400,
      height: 300,
    },
  })
  