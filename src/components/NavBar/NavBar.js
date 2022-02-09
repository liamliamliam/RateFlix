import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Alignment, Button, Navbar, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import { Link } from 'react-router-dom';
import { setTheme } from '../../helpers';
import SearchInput from '../SearchInput';
import NavBarUser from './NavBarUser';
import { SET_DARK_MODE } from '../../actions/types';

function NavBar() {
  const dispatch = useDispatch();
  const { auth, darkMode, searchString } = useSelector(state => state);
  useEffect(() => {
    if (auth) dispatch({ type: SET_DARK_MODE, payload: auth.darkMode });
  }, [auth, dispatch, SET_DARK_MODE]);
  //console.log('Navbar - auth:', auth);
  const setMode = () => {  }
  
  
  //console.log('Navbar - searchString:', searchString);
  const location = useLocation();
  const navigate = useNavigate();
  const showBackToSearch = !!searchString && location.pathname.substring(0, 8) !== '/search/';
  return (
    <Navbar fixedToTop className={`${setTheme(darkMode)}`}>
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
