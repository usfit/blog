import React from 'react';
import { Alert } from 'antd';

function ErrorMessage({ message }) {
  return <Alert message="Error" description={message} type="error" showIcon />;
}

export default ErrorMessage;
