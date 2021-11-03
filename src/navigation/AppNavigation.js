import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { BooksScreen } from '../screen/BooksScreen'
import { GroupScreen } from '../screen/GroupScreen'
import { ChatScreen } from '../screen/ChatScreen'
import { TranslateScreen } from '../screen/TranslateScreen'
import { MainScreen } from '../screen/MainScreen'
import { AdminScreen } from '../screen/AdminScreen'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { View, SafeAreaView,ScrollView } from 'react-native'
import { PageScreen } from '../screen/PageScreen'
import { ArticleScreen } from '../screen/ArticleScreen'
import { UpdateScreen } from '../screen/UpdateScreen'
import { RegistScreen } from '../screen/RegistScreen'
import { EntryScreen } from '../screen/EntryScreen'
import { ProfilScreen } from '../screen/ProfilScreen'
import { FriendScreen } from '../screen/FriendScreen'
import { BadgeComponent } from '../components/BadgeComponent'
import { MessageScreen } from '../screen/MessageScreen'
import { BlockScreen } from '../screen/BlockScreen'
import { BadgeMess } from '../components/BadgeMess'
import { CreateArticleScreen } from '../screen/CreateArticleScreen'
import { ArticleList } from '../screen/ArticleList'
import { OneArticle } from '../screen/OneArticle'
import { FirebaseScreen } from '../screen/FirebaseScreen'

const navigationOptions ={
  headerStyle: {
    backgroundColor: 'black'
  },
  headerTintColor:'#fff'
}


const MainStackNavigator = createStackNavigator(
  {
    Main: {screen: MainScreen,
    navigationOptions:navigationOptions
    },    
    Block: {screen: BlockScreen,
      navigationOptions:navigationOptions
      },
   Update:{
     screen: UpdateScreen,
     navigationOptions:navigationOptions
   },
   Regist:{
     screen: RegistScreen,
     navigationOptions:navigationOptions
   },
   Entry:{
     screen:EntryScreen,
     navigationOptions:navigationOptions
   },

  },
  {
}
)

const BooksStackNavigator = createStackNavigator(
  {
    Books: {screen:BooksScreen,
      navigationOptions:navigationOptions},
  },
  {
  
  }
)
/*const TranslateStackNavigator = createStackNavigator(
  {
    Translate: {screen:TranslateScreen,
      navigationOptions:navigationOptions},
  },
  {
  
  }
)*/


const GroupStackNavigator = createStackNavigator(
  {
    Group: {screen:GroupScreen,
      navigationOptions:navigationOptions},
    Profil:{
      screen: ProfilScreen,
      navigationOptions:navigationOptions
    },
    Message:{
      screen: MessageScreen,
      navigationOptions:navigationOptions
    } 
  },
  {

  }
)

const ChatsStackNavigator = createStackNavigator(
  {
    Chat: {screen:ChatScreen,
      navigationOptions:navigationOptions},
      Message:{
        screen: MessageScreen,
        navigationOptions:navigationOptions
    } 
  },
  
  {
    
  }
)

const ArticlesStackNavigator = createStackNavigator(
  {
    Quote: {screen:ArticleList,
      navigationOptions:navigationOptions},
    Oneart:{
        screen: OneArticle,
        navigationOptions:navigationOptions
      },
      Addart:{
        screen: CreateArticleScreen,
        navigationOptions:navigationOptions
      }
  },
  
  {
    
  }
)


const FriendStackNavigator = createStackNavigator(
  {
    Friend: {screen:FriendScreen,
      navigationOptions:navigationOptions},
  },
  {
    
  }
)

const MainNavigator = createDrawerNavigator(
  {
    Mains: {
      screen: MainStackNavigator,
      navigationOptions: {
        drawerLabel: 'Главная',
      },
    },
    Book: {
      screen: BooksStackNavigator,
      navigationOptions: {
        drawerLabel: 'Учебники'
      }
    },
    /*Trans:{
      screen: TranslateStackNavigator,
      navigationOptions: {
        drawerLabel: 'Переводчик'
      }
    },*/
    Groups:{
      screen:GroupStackNavigator,
      navigationOptions: {
        drawerLabel: 'Сообщества'
      }
    },
  Chats:{
    screen:ChatsStackNavigator,
    navigationOptions: {
      drawerLabel: <BadgeMess/>
    } 
  },
  Articles:{
    screen:ArticlesStackNavigator,
    navigationOptions: {
      drawerLabel: 'Статьи'
    } 
  },
 Friends:{
   screen:FriendStackNavigator,
   navigationOptions: {
    drawerLabel: <BadgeComponent/>
  } 
 },
/* Fire:{ //для смс но на чистом рн
  screen:FirebaseScreen,
  navigationOptions: {
    drawerLabel: 'fire'
 } 
 }*/
},
  {
    contentComponent: props => <CustomDrawer {...props}/>
  }
)

const CustomDrawer = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 150, backgroundColor: 'white' }}>
      </View>
      <ScrollView>
          <DrawerItems {...props} activeTintColor='black' inactiveTintColor='black'>
          </DrawerItems>
      </ScrollView>
  </SafeAreaView>
)


export const AppNavigation = createAppContainer(MainNavigator)

