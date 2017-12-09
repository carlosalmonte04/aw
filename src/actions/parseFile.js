import setParsedFileOnState from './setParsedFileOnState'

export default function parseFile(fileToParse) {
  return (dispatch) => {
    const requestParams = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: fileToParse
      })
    }

    return fetch(process.env.REACT_APP_API_URL + 'csv_parser/', requestParams)
      .then(res => res.blob())
      .then(fileBlob => {
        const parsedFile = new Blob([fileBlob], { type: "application/pdf" })
        dispatch(setParsedFileOnState(parsedFile))
        return parsedFile
      })
  }

}