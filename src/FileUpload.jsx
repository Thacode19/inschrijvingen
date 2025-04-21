import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await axios.post('http://localhost:3001/upload', formData);
      alert('Upload succesvol! URL: ' + res.data.url);
    } catch (err) {
      console.error(err);
      alert('Upload mislukt.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
