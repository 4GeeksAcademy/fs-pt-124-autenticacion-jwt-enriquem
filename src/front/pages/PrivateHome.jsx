import { useEffect, useState } from "react"
import { BACKEND_URL } from "../main"
import { useNavigate } from "react-router-dom"

const PrivateHome = () => {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const getUser = async () => {
        const token = localStorage.getItem("user_token")
        if (!token) {
            console.log("No token")
            navigate("/login")
            return
        }

        try {
            const resp = await fetch(BACKEND_URL + "api/private/home", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            const data = await resp.json()

            if (!resp.ok) {
                throw new Error("Unauthorized or error")
            }
            setUser(data.user || data)
        } catch (err) {
            console.error("ERROR:", err)
            setUser(null)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="container">
            <h1>Home Privado</h1>
            <div className="row">
                <div className="col">
                    {user ? (
                        <>Vista privada de {user.email}</>
                    ) : (
                        <>Loading...</>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PrivateHome