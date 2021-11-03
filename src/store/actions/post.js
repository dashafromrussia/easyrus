import {ADD_COMMENT, ADD_COOKIE, ADD_POST, ADD_USERS, ADD_VIEW, DELCATEGORY_COMMENT, DELETE_POST, LOAD_COMMENTS, LOAD_LOGIN, LOAD_POSTS, LOAD_USERS, LOAD_VIEWS, UPDATE_VIEW, UPDATE_DATA, REQUEST_FRIEND, LOAD_REQUEST, LOAD_STASUSES, ADD_STASUSES, DELETE_REQUEST, DELETE_STATUS, UPDATE_STATUS, ADD_FRIEND, DELETE_FRIEND, UPDATE_FRIEND, LOAD_CONTACTS, ADD_CONTACTS, DELETE_CONTACTS, UPDATE_CONTACTS, ADD_MESSAGE, LOAD_MESSAGE, REMOVE_MESSAGE, READ_MESSAGE, LOAD_BLOCKS, ADD_BLOCKS, UPDATE_BLOCK, REMBLOCK_MESSAGE, LOAD_PECHAT, ADD_PECHAT, DELETE_PECHAT, ADD_ARTICLE, LOAD_ARTICLE, DELETE_ARTICLE, UPDATE_VIEWS, UPDATE_LIKES, DELETE_COMMENT, REMOVE_COMMENT} from '../types'
import { DB } from '../../db'

export const loadingUsers = () => {
  return async dispatch => {
   const users = await DB.loadUsers()
   console.log('userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',users)
    dispatch({
      type: LOAD_USERS,
      payload: users
    })
  } 
}


export const addUsers = (data) => {
  return async dispatch => {
 const id = await DB.addUser(data)
 console.log('ass')
    dispatch({
      type: ADD_USERS,
      payload:{id,...data}
    })
  } 
}

export const updateInfo = (info) => {
  return async dispatch=>{
    await DB.updateData(info)
   dispatch({
       type: UPDATE_DATA,
       payload:info
   })
 }
 }


export const addCookie = (data) => {
  console.log('action cook')
  return async dispatch => {
    dispatch({
      type: ADD_COOKIE,
      payload:data
    })
  } 
}

export const loadReqFriend = () => {
  return async dispatch => {
    const requests = await DB.loadReqFriends()
    console.log(requests,'reeequest')
    dispatch({
      type: LOAD_REQUEST,
      payload:requests
    })
  } 
}


export const addReqFriend = (data) => {
  return async dispatch => {
    const id = await DB.addRequestFriend(data)
    dispatch({
      type: REQUEST_FRIEND,
      payload:{id,...data}
    })
  } 
}


export const addStatuses = (data) => {
  return async dispatch => {
    const id = await DB.addStatus(data)
    dispatch({
      type: ADD_STASUSES,
      payload:{id,...data}
    })
  } 
}




export const loadStatus = () => {
  return async dispatch => {
    const statuses = await DB.loadStatuses()
    dispatch({
      type: LOAD_STASUSES,
      payload: statuses
    })
  }
}

export const deleteRequest = (id) => {
  return async dispatch => {
   await DB.deleteReqFriend(id)
    dispatch({
      type: DELETE_REQUEST,
      payload:id
    })
  } 
}

export const delStatus = (id) => {
  return async dispatch => {
   await DB.deleteOneStatus(id)
    dispatch({
      type: DELETE_STATUS,
      payload:id
    })
  } 
}

export const updatesStatus = (info) => {
  return async dispatch=>{
    await DB.updateStatus(info)
   dispatch({
       type: UPDATE_STATUS,
       payload:info
   })
 }
 }

 export const updateFriend = (info) => {
  return async dispatch=>{
    await DB.updateMyFriend(info)
   dispatch({
       type: UPDATE_FRIEND,
       payload:info
   })
 }
 }

export const loadsContacts = () => {
  return async dispatch => {
    const data = await DB.loadContacts()
    dispatch({
      type: LOAD_CONTACTS,
      payload: data
    })
  } 
}

export const loadsPech = (info) => {
  return async dispatch => {
    const data = await DB.loadsPechat(info)
    console.log('pechattt')
    dispatch({
      type: LOAD_PECHAT,
      payload: data
    })
  }
  
}

export const addsPech = (data) => {
  return async dispatch => {
    const id = await DB.addPechat(data)
    dispatch({
      type: ADD_PECHAT,
      payload:{id:id,...data}
    })
  } 
}

export const deletePech = (info) => {
  return async dispatch=>{
    await DB.deletePechat(info)
   dispatch({
       type: DELETE_PECHAT,
       payload:info
   })
 }
 }

export const addsContacts = (data) => {
  return async dispatch => {
    const id = await DB.addContacts(data)
    dispatch({
      type: ADD_CONTACTS,
      payload:{id:id,...data}
    })
  } 
}

export const updateContact = (info) => {
  return async dispatch=>{
    await DB.updateOneContacts(info)
   dispatch({
       type: UPDATE_CONTACTS,
       payload:info
   })
 }
 }

 export const sendMessage=(send)=>{
  return async dispatch =>{
    let insertId =await DB.addMessage(send)
  dispatch({
    type: ADD_MESSAGE,
    payload:{...send,id:insertId}
  })
}
}

export const loadMessage=(data)=>{
  return async dispatch =>{
   let messages = await DB.getMessages(data)
  dispatch({
    type: LOAD_MESSAGE,
    payload: messages
  })
}
}


export const removeMessage=(id)=>{
  return async dispatch =>{
    await DB.deleteMessage(id) 
  dispatch({
    type:REMOVE_MESSAGE,
    payload: id
  })
}
}

export const removeBlockMessage=(data)=>{
  return async dispatch =>{
    await DB.deleteBlockMessages(data) 
    await DB.deleteBlockMessages({name:data.towhome,towhome:data.name}) 
  dispatch({
    type:REMBLOCK_MESSAGE,
    payload: data
  })
}
}

export const readMessage=(data)=>{
  return async dispatch =>{
    await DB.readMessages(data)
  dispatch({
    type:READ_MESSAGE,
    payload: data
  })
}
}

export const loadsBlock = () => {
  return async dispatch => {
    const data = await DB.getBlock()
    dispatch({
      type: LOAD_BLOCKS,
      payload: data
    })
  }
  
}

export const addBlock = (data) => {
  return async dispatch => {
    const id = await DB.addinBlock(data)
    dispatch({
      type: ADD_BLOCKS,
      payload:{id:id,...data}
    })
  } 
}

export const updateBlock = (info) => {
  return async dispatch=>{
    await DB.updateOneBlock(info)
   dispatch({
       type: UPDATE_BLOCK,
       payload:info
   })
 }
 }

 export const addArticle = (data) => {
   console.log('arttrttt')
  return async dispatch => {
    const id = await DB.addsArticle(data)
    dispatch({
      type: ADD_ARTICLE,
      payload:{id:id,...data}
    })
  } 
}

export const loadsArticle = () => {
  return async dispatch => {
    const data = await DB.getArticles()
    dispatch({
      type: LOAD_ARTICLE,
      payload: data
    })
  }
  
}

export const deleteArticle = (info) => {
  return async dispatch=>{
    await DB.deleteArticle(info)
   dispatch({
       type: DELETE_ARTICLE,
       payload:info
   })
 }
 }

 export const updatesViews = (info) => {
  return async dispatch=>{
    await DB.updateViews(info)
   dispatch({
       type: UPDATE_VIEWS,
       payload:info
   })
 }
 }

 export const updatesLikes = (info) => {
  return async dispatch=>{
    await DB.updateLikes(info)
   dispatch({
       type: UPDATE_LIKES,
       payload:info
   })
 }
 }

 export const loadsComments = () => {
  return async dispatch => {
    const data = await DB.loadComments()
    dispatch({
      type: LOAD_COMMENTS,
      payload: data
    })
  }
  
}

export const deletesComments = (info) => {
  return async dispatch=>{
    await DB.deleteComment(info)
    console.log('dellllllllll')
   dispatch({
       type: REMOVE_COMMENT,
       payload:info
   })
 }
 }

 export const addsComments = (data) => {
  console.log('arttrttt')
 return async dispatch => {
   const id = await DB.addComment(data)
   dispatch({
     type: ADD_COMMENT,
     payload:{id:id,...data}
   })
 } 
}
/*export const loadLogin = () => {
  return async dispatch => {
    const login = await DB.loadLogin()
    dispatch({
      type: LOAD_LOGIN,
      payload: login
    })
  }
  
}


export const loadViews = () => {
  return async dispatch => {
    const views = await DB.loadViews()
    dispatch({
      type: LOAD_VIEWS,
      payload: views
    })
  }
  
}

export const addView = (data) => {
  return async dispatch => {
    const id = await DB.addView(data)
    dispatch({
      type: ADD_VIEW,
      payload:{id:id,...data}
    })
  } 
}

export const updateView = (data) => {
  return async dispatch => {
   await DB.updateView(data)
    dispatch({
      type: UPDATE_VIEW,
      payload:data
    })
  } 
}

export const addsComment = (data) => {
  return async dispatch => {
    const id = await DB.addComment(data)
    dispatch({
      type: ADD_COMMENT,
      payload:{id:id,...data}
    })
  } 
}

export const deleteComment = (id) => {
  return async dispatch => {
   await DB.deleteComment(id)
    dispatch({
      type: DELETE_COMMENT,
      payload:id
    })
  } 
}

export const deletePost = (id) => {
  return async dispatch => {
   await DB.deletePost(id)
    dispatch({
      type: DELETE_POST,
      payload:id
    })
  } 
}

export const deleteCategoryComment = (id) => {
  return async dispatch => {
   await DB.deleteCatComment(id)
    dispatch({
      type: DELCATEGORY_COMMENT,
      payload:id
    })
  } 
}


export const addData = (data) => {
  return async dispatch => {
    const id = await DB.addData(data)
    dispatch({
      type: ADD_POST,
      payload:{id:id,...data}
    })
  } 
}


export const loadPosts= () => {
  return async dispatch => {
   const data = await DB.loadData()
   console.log(data,'data')
       dispatch({
          type: LOAD_POSTS,
          payload: data
        })  
  }
  
}*/


