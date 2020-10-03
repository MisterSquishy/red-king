import axios from 'axios';
import config from '../config'

export const createUser = (userName: string) => {
  return axios.post(`${config.ENDPOINT}/users`, { userName })
}

export const createRoom = () => {
  return axios.post(`${config.ENDPOINT}/rooms`)
}