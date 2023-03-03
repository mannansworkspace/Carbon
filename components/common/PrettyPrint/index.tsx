import { FC, useMemo } from "react";

interface Props{
    data : string
}

const PrettyPrint : FC<Props> = (props) =>{
    
    const {data} = props

    const bodyContent = useMemo(()=>{
        try{
            return <div><pre>{JSON.stringify(JSON.parse(data), null, 2)}</pre></div>
        }catch(error){
            return <div><pre>{data}</pre></div>
        }
    },[data])
    return(
        <>
            {bodyContent}
        </>
    ) 
}
export default PrettyPrint