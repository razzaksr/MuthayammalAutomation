import { useState } from "react"
import { onProposalsLoad, onPropose } from "./connect"

export const CreateEvent=()=>{

    const[information,setInformation]=useState("")

    const[seminar,setSeminar]=useState({
        "seminar_name":"",
        "dept_id":0,
        "proposed_by":0
    })

    const[proposable,setProposable]=useState([])

    const fillPorposals=async(dept_id)=>{
        const temp = await onProposalsLoad(dept_id)
        setProposable(temp)
    }

    const infoCollect=(eve)=>{
        const{name,value}=eve.target
        setSeminar((old)=>{
            if(name==="seminar_name"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="dept_id"){
                fillPorposals(value)
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else{
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
        })
    }

    const callPropose=async()=>{
        const temp = await onPropose(seminar)
        setInformation(temp.message)
    }

    return(
        <>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-8 col-lg-6 shadow rounded-1 p-5">
                    <h1>{information}</h1>
                    <div className="form group">
                        <label>Seminar Name</label>
                        <input onChange={infoCollect} value={seminar.seminar_name} type="text" name="seminar_name" placeholder="Seminar Name" className="form-control" />
                    </div>
                    <div className="form group">
                        <label>Seminar Deaprtment</label>
                        <select name="dept_id" className="form-select" value={seminar.dept_id} onChange={infoCollect}>
                            <option value="1">CSE</option>
                            <option value="3">EEE</option>
                            <option value="5">IT</option>
                        </select>
                    </div>
                    <div className="form group">
                        <label>Select Coordinator</label>
                        <select name="proposed_by" className="form-select" onChange={infoCollect} value={seminar.proposed_by}>
                            {
                                proposable.map((val,key)=>{
                                    return (<option>{val}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className='row mt-5 justify-content-around'>
                        <input type='button' onClick={callPropose} value="Propose" className='col-3 btn btn-primary' />
                        <input type='button' onClick={()=>{
                            setSeminar(()=>{
                                return{
                                    "seminar_name":"",
                                    "dept_id":0,
                                    "proposed_by":0
                                }
                            })
                        }} value="Clear" className='col-3 btn btn-danger' />
                    </div>
                </div>
            </div>
        </>
    )
}