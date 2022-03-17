import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import * as actions from '../../actions';
import { SET_SHOW_SETTINGS } from '../../actions/types';
import { Button, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import Gravatar from 'react-gravatar';

function NavBarUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector(state => state);
  return (
    <Popover2
      placement='bottom-end'
      content={
        <Menu>
          <MenuItem
            icon='film'
            text='My Ratings'
            onClick={() => navigate('/myratings')}
          />
          <MenuItem
            icon='settings'
            text='Settings'
            onClick={() => dispatch({ type: SET_SHOW_SETTINGS, payload: true })}
          />
          <MenuDivider />
          <MenuItem
            icon='log-out'
            text='Logout'
            onClick={() => {
              dispatch(actions.logoutUser());
              navigate('/');
            }}
          />
        </Menu>
      }
    >
      <Button minimal>
        <Gravatar
          size={24}
          email={auth.email}
          default={auth.picture}
          style={{ borderRadius: '50%', marginRight: 8 }}
        />
        {auth.firstName}
      </Button>
    </Popover2>
  );
}

export default NavBarUser;
