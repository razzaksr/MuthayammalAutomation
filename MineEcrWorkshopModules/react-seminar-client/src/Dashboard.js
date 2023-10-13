import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FacultyMenu } from "./FacultyMenu"
import { CreateEvent } from "./CreateEvent"
import { useEffect, useState } from "react"
import { HodDashboard } from "./HodDashboard"

export const Dashboard=()=>{
    const[hodLog,setHodLog]=useState(false)
    const[principalLog,setPrincipalLog]=useState(false)

    useEffect(()=>{
        const logged=JSON.parse(sessionStorage.getItem("person"))
        if(logged.faculty_desig==403){
            setHodLog(true)
        }
    },[])

    return(
        <>
            {
                (principalLog)
                ?
                <>

                </>
                :
                (hodLog)?
                <>
                    <HodDashboard/>
                </>
                :
                <>
                    <BrowserRouter>
                        <FacultyMenu/>
                        <Routes>
                            <Route path="ecr" element={<CreateEvent/>} />
                            {/* <Route path="setaf" element={} /> */}
                            
                        </Routes>
                    </BrowserRouter>
                </>
            }
        </>
    )
}