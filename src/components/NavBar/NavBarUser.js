import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions';
import { SET_SHOW_SETTINGS } from '../../actions/types';
import { Button, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { Popover2 } from '@blueprintjs/popover2';

function NavBarUser() {
  const dispatch  = useDispatch();
  const { auth } = useSelector(state => state);
  return (
    <Popover2
      content={
        <Menu>
          <MenuItem icon='film' text='My Ratings' />
          <MenuItem icon='settings' text='Settings' onClick={() => dispatch({ type: SET_SHOW_SETTINGS, payload: true })} />
          <MenuDivider />
          <MenuItem icon='log-out' text='Logout' onClick={() => dispatch(actions.logoutUser())} />
        </Menu>
      }
    >
      <Button minimal icon='user'>{auth.firstName}</Button>
    </Popover2>
  );
}

export default NavBarUser;
