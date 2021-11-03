import {ADD_COMMENT, ADD_CONTACTS, ADD_COOKIE, ADD_FRIEND, ADD_POST, ADD_STASUSES, ADD_USERS, ADD_VIEW, DELCATEGORY_COMMENT, DELETE_COMMENT, DELETE_CONTACTS, DELETE_POST, DELETE_REQUEST, DELETE_STATUS, LOAD_COMMENTS, LOAD_CONTACTS, LOAD_LOGIN, LOAD_POSTS, LOAD_REQUEST, LOAD_STASUSES, LOAD_USERS, LOAD_VIEW, LOAD_VIEWS, REQUEST_FRIEND, UPDATE_CONTACTS, UPDATE_DATA, UPDATE_FRIEND, UPDATE_STATUS, UPDATE_VIEW, ADD_MESSAGE, LOAD_MESSAGE, REMOVE_MESSAGE, READ_MESSAGE, LOAD_BLOCKS, ADD_BLOCKS, UPDATE_BLOCK, REMBLOCK_MESSAGE, LOAD_PECHAT, ADD_PECHAT, DELETE_PECHAT, LOAD_ARTICLE, ADD_ARTICLE, DELETE_ARTICLE, UPDATE_VIEWS, UPDATE_LIKES, REMOVE_COMMENT,} from '../types'

const initialState = {
  users:[],
  cookie:'',
  loading: true,
  requestfriend:[],
  statuses:[],
  contacts:[],
  messages:[],
  blocks:[],
  writing:[],
  articles:[],
  comments:[],
  chats:[{who:'Misha',whom:'Vasya',text:'Hello, my friend',date:'12.03.2020'},{who:'Vasya',whom:'Misha',text:'Hello,bro',date:'17.03.2020'},{who:'Vasya',whom:'Nina',text:'hi, girl', date:'17.03.2020'}]
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      let datas
if(action.payload.length!==0){
 datas= action.payload.map(el=>{
   el.myachives=JSON.parse(el.myachives)
   el.friends=JSON.parse(el.friends)
   return el
  })
  }else{
    datas=[]
  }
return{
  ...state,
  users:[...datas],
  loading: false
} 
case ADD_USERS:
  return{
    ...state,
    users:[action.payload, ...state.users]
  }
case ADD_COOKIE:
    return{
      ...state,
      cookie:action.payload
    } 
case UPDATE_DATA:
  return{
    ...state,
    users:state.users.map(el=>{
      if(el.id===action.payload.id){
        el = action.payload.data
      }
      return el
    })
  }
case REQUEST_FRIEND:
  return{
    ...state,
    requestfriend:[...state.requestfriend,action.payload]
  }  
case LOAD_REQUEST:
  return{
    ...state,
    requestfriend:[...action.payload]
  }   
  case LOAD_PECHAT:
  return{
    ...state,
    writing:[...action.payload]
  } 
  case ADD_PECHAT:
  return{
    ...state,
    writing:[action.payload, ...state.writing]
  }
  case DELETE_PECHAT: 
  const write = state.writing
  write.forEach((elem,index)=>{
    if(elem.name.toString() === action.payload.name.toString() && elem.whome.toString() === action.payload.whome.toString()){
      write.splice(index,1)
    }else if(elem.name.toString() === action.payload.whome.toString() && elem.whome.toString() === action.payload.name.toString()){
      write.splice(index,1)
    }
   })
  return{
    ...state,
    writing: write
  }
  case ADD_STASUSES:
  return{
    ...state,
    statuses:[...state.statuses, action.payload]
  }  
case LOAD_STASUSES:
  const statuses = action.payload.map(el=>{
    el.userid  = el.userid.toString()
    return el
  })
  return{
    ...state,
    statuses:[...statuses]
  }
case DELETE_REQUEST:
  return{
    ...state,
    requestfriend:state.requestfriend.filter(el=>el.id!==action.payload)
  } 
case DELETE_STATUS:
  return{
    ...state,
    statuses:state.statuses.filter(el=>el.userid!==action.payload)
  }   
case UPDATE_STATUS:
    return{
      ...state,
      statuses:state.statuses.map(el=>{
        if(el.userid.toString()===action.payload.userid.toString()){
          el.status = action.payload.status
        }
        return el
      })
    } 
case UPDATE_FRIEND:
  return{
    ...state,
    users:state.users.map(el=>{
      if(el.id.toString()===action.payload.id.toString()){
        el.friends = action.payload.friends
      }
      return el
    })
  }   
case LOAD_CONTACTS:
  const contacts = action.payload.map(el=>{
    el.contacts = JSON.parse(el.contacts)
    return el
  })
  return{
    ...state,
    contacts:[...contacts]
  }
case ADD_CONTACTS:
  return{
    ...state,
    contacts:[...state.contacts, action.payload]
  }  
case UPDATE_CONTACTS:
  const updateCont = state.contacts.map(el=>{
    if(el.userid.toString()===action.payload.userid.toString()){
      el.contacts = action.payload.contacts
    }
    return el
  })
    return{
      ...state,
      contacts:[...updateCont]
    }
    case READ_MESSAGE:
      return{
        ...state,
        messages:state.messages.map(el=>{
          if(el.name.toString()===action.payload.name.toString() && el.towhome.toString()===action.payload.towhome.toString()){
            el.new = action.payload.new
          }
          return el
        })
      }  
    case ADD_MESSAGE:
      let share = action.payload
      if(share.sharepost===null){
        share.sharepost = []
      }
      return{
        ...state,
        messages:[...state.messages,{...share}]
      }  
    case LOAD_MESSAGE:
      let messages = action.payload.map((el)=>{
        el.images = JSON.parse(el.images)
        el.redirect = JSON.parse(el.redirect)
        el.sharepost = JSON.parse(el.sharepost)
        if(el.sharepost===null){
          el.sharepost=[]
        }
        return el
      })
      return{
        ...state,
        messages:[...messages],
        loading:false
      } 

    case REMOVE_MESSAGE:
      return{
        ...state,
        messages:state.messages.filter(elem=>elem.id!==action.payload)
      } 
      case REMBLOCK_MESSAGE:
        const mess = state.messages
        mess.forEach((elem,index)=>{
          if(elem.name.toString() === action.payload.name.toString() && elem.towhome.toString() === action.payload.towhome.toString()){
            mess.splice(index,1)
          }else if(elem.name.toString() === action.payload.towhome.toString() && elem.towhome.toString() === action.payload.name.toString()){
            mess.splice(index,1)
          }
         })
      return{
        ...state,
        messages:[...mess]
      }  
      case LOAD_BLOCKS:
        const blocks = action.payload.map(el=>{
          el.blocks = JSON.parse(el.blocks)
          return el
        })
        return{
          ...state,
          blocks:[...blocks]
        }
      case ADD_BLOCKS:
        return{
          ...state,
          blocks:[...state.blocks, action.payload]
        }  
      case UPDATE_BLOCK:
        const updateBlock = state.blocks.map(el=>{
          if(el.userid.toString()===action.payload.userid.toString()){
            el.blocks = action.payload.blocks
          }
          return el
        })
          return{
            ...state,
            contacts:[...updateBlock]
          }  
        case LOAD_ARTICLE:
            let articles = action.payload.map((el)=>{
              el.likes = JSON.parse(el.likes)
              el.images = JSON.parse(el.images)
              return el
            })
            return{
              ...state,
              articles:[...articles],
            } 
        case ADD_ARTICLE:
              return{
                ...state,
                articles:[...state.articles, action.payload]
              }
        case DELETE_ARTICLE:
          return{
            ...state,
            articles:[...state.articles.filter(el=>el.id!==action.payload.id)]
          }
        case UPDATE_VIEWS:
          return{
            ...state,
            articles:[...state.articles.map(el=>{if(el.id===action.payload.id){
              el.views = action.payload.views
            }
            return el
            })]
          } 
        case UPDATE_LIKES:
            return{
              ...state,
              articles:[...state.articles.map(el=>{if(el.id===action.payload.id){
                el.likes = action.payload.likes
              }
              return el
              })]
            } 
        case LOAD_COMMENTS:
          return{
            ...state,
            comments:[...action.payload]
          }
        case ADD_COMMENT:
          return{
            ...state,
            comments:[...state.comments, action.payload]
          }
        case REMOVE_COMMENT:
          return{
            ...state,
            comments:[...state.comments.filter(el=>el.id.toString()!==action.payload.id.toString())]
          }                          
/*case LOAD_POSTS:  
let data
if(action.payload.length!==0){
 data = action.payload.map(el=>{
   el.data=JSON.parse(el.data)
   return el
  })
  }else{
    data=[]
  }
return{
  ...state,
  posts:[...data],
  loading: false
} 
case ADD_POST:
  return{
    ...state,
    posts:[action.payload, ...state.posts]
  }
case LOAD_COMMENTS:
  return{
    ...state,
    comments:[...action.payload]
  } 
case ADD_COMMENT:
  return{
    ...state,
    comments:[action.payload,...state.comments]
  }
case LOAD_LOGIN:
  return{
    ...state,
    login:[...action.payload]
  }
case DELETE_COMMENT:
  return{
    ...state,
    comments:state.comments.filter((el)=>el.id!==action.payload)
  }  
  case DELETE_POST:
  return{
    ...state,
   posts:state.posts.filter((el)=>el.id!==action.payload)
  }  
  case DELCATEGORY_COMMENT:
    return{
      ...state,
      comments:state.comments.filter((el)=>el.idpost!==action.payload)
    } */

  /*case LOAD_VIEWS:
    return{
      ...state,
      views:[...action.payload]
    }
  case ADD_VIEW:
    return{
      ...state,
      views:[...state.views,action.payload]
    }  
  case UPDATE_VIEW:
  return{
   ...state,
   views:state.views.map(el=>{
     if(el.idpost==action.payload.idpost){
       el.amount = action.payload.amount
     }
     return el
   })
  }*/
    default:
      return state
  }
}
