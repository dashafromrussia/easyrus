/*import React,{useEffect} from 'react'
import {Text, FlatList, Dimensions,ActivityIndicator} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useSelector } from 'react-redux'
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import {
  I18nManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from "react-native";

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("../translations/en.json"),
};
 
const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);
 
const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false };
 
  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;
 
  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

export const TranslateScreen = ({navigation}) =>{
  setI18nConfig();


  useEffect(()=>{
    RNLocalize.addEventListener("change", handleLocalizationChange);
  },[])

  
useEffect(()=>{
  RNLocalize.removeEventListener("change", this.handleLocalizationChange);
})

handleLocalizationChange = () => {
  setI18nConfig();
  forceUpdate();
};

  
    return(
      <View style={styles.main}>
    <Text>{translate("hello")}</Text>
      </View>
    )   
}
TranslateScreen.navigationOptions = ({ navigation }) => {
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
          Переводчик
        </Text>
      );
    },
      headerLeft: ()=>
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
})
*/