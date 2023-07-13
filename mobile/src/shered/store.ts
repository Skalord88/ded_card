import { create } from 'zustand'
import { createUser } from './api'

type State = {
    characterName: string,
    playerName: string,
    status: number
  }
  
  type Action = {
    createNewUser: (data:{ characterName: string; playerName:string}) => void,
  }
  
 export const useStore = create<State & Action>((set,get) => ({
    characterName: '',
    playerName: '',
    status: 0,
    createNewUser: async (data: { characterName: string; playerName: string;}) => {
        const user = await createUser(data)
        set({ characterName: data.characterName, playerName:data.playerName, status:user.status })
        return user
    }
  }))