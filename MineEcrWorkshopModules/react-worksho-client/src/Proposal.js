import { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { loadEmployees, pushWorkshop } from './API'

export const Proposal=()=>{

    const[faculties,setFaculties]=useState([])
    const[log,setLog]=useState({
        "workshop_name":"",
        "dept_id":0,
        "proposal_by":0
    })
    const[info,setInfo]=useState({})

    const callLoadEmp=async(dept)=>{
        const temp=await loadEmployees(dept)
        setFaculties(temp)
    }

    const callOnChange=(eve)=>{
        const{name,value}=eve.target
        setLog((old)=>{
            if(name==='dept_id')
            {
                callLoadEmp(value)
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else if(name==='proposal_by'){
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else{
                return{
                    ...old,
                    [name]:value
                }
            }
        })
    }
    const callProposal=async()=>{
        console.log(JSON.stringify(log))
        const ret=await pushWorkshop(log)
        setInfo(ret)
    }

    return(
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <h1 className="text-primary text-center">New Workshop Proposal</h1>
                    <p className='text-success text-center'>{info.message} {info.id}</p>
                    <div className="col-12 col-sm-12 col-md-8 col-lg-6 p-3 shadow">
                        <div className='form group'>
                            <label>Workshop Name</label>
                            <input type='text' value={log.workshop_name} onChange={callOnChange} name='workshop_name' placeholder='Workshop name' className='form-control' />
                        </div>
                        <div className='form group'>
                            <label>Department</label>
                            <select name='dept_id' value={log.dept_id} className='form-select' onChange={callOnChange}>
                                <option>Select Department</option>
                                <option value="1">CSE</option>
                                <option value="3">EEE</option>
                                <option value="5">IT</option>
                            </select>
                        </div>
                        <div className='form group'>
                            <label>Select Faculty</label>
                            <select className='form-select' value={log.proposal_by} name='proposal_by' onChange={callOnChange}>
                                {faculties.map(item => {
                                    return (<option>{item}</option>);
                                })}
                            </select>
                        </div>
                        <div className='row mt-5 justify-content-around'>
                            <input onClick={callProposal} type='button' value="Propose" className='col-3 btn btn-primary' />
                            <input type='button' value="Clear" className='col-3 btn btn-danger' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}