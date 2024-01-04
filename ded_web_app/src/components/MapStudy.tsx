import React from "react"

import {
    mapStudy
  } from "../components/interfaces";


export const MapStudy: React.FC<mapStudy> = ({ mapStudy }) => {
    return(
        <div>
            <ul>
                {Array.from(mapStudy.entries()).map(([key, value]) => (
                    <li key={key}>
                        {key} {value}
                    </li>
                ))}
            </ul>
        </div>
    )
}