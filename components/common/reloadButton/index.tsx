import { FC } from "react"
interface Props{
    onReload : Function
    disabled? : boolean
}

const ReloadButton : FC<Props> = (props) => {

    const {onReload , disabled} = props
    return (

        <div className ='ml-2'>
            <input
                type="submit"
                name="submit"
                value="Refresh"
                onClick={()=>onReload()}
                disabled = {disabled ? disabled : false}
            />
        </div>

    )
}
export default ReloadButton