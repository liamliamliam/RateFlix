import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  FormGroup,
  InputGroup,
  Button,
  Divider
} from '@blueprintjs/core';
import { Row, Col } from 'antd';
import { setTheme } from '../../../helpers';

function LoginPage() {
  const { darkMode } = useSelector((state) => state);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const LoginRowDivider = () => {
    return <Divider style={{ margin: '16px 0 16px 0' }} />;
  };
  return (
    <Row>
      <Col xl={6} offset={9}>
        <Card className={`${setTheme(darkMode)}`}>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <h1 className={`${setTheme(darkMode)}`}>Login</h1>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <span className='bp3-text-small'>
                Please login in with your email and password below, or you can
                use your google account.
              </span>
            </Col>
          </Row>
          <LoginRowDivider />
          <Row>
            <Col span={24}>
              <FormGroup label='Email' labelFor='email'>
                <InputGroup
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormGroup label='Password' labelFor='password'>
                <InputGroup
                  id='password'
                  value={password}
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Button fill>Login</Button>
            </Col>
          </Row>
          <LoginRowDivider />
          <Row>
            <Col span={24}>
              <Button
                fill
                onClick={() => {
                  window.location.href = '/auth/google';
                }}
              >
                Login with Google
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default LoginPage;
