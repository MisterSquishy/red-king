import axios from 'axios';
import config from '../config'

export const createRoom = () => {
  return axios.post(`${config.ENDPOINT}/rooms`)
}