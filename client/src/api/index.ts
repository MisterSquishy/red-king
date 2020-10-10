import axios from 'axios';
import config from '../config'
import { Card, DrawType } from '../models/interfaces';

export const createUser = (userName: string) => {
  return axios.post(`${config.ENDPOINT}/users`, { userName })
}

export const createGame = (userName: string) => {
  return axios.post(`${config.ENDPOINT}/games`, { userName })
}

export const joinGame = (gameId: string, userName: string) => {
  return axios.post(`${config.ENDPOINT}/games/${gameId}`, { userName })
}

export const draw = (gameId: string, userName: string, type: DrawType) => {
  return axios.post(`${config.ENDPOINT}/games/${gameId}/draw`, { userName, type })
}

export const discard = (gameId: string, userName: string, card: Card) => {
  return axios.post(`${config.ENDPOINT}/games/${gameId}/discard`, { userName, card })
}
