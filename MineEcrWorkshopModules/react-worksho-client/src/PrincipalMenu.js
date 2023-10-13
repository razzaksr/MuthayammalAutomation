import { Container, Nav, Navbar } from "react-bootstrap"

export const PrincipalMenu=()=>{
    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <h1>Muthayammal Engineering College</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="hod" />
                    <Navbar.Collapse id="hod">
                        <Nav className="ms-auto">
                            <a className="me-2 btn btn-outline-success" href="/pecr">View ECR</a>
                            <a className="me-2 btn btn-outline-success" href="/setaf">View SetAf</a>
                            <a className="me-2 btn btn-outline-success" href="/faculties">Filter Faculties</a>
                            <a className="me-2 btn btn-outline-success" href="/shortecr">Filter ECR</a>
                            <a className="me-2 btn btn-outline-success" href="/shortsetaf">Filter SetAf</a>
                            <button className="me-2 btn btn-outline-danger" onClick={()=>{
                                sessionStorage.removeItem("logged")
                                window.location.assign("/")
                            }}>
                                Logout
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}