import { ReactNode } from "react"

export const objectToTSX = (object : any) : ReactNode =>{
    return Object.keys(object).map((key)=>{
        return <p>{key} : <span>{`${object[key]}`}</span></p>

    })
}