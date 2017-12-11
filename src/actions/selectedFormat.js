export default function changeSelectedFormat(selectedFormat) {
  return {
    type: 'CHANGE_SELECTED_FORMAT',
    payload: selectedFormat
  }
}