import { useEffect, useState } from "react"
import {Proposal} from './Proposal'
import { Setaf } from "./Setaf"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FacultyMenu } from "./FacultyMenu"
import { HodDashboard } from "./HodDashboard"

export const Dashboard=()=>{

    const[hodView,setHodView]=useState(false)
    const[faculty,setFaculty]=useState({})

    useEffect(()=>{
        const log=JSON.parse(sessionStorage.getItem("logged"))
        if(log.faculty_desig===403){
            setHodView(true)
        }else{
            setFaculty(log)
            setHodView(false)
        }
    },[hodView])

    return(
        <>
            {/* <h1>Dashboard</h1>
            <input type="button" value="logout" className="btn btn-danger" onClick={()=>{
                sessionStorage.removeItem("logged")
                window.location.assign("/")
            }} /> */}
            {
                (hodView)
                ?
                <>
                  <HodDashboard/>  
                </>
                :
                <>
                    <BrowserRouter>
                        <FacultyMenu/>
                        <Routes>
                            <Route path="ecr" element={<Proposal/>} />
                            <Route path="setaf" element={<Setaf/>} />
                        </Routes>
                    </BrowserRouter>
                </>
            }
        </>
    )
}