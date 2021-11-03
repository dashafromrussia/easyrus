import * as Font from 'expo-font'
import { DB } from './db'

export async function bootstrap() {
  try {
    await Font.loadAsync({
      'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-regular': require('../assets/fonts/OpenSans-Regular.ttf')
    })
    await DB.initusers()
    console.log('Database users started...')

    await DB.initrequestfriend()
    console.log('requestfriend started')

    await DB.initstatus()
    console.log('status started...')

    await DB.initcontacts()
    console.log('contacts started...')

    await DB.initblocks() 
    console.log('blocks started...')

    await DB.initmess()
    console.log('mess load')

    await DB.initpech()
    console.log('pech started')

    await DB.initArticle()
    console.log('article started')

    await DB.initcomments()
    console.log('load comments....')
    
  } catch (e) {
    console.log('Error: ', e)
  }
}