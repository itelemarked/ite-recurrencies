
export type Request =
| {
    type: 'logout'
  }
| {
    type: 'login',
    data: {
      username: string,
      password: string
    }
  }
| {
    type: 'signup',
    data: {
      username: string,
      password: string
    }
  }
