import React, { useState, useEffect } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [mediaList, setMediaList] = useState([]);

  // Fetch media files from the backend when the component loads
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('http://localhost:5001/api');
        const data = await response.json();
        console.log(data,"data")
        setMediaList(data);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchMedia();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('media', file);

    try {
      const response = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        body: formData,
      });
      const newMedia = await response.json();
      setMediaList((prev) => [...prev, newMedia]); // Add new media to the list
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };



  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/${id}`, {
        method: 'DELETE',
      });
      // Remove deleted media from the list
      setMediaList((prev) => prev.filter((media) => media._id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };



  return (
    <div>
    <input type="file" onChange={handleFileChange} accept="image/*,video/*" />
    <button onClick={handleUpload}>Upload</button>
    <div>
      {mediaList.map((media) => (
        <div key={media._id} style={{ margin: '10px', display: 'inline-block' }}>
          {media.type === 'image' ? (
            <img src={`/${media.path}`} alt={media.filename} style={{ width: '200px' }} />
          ) : (
            <video src={`/${media.path}`} controls style={{ width: '200px' }} />
          )}
          <button onClick={() => handleDelete(media._id)} style={{ display: 'block', marginTop: '5px' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
  );
};

export default FileUpload;
