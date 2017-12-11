export default function setCSVToParseOnState(CSVToParse, fileName) {
  return {
    type: 'SET_CSV_TO_PARSE_ON_STATE',
    payload: {
      CSVToParse, fileName
    }
  }
}
