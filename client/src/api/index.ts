import axios from 'axios';
import config from '../config'

export const createUser = (userName: string) => {
  return axios.post(`${config.ENDPOINT}/users`, { userName })
}

export const createGame = (userName: string) => {
  return axios.post(`${config.ENDPOINT}/games`, { userName })
}

export const joinGame = (userName: string, gameId: string) => {
  return axios.post(`${config.ENDPOINT}/games/${gameId}`, { userName })
}
