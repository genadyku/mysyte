const initState = {
  username: 'gena',
  isConfirm: false,
  email: null,
}

const CONNECT_USER = 'CONNECT_USER'
const CONNECT_USER_SUCCESS = 'CONNECT_USER_SUCCESS'
/*
export default (state = initState, action) => {



  if (action.type === 'AUT_REQUEST_CONFIRM_EMAL') {
    return {
      ...state,
      username: action.payload.username,
      email: action.payload.email,
    }
  }


  return state
}
*/
export default function(state = initState, action) {
  const { type } = action

  switch (type) {
    case CONNECT_USER:
      return {
        ...state,
        username: action.payload.data.user.username,
        email: action.payload.data.user.email,
        isConfirm: true,
      }
    case CONNECT_USER_SUCCESS:
      return {
        ...state,
      }

    default:
      return state
  }
}
