export default function setJSONOnState(json) {
  return {
    type: 'SET_JSON_ON_STATE',
    payload: json
  }
}