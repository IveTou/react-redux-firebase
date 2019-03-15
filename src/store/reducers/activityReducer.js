const initState = {
  updateError: null,
};

const activityReducer = (state = initState, action) => {
  switch(action.type) {
    case 'STATUS_UPDATE_SUCCESS':
      console.log('Status update sucess');
      return {
        ...state,
        updateError: null,
      }
    case 'STATUS_UPDATE_ERROR':
      console.log('Status update error');
      return {
        ...state,
        authError: 'Status update failed'
      }
      case 'CREATE_USER_SUCCESS':
        console.log('Create user sucess');
        return {
          ...state,
          updateError: null,
        }
      case 'DELETE_USER_SUCCESS':
        console.log('Delete user sucess');
        return {
          ...state,
          authError: null
        }
    default:
      return state;
  }
}

export default activityReducer;