import { Container, Nav, Navbar } from "react-bootstrap"

export const FacultyMenu=()=>{
    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <h1>Muthayammal Engineering College</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="faculty" />
                    <Navbar.Collapse id="faculty">
                        <Nav className="ms-auto">
                            <a className="me-2 btn btn-outline-success" href="/ecr">ECR</a>
                            <a className="me-2 btn btn-outline-success" href="/setaf">SetAf</a>
                            <button className="me-2 btn btn-outline-danger" onClick={()=>{
                                sessionStorage.removeItem("person")
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