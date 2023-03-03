export const format = (value : string) =>{
    value = value.replace(/_/g, " ")
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}