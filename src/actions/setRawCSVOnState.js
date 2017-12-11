export default function setRawCSVOnState(file) {
  return {
    type: 'SET_RAW_FILE_ON_STATE',
    payload: file
  }
}