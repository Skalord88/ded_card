import { create } from 'zustand'
import { addAbility, createUser, getRaces, setClass, setRace } from './api'

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
      charisma: number,
    },
    userWithDetails: any,
    show: boolean
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
      setRaceGetDetails: (raceId:number) => Promise<any>,
      setClassUpdateDetails: (classId:number) => Promise<any>
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
    userWithDetails: [],
    show: true,
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
    setRaceGetDetails: async (raceId:number) => {
      const userId = get().characterId
      try{ const userWithDetails = await setRace(userId,raceId) 
        if(userWithDetails.status === 200){
          set((state) => ({
            ...state, 
            userWithDetails:userWithDetails.data,
            show:true
          }))}
          return userWithDetails.data
      } catch (err) {
          console.log("Error",err)
      }
    },
    setClassUpdateDetails: async (classId:number) => {
      const userId = get().characterId
      try{ const classWithDetails = await setClass(userId,classId.toString()) 
        if(classWithDetails.status === 200){
          set((state) => ({
            ...state, 
            userWithDetails:classWithDetails.data,
            show:false
          }))}
          return classWithDetails.data
      } catch (err) {
          console.log("Error",err)
      }
    }
  }))