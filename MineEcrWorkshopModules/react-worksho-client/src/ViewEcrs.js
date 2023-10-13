import { useEffect, useState } from "react"
import { callAcceptLevel1, callLoadLevel1 } from "./API"

export const ViewEcrs=()=>{
    const[ecrs,setEcrs]=useState([])

    const[info,setInfo]=useState("")

    const callAxiosLoadEmp1=async()=>{
        const log=JSON.parse(sessionStorage.getItem("logged"))
        const temp = await callLoadLevel1(log.faculty_dept,log.faculty_id)
        setEcrs(temp)
    }

    useEffect(()=>{
        callAxiosLoadEmp1()
    },[])


    const acceptAll=async()=>{
        const log=JSON.parse(sessionStorage.getItem("logged"))
        const data=await callAcceptLevel1(log.faculty_dept,log.faculty_id)
        setInfo(data)
        window.location.assign("/")
    }

    return(
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <h1 className="text-center text-success">{info}</h1>
                    <div className="col-12 col-sm-12 col-md-8 col-6 shadow p-5">
                        <div className="table-responsive">
                            <table className="table table-stripped text-nowrap">
                                <thead>
                                    <tr>
                                        <th>ECR No</th><th>ECR Name</th><th>ECR Proposed by</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ecrs.map((val,key)=>(
                                            <tr>
                                                <td>{val.workshop_id}</td>
                                                <td>{val.workshop_name}</td>
                                                <td>{val.eve_proposed_by}</td>
                                                <td className="row justify-content-evenly">
                                                    <button type="button" className="btn btn-success col-4">Accept</button>
                                                    <button type="button" className="btn btn-dark col-4">Reject</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="row justify-content-center">
                                <button type="button" onClick={acceptAll} className="col-12 col-md-4 btn btn-outline-primary">
                                    Accept All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}