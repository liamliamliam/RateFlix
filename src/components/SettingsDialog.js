import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Classes, FormGroup, InputGroup, Intent, Switch, Button } from '@blueprintjs/core';
import { Row, Col } from 'antd';
import * as actions from '../actions';
import { SET_SHOW_SETTINGS } from '../actions/types';

function SettingsDialog() {
  const dispatch = useDispatch();
  const { auth, darkMode, showSettings } = useSelector(state => state);
  //console.log('SettingsDialog - auth:', auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [darkModeChecked, setDarkModeChecked] = useState(darkMode);
  useEffect(() => {
    if (auth) {
      setFirstName(auth.firstName);
      setLastName(auth.lastName);
      setEmail(auth.email);
      setDarkModeChecked(auth.darkMode);
    }
  }, [auth, setFirstName, setLastName, setEmail, setDarkModeChecked]);
  
  const handleSave = () => {
    console.log('Saving settings...');
    dispatch(actions.updateUser({ firstName, lastName, email, darkMode: darkModeChecked }));
    dispatch({ type: SET_SHOW_SETTINGS, payload: false });
    document.body.classList[darkModeChecked ? 'add' : 'remove']('bp3-dark');
  };
  return (
    <Dialog
      title='Settings'
      isOpen={showSettings}
      onClose={() => dispatch({ type: SET_SHOW_SETTINGS, payload: false })}
    >
      <div className={Classes.DIALOG_BODY} style={{ padding: '16px' }}>
        <Row gutter={16}>
          <Col span={12}>
            <FormGroup label='First Name' labelFor='first-name'>
              <InputGroup id='first-name' value={firstName} onChange={e => setFirstName(e.target.value)} />
            </FormGroup>
          </Col>
          <Col span={12}>
            <FormGroup label='Last Name' labelFor='last-name'>
              <InputGroup id='last-name' value={lastName} onChange={e => setLastName(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormGroup label='Email' labelFor='email'>
              <InputGroup id='email' value={email} onChange={e => setEmail(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'center', paddingTop: 16 }}>
            <Switch
              checked={darkModeChecked}
              labelElement={<strong>Dark Mode</strong>}
              onChange={(e) => setDarkModeChecked(e.target.checked)}
            />
          </Col>
        </Row>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button intent={Intent.PRIMARY} onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default SettingsDialog;
