import setParsedFileOnState from './setParsedFileOnState'
import setRawFileOnState from './setRawFileOnState'

export default function parseFile(fileToParse, selectedFormat) {
  return (dispatch) => {
    const requestParams = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file_to_parse: fileToParse,
        selected_format: selectedFormat
      })
    }
    return fetch(process.env.REACT_APP_API_URL + 'csv_parser/', requestParams)
      .then(res => res.blob())
      .then(fileBlob => {
        const parsedFile = new Blob([fileBlob], { type: "application/pdf" })

        dispatch(setRawFileOnState(fileToParse)) // save raw to copy to clipboard
        dispatch(setParsedFileOnState(parsedFile)) // save blob to see/download

        return parsedFile
      })
  }

}