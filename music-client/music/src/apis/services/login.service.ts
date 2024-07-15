// import HeadersType from '../../types/headers'
import User from '../../types/user'

import http from '../axios'

const login = (userInfo:User)=>{
    return http.post('/api/auth/login',userInfo)
}

const getSongs = ()=>{
    return http.get('/api/music')
}

const getSongsByTitle = (title:string)=>{
   return http.get(`/api/music?search=${title}`
    )
}

const getPlaylist = ()=>{
  return http.get('/api/playlist')
}

const addToPlaylist = (songId:string)=>{
  return http.post('/api/playlist/add',{songId})
}

const removeFromPlaylist= (songId:string)=>{
  return http.post('/api/playlist/remove',{songId})
}

export default{
    login,
    getSongs,
    getSongsByTitle,
    getPlaylist,
    addToPlaylist,
    removeFromPlaylist
}