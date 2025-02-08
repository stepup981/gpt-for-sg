import axios from "axios"

const axiosConfigChat = axios.create({
  baseURL: 'https://salesgear.ru/test/sbergpt/',
  withCredentials: true,
})

export default axiosConfigChat