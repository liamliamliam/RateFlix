import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Alignment, Button, Navbar, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import { Link } from 'react-router-dom';

import SearchInput from '../SearchInput';
import NavBarUser from './NavBarUser';

function NavBar() {
  const { auth, searchString } = useSelector(state => state);
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
        <Navbar.Divider />
        {!!auth ? <NavBarUser /> : <Button minimal onClick={() => navigate('/login')}>Login</Button>}
      </NavbarGroup>
    </Navbar>
  );
}

export default NavBar;
