const initialState = {
  parsedFile: null,
  fileToParse: null
}

export default function filesReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_PARSED_FILE_ON_STATE':
      console.log("GOT TO REDUCER WITH FILE PARSED FILE", action.payload)
      return Object.assign({}, state, { parsedFile: action.payload })
    case 'SET_FILE_TO_PARSE_ON_STATE':
      console.log("GOT TO REDUCER WITH FILE", action.payload)
      return Object.assign({}, state, { fileToParse: action.payload })
    default:
      return state
  }
}