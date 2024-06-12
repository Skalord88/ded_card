import { useState } from "react"
import { FightAttack } from "../components/Attack"

export function Fight() {
  const [option, setOption] = useState<string>("")

  return (
    <>
        <div className="rpgui-container-framed-golden grid-table-three">
            <div><p onClick={()=>setOption("Attack")}>Attack</p></div>
            <div><p>Magic</p></div>
            <div><p>Special</p></div>
            <div><p>Items</p></div>
            <div><p>Skills</p></div>
            <div><p>---</p></div>
        </div>
        {option==="Attack"?
      <FightAttack />  
    :<></>  
    }
    </>
  )
}
