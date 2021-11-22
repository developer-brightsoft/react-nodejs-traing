import React from 'react'
import { Navbar, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/auth.actions';

export default function NavigationBar() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div>
            <Navbar className='mt-3'>
                <Container>
                    <Navbar.Collapse className="justify-content-end">
                        <DropdownButton id="dropdown-item-button" className='drop_menu' title={`${user?.email}`}>
                            <Dropdown.Item as="button" onClick={handleLogout} >logout</Dropdown.Item>
                        </DropdownButton>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
