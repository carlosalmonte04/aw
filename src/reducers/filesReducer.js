const initialState = {
  parsedFile: null, // blob file
  rawFile: null, // raw file (used to copy json to clipboard)
  fileToParse: null,
  fileName: null,
  json: null
}

export default function filesReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_PARSED_FILE_ON_STATE':
      return Object.assign({}, state, { parsedFile: action.payload })
    case 'SET_FILE_TO_PARSE_ON_STATE':
      return Object.assign({}, state, { fileToParse: action.payload.file, fileName: action.payload.fileName })
    case 'SET_JSON_ON_STATE':
      return Object.assign({}, state, { json: action.payload })
    case 'SET_RAW_FILE_ON_STATE':
      return Object.assign({}, state, { rawFile: action.payload })
    case 'RESET_PARSER':
      return initialState
    default:
      return state
  }
}