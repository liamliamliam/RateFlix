import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Alignment, Button, Navbar, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import { Link } from 'react-router-dom';

import * as actions from '../../actions';
import SearchInput from '../SearchInput';
import NavBarUser from './NavBarUser';

function NavBar() {
  const dispatch = useDispatch();
  const { auth, searchString } = useSelector(state => state);
  //console.log('Navbar - searchString:', searchString);
  const location = useLocation();
  const navigate = useNavigate();
  const showBackToSearch = !!searchString && location.pathname.substring(0, 8) !== '/search/';
  return (
    <Navbar fixedToTop>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          <Link to='/' className='rf-logo'>RateFlix</Link>
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        {showBackToSearch && <Button minimal onClick={() => navigate(`/search/${searchString}`)}>Back to Search</Button>}
        {showBackToSearch && <Navbar.Divider />}
        <SearchInput />
        {!!auth ? <></> : <Button minimal onClick={() => dispatch(actions.fetchUser())}>fetch user</Button>}
        <Navbar.Divider />
        {!!auth ? <NavBarUser /> : <Button minimal onClick={() => navigate('/login')}>Login</Button>}
      </NavbarGroup>
    </Navbar>
  );
}

export default NavBar;
