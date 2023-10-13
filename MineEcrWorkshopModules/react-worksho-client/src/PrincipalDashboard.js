import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrincipalMenu } from "./PrincipalMenu"
import { PrincipalEcrView } from "./PrincipalEcrView"

export const PrincipalDashboard=()=>{
    return(
        <>
            <BrowserRouter>
                <PrincipalMenu/>
                <Routes>
                    <Route path="pecr" element={<PrincipalEcrView/>} />
                    
                </Routes>
            </BrowserRouter>
        </>
    )
}