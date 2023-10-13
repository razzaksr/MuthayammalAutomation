import axios from 'axios'

const url="http://localhost:1234"

export const onLogin=async(obj)=>{
    const returned = await axios.post(`${url}/login`,obj)
    return returned.data
}

export const onProposalsLoad=async(dept_id)=>{
    //alert(dept_id)
    const returned=await axios.get(`${url}/seminar/find/${dept_id}`)
    let ids=[]
        returned.data.rows.map((v)=>{
            ids.push(v.faculty_id)
        })
        return ids
}

export const onPropose=async(obj)=>{
    const returned = await axios.post(`${url}/seminar/propose`,obj)
    return returned.data
}


export const loadForLevel1=async(dept,emp)=>{
    const receive = await axios.get(`${url}/seminar/loadForLevel1/${dept}/${emp}`)
    return receive.data.rows
}

export const approveLevel1=async(dept,emp)=>{
    const receive = await axios.put(`${url}/seminar/acknowledgelevel1/${dept}/${emp}`)
    return receive.data.message
}