import { create } from 'zustand'
import { addAbility, createUser, getRaces } from './api'

type State = {
    characterName: string,
    playerName: string,
    status: number,
    characterId: number,
    ability: {
      streght: number,
      dextrity: number,
      constitution: number,
      intelligence: number,
      wisdom: number,
      charisma: number
    },
  }
  
  type Action = {
    createNewUser: (data:{ characterName: string; playerName:string;}) => Promise<number>,
    addAbility: (
      data:{ 
          streght: number,
          dextrity: number,
          constitution: number,
          intelligence: number,
          wisdom: number,
          charisma: number,
      }
      ) => void,
  }
  
 export const useStore = create<State & Action>((set,get) => ({
    characterName: '',
    playerName: '',
    status: 0,
    characterId: 0,
    ability: {
      streght: 0,
      dextrity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    },
    createNewUser: async (data: { characterName: string; playerName: string;}) => {
      try{ const user = await createUser(data) 
        if(user.status === 200){
          set((state) => ({
            ...state, 
            characterName: data.characterName, 
            playerName:data.playerName, 
            characterId:user.data.characterId,
          }))}
          return user.data.characterId
      } catch (err) {
          console.log("Error",err)
      }
    },
    addAbility: async (
      data:{ 
          streght: number,
          dextrity: number,
          constitution: number,
          intelligence: number,
          wisdom: number,
          charisma: number
      }) => {
        const userId = get().characterId
        const ability = await addAbility(userId, data)
        set({
          ability: {  
            streght: data.streght,
            dextrity: data.dextrity,
            constitution: data.constitution,
            intelligence: data.intelligence,
            wisdom: data.wisdom,
            charisma: data.charisma
        }})
        return ability
      },
  }))