import React, { useState } from 'react';
import {
  Card,
  FormGroup,
  InputGroup,
  Button,
  Divider
} from '@blueprintjs/core';
import { Row, Col } from 'antd';
import { GC } from '../../../helpers';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
              <Col span={24}>
                <span className='bp3-text-small'>
                  Currently we only allow logging in via Google.
                </span>
              </Col>
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
