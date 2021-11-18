import React, {useContext} from 'react'
import { AuthContext } from './context/AuthContext';
import { Navbar, Container, Dropdown, DropdownButton} from 'react-bootstrap';

export default function NavigationBar() {
    const {authState:{user}, logoutUser} = useContext(AuthContext)
    const logout = () => {
        logoutUser()
    }
    return (
        <div>
            <Navbar className='mt-3'>
                <Container>
                    <Navbar.Collapse className="justify-content-end">
                        <DropdownButton id="dropdown-item-button" className='drop_menu' title={`${user.email}`}>
                        <Dropdown.Item as="button" onClick={logout} >logout</Dropdown.Item>
                    </DropdownButton>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
