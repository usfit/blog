function MyError(message) {
  this.name = 'MyError';
  this.message = message || 'Ошибка. Перезагрузите страницу и попробуйте еще раз.';
  this.stack = new Error().stack;
}

export default function getResponse(url, method = 'GET', body = null, token = null) {
  const baseUrl = 'https://blog.kata.academy/api/';
  return fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body,
  })
    .then((res) => {
      if (!res.ok) {
        switch (res.status) {
          case 422:
            if (url === 'users' || url === 'user') {
              throw new MyError('Такой пользователь уже существует');
            }
            throw new MyError('Неправильный логин или пароль');
          default:
            throw new MyError();
        }
      }
      if (method === 'DELETE' && res.status === 204) {
        return res.ok;
      }
      return res.json();
    })
    .then((ans) => ans)
    .catch((err) => {
      throw err;
    });
}
