import React from 'react';
import { Form, Input, Checkbox, Button, Divider } from 'antd';
import { Link } from 'react-router-dom';

function FormSignUp() {
  return (
    <div className="formsSign">
      <h5 className="FormSign__title">Create new account</h5>
      <Form layout="vertical">
        <Form.Item name="username" label="Username">
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="Email_address" label="Email address">
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item name="Password" label="Password">
          <Input placeholder="Password" />
        </Form.Item>
        <Form.Item name="Repeat_Password" label="Repeat Password">
          <Input placeholder="Repeat Password" />
        </Form.Item>
        <Divider />
        <Form.Item className="personalInformation" name="Personal_information">
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>
        <Form.Item className="formButton">
          <Button type="primary">Create</Button>
        </Form.Item>
      </Form>
      <p className="formLink">
        Already have an account?
        <Link to="/sign-in"> Sign In.</Link>
      </p>
    </div>
  );
}

export default FormSignUp;
