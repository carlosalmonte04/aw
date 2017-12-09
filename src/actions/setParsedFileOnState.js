export default function setFileOnState(file) {
  return {
    type: 'SET_PARSED_FILE_ON_STATE',
    payload: file
  }
}