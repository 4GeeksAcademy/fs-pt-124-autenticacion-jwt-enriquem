import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const LayoutUser = () => {

    const navigate = useNavigate()

    useEffect (()=>{
        if(!localStorage.getItem("user_token")){
            navigate("/welcome")
        }
    })
    return(
        <>
        <Outlet />
        </>
    )
}