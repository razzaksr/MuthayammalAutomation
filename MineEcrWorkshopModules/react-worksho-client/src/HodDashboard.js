import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HodMenu } from "./HodMenu"
import { ViewEcrs } from "./ViewEcrs"
import { ViewSetAfs } from "./ViewSetafs"
import { FilterFaculties } from "./FilterFaculties"
import { FilterEcrs } from "./FilterEcrs"
import { FilterSetAfs } from "./FilterSetAfs"

export const HodDashboard=()=>{
    return(
        <>
            <BrowserRouter>
                <HodMenu/>
                <Routes>
                    <Route path="ecr" element={<ViewEcrs/>} />
                    <Route path="setaf" element={<ViewSetAfs/>} />
                    <Route path="faculties" element={<FilterFaculties/>} />
                    <Route path="shortecr" element={<FilterEcrs/>} />
                    <Route path="shortsetaf" element={<FilterSetAfs/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}