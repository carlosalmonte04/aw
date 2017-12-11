const initialState = {
  selectedFormat: 'report',
  parsedFile: null, // blob file
  rawFile: null, // raw file (used to copy json to clipboard)
  CSVToParse: null,
  fileName: null,
  json: null
}

export default function filesReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_PARSED_FILE_ON_STATE':
      return Object.assign({}, state, { parsedFile: action.payload })
    case 'SET_CSV_TO_PARSE_ON_STATE':
      return Object.assign({}, state, { CSVToParse: action.payload.CSVToParse, fileName: action.payload.fileName })
    case 'SET_JSON_ON_STATE':
      return Object.assign({}, state, { json: action.payload })
    case 'SET_RAW_FILE_ON_STATE':
      return Object.assign({}, state, { rawFile: action.payload })
    case 'RESET_PARSER':
      return initialState
    case 'CHANGE_SELECTED_FORMAT':
      return Object.assign({}, state, { selectedFormat: action.payload })
    default:
      return state
  }
}