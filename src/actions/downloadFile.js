import fileDownload from 'js-file-download'

export default function downloadFile(parsedFile) {
  return dispatch => fileDownload(parsedFile, 'parsed-report.pdf', 'application/pdf')
}