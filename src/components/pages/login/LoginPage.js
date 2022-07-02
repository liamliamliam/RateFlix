import React, { useState, useEffect } from 'react';
import {
  Card,
  FormGroup,
  InputGroup,
  Button,
  Divider
} from '@blueprintjs/core';
import { Row, Col } from 'antd';

import { backend } from '../../../axiosConfig';
import { GC } from '../../../helpers';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => {
      setEmail('');
      setPassword('');
    }
  });

  const login = () => {
    backend.get('/auth/login');
  }

  const LoginRowDivider = () => {
    return <Divider style={{ margin: '16px 0 16px 0' }} />;
  };
  return (
    <div className='rf-page-container'>
      <Row>
        <Col xl={6} offset={9}>
          <Card>
            <Row>
              <Col span={24} style={{ textAlign: 'center' }}>
                <h1>Login</h1>
              </Col>
            </Row>
            <Row>
              <p>For this site I'm only allowing social logins so as not to 
              have to store credentials myself. I will be adding 
              different social logins in the future.</p>
              <p>For now, please login with your Google account.</p>
            </Row>
            <LoginRowDivider />
            <Row>
              <Col span={24}>
                <Button
                  fill
                  onClick={() => {
                    window.location.href = `${GC.domains.server.now()}/auth/google`;
                  }}
                >
                  Login with Google
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
