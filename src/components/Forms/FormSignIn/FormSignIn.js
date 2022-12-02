import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

function FormSignIn() {
  return (
    <div className="formsSign">
      <h5 className="FormSign__title">Sign In</h5>
      <Form layout="vertical">
        <Form.Item name="Email_address" label="Email address">
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item name="Password" label="Password">
          <Input placeholder="Password" />
        </Form.Item>
        <Form.Item className="formButton">
          <Button type="primary">Login</Button>
        </Form.Item>
      </Form>
      <p className="formLink">
        Don’t have an account?
        <Link to="/sign-up"> Sign Up</Link>
      </p>
    </div>
  );
}

export default FormSignIn;
