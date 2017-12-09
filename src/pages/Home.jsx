import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class Home extends Component {

  onDrop(acceptedFiles, rejectedFiles) {
    const reader = new FileReader()

    const fileInfo = acceptedFiles[0]

    reader.onload = () => {
      const fileAsBinaryString = reader.result

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')

      const requestParams = {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fileInfo.name,
          data: fileAsBinaryString
        })
      }

      fetch(process.env.REACT_APP_API_URL + 'csv_parser/', requestParams)
        .then(res => res.json())
        .then(data => console.log("data", data))
      // const req = request.post('/upload');
      // acceptedFiles.forEach(file => {
      //     req.attach(file.name, file);
      // });
      // req.end(callback);
    }

    reader.readAsBinaryString(acceptedFiles[0])
  }

  render() {
    return (
      <div className="Home">
        <h1>CSV Parser</h1>
        <Dropzone onDrop={this.onDrop}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
      </div>
    );
  }
}

export default Home;
