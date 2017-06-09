import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = 'https://home-appraiser-server.herokuapp.com/'

const clientAuth = {

  setTokenHeader: () => {
    const token = localStorage.getItem('token')
    if(token) {
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
    }
  },

  signUp: (userInfo) => {
    return axios({
      url: '/api/users',
      method: 'post',
      data: userInfo
    })
  },

  logIn: (credentials) => {
    return axios({
      url: '/api/users/login',
      method: 'post',
      data: credentials
    })
    .then(res => {
      if(res.data.token) {
        localStorage.setItem('token', res.data.token)
        clientAuth.setTokenHeader()
        console.log("Decoded token:", jwt_decode(res.data.token))
        return jwt_decode(res.data.token)
      } else {
          return false
      }
    })
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token')
    return token ? jwt_decode(token) : null
  },

  logOut: () => {
    return new Promise((resolve) => {
      localStorage.clear()
      delete axios.defaults.headers.common['x-access-token']
      resolve("Peace out!")
    })
  },

  getLocationInfo: (locationData) => {
    return axios({
      url:'/api/location',
      method:'POST',
      data: locationData
    })
  },

  // returnedZillowInfo: () => {
  //   return axios({
  //     url: '/api/location',
  //     method: 'get'
  //   })
  // }
  getQuotes: () => {
    return axios({
      url: 'api/quotes',
      method: 'get'
    })
  },

  addQuote: (newZillowQuote) => {
    console.log(newZillowQuote)
    return axios({
      url: '/api/quotes',
      method: 'post',
      data: newZillowQuote
    })
  },

  deleteQuote: (id) => {
    return axios({
      url: `/api/quotes/${id}`,
      method: 'delete'
    })
  },

  deleteUser: (id) => {
    console.log("client auth", id)
    return axios({
      url: `/api/users/${id}`,
      method: 'delete'
    })
  }
}

clientAuth.setTokenHeader()
export default clientAuth
