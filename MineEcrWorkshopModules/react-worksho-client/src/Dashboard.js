import { useEffect } from "react"

export const Dashboard=()=>{

    useEffect(()=>{
        const log=JSON.parse(sessionStorage.getItem("logged"))
        if(log.faculty_desig===403)
    })

    return(
        <>
            <h1>Dashboard</h1>
            <input type="button" value="logout" className="btn btn-danger" onClick={()=>{
                sessionStorage.removeItem("logged")
                window.location.assign("/")
            }} />
        </>
    )
}