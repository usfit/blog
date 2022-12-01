import React from 'react';
import { Alert } from 'antd';

function ErrorMessage() {
  const message = 'Ошибка. Перезагрузите страницу и попробуйте еще раз.';
  return <Alert message="Error" description={message} type="error" showIcon />;
}

export default ErrorMessage;
