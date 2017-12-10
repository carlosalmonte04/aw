import setJSONOnState from './setJSONOnState'

export default function getJSONForClipboard(fileToParse) {

  return (dispatch) => {
    const requestParams = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file_to_parse: fileToParse,
        selected_format: 'raw_json'
      })
    }
    return fetch(process.env.REACT_APP_API_URL + 'csv_parser/', requestParams)
      .then(res => res.json())
      .then(json => {
        dispatch(setJSONOnState(json))
        return json
      })
  }

}
