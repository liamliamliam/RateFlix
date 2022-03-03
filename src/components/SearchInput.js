import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { InputGroup, Icon } from '@blueprintjs/core';
import { SET_SEARCH_STRING } from '../actions/types';

function SearchInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchString } = useSelector(state => state);
  return (
    <InputGroup
      value={searchString}
      leftElement={<Icon icon='search' />}
      placeholder='Search Movies...'
      onChange={e =>
        dispatch({ type: SET_SEARCH_STRING, payload: e.target.value })
      }
      onKeyUp={e => {
        if (e.key === 'Enter') {
          navigate(`/search/${e.target.value}`);
        }
      }}
    />
  );
}

export default SearchInput;
