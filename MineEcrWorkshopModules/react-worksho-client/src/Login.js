import { useState } from "react"
import { callLogin } from "./API"

export const Login=()=>{

    const[info,setInfo]=useState("")

    const[log,setLog]=useState({
        "mail":"",
        "pass":""
    })

    const collect=(eve)=>{
        const{name,value}=eve.target
        setLog((old)=>{
            return{
                ...old,
                [name]:value
            }
        })
    }

    const sendToLogin=async()=>{
        //console.log(JSON.stringify(log))
        const data=await callLogin(log)
        if(data.faculty_id){
            sessionStorage.setItem('logged',JSON.stringify(data))
            window.location.assign("/")
        }
        else{
            setInfo(data.error)
        }
    }

    return(
        <>
            <div className="container">
                <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-8 align-self-center">
                        <h1 className="text-center display-4 text-primary text-uppercase">Muthayammal Engineering College, An Autonomous Institution</h1>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-5 shadow-lg">
                        <h1 className="text-success text-center">Login to MEC</h1>
                        <h4 className="text-danger text-center">{info}</h4>
                        <div className="form group">
                            <label>Email to SignIn</label>
                            <input type="email" value={log.mail} onChange={collect} name="mail" placeholder="Email address" className="form-control" />
                        </div>
                        <div className="form group">
                            <label>Password to SignIn</label>
                            <input type="password" value={log.pass} onChange={collect} name="pass" placeholder="Password here" className="form-control" />
                        </div>
                        <div className="mt-4 row justify-content-around">
                            <input type="button" className="col-3 btn btn-outline-primary" value="LOGIN" onClick={sendToLogin} />
                            <input type="button" className="col-3 btn btn-outline-dark" value="Cancel" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}