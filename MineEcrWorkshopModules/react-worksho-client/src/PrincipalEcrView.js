import { useState } from "react"
import { callAcceptLevel2, callLoadForLevel2 } from "./API"

export const PrincipalEcrView=()=>{

    const[info,setInfo]=useState("")

    const[ecrs,setEcrs]=useState([])

    const callAxiosLoadEmp2=async(dept)=>{
        const temp = await callLoadForLevel2(dept)
        alert(JSON.stringify(temp))
        setEcrs(temp)
    }

    const loadDeptId=(eve)=>{
        const{name,value}=eve.target
        callAxiosLoadEmp2(value)
    }

    // const callAccept=async(dept,wid)=>{
    //     const temp=await callAcceptLevel2(dept,wid)
    //     setInfo(temp)
    // }
    return(
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        <div className="form group">
                            <label>Select Department</label>
                            <select name="dept_id" className="form-select" onChange={loadDeptId}>
                                <option>Select Department</option>
                                <option value="1">CSE</option><option value="3">EEE</option>
                                <option value="5">IT</option>
                            </select>
                        </div>
                    </div>
                </div>
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
                                                    <button type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                        const temp=await callAcceptLevel2(val.dept_id,val.workshop_id)
                                                        setInfo(temp)
                                                        window.location.assign("/")
                                                    }} className="btn btn-success col-4">Accept</button>
                                                    <button type="button" className="btn btn-dark col-4">Reject</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}