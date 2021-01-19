import {Navbar, Nav} from "react-bootstrap";
import React from 'react';
import { Link } from "react-router-dom";


class My_Navbar extends React.Component{


    render(){
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">ECS 272 HW2</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link><Link to="/"></Link></Nav.Link>                       
                        <Nav.Link><Link to="/view_1">view_1</Link></Nav.Link>
                        <Nav.Link><Link to="/view_2">view_2</Link></Nav.Link>
                        <Nav.Link><Link to="/view_3">view_3</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default My_Navbar;