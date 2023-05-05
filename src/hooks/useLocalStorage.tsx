import { useEffect, useState } from "react"

export function useLocalStorage<Type>(key: string, initialValue: Type | (()=>Type)){
    const [value, setValue] = useState<Type>(()=>{
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if(typeof initialValue === "function") {
            return (initialValue as ()=>Type)()
        } else {
            return initialValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    
    return [value, setValue] as [typeof value, typeof setValue]
}