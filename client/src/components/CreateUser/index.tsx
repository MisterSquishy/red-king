import React, { useContext, useState } from 'react'

import { GameContext } from '../../App'
import { createUser } from '../../api'

export default () => {

  const { setUserName } = useContext(GameContext);
  const [ unsavedUserName, setUnsavedUserName ] = useState('')

  const createUserHandler = (userName:string, setUserName: Function) => {
    createUser(userName)
      .then(resp => setUserName(resp.data.userName))
      .catch(console.error)
  }

  return <>
    <h1>
      Who are you?
    </h1>
    <input 
      onChange={ event => setUnsavedUserName(event.target.value) }
      value={ unsavedUserName }
    />
    <button disabled={!unsavedUserName} onClick={() => createUserHandler(unsavedUserName || '', setUserName)}>
      Be you
    </button>
  </>
}