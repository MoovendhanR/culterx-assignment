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
        console.log(data, "data");
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
    // e.prventDefault()
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
    console.log(id)
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
    <div style={styles.container}>
      <h2 style={styles.title}>Media Upload</h2>
      <div style={styles.uploadSection}>
        <input type="file" onChange={handleFileChange} accept="image/*,video/*" style={styles.fileInput} />
        <button onClick={handleUpload} style={styles.uploadButton}>Upload</button>
      </div>
      <div style={styles.mediaGrid}>
        {mediaList?.map((media) => (
          <div key={media._id} style={styles.mediaItem}>
            {media?.type === 'image' ? (
              <img src={require(`../images/${media?.filename}`)} alt={media?.filename} style={styles.mediaPreview} />
            ) : (
              <video src={`/${media?.path}`} controls style={styles.mediaPreview} />
            )}
            <button onClick={() => handleDelete(media?._id)} style={styles.deleteButton}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  uploadSection: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginBottom: '20px',
  },
  fileInput: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
  uploadButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  mediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
    width: '100%',
  },
  mediaItem: {
    position: 'relative',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  mediaPreview: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  deleteButton: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default FileUpload;
