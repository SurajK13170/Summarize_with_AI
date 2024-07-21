import React, { useState, useCallback, useEffect } from 'react';
import History from './History';
import './FileUpload.css';
import loadingGif from './Animation.gif'; // Import your GIF here

const FileUpload = () => {
  let token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
  }
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    // Fetch the history when the component mounts
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:8080/upload/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setSummaries(data);
        } else {
          setError(data.error || 'Error fetching history.');
        }
      } catch (error) {
        setError('Error fetching history. Please try again.');
        console.error(error);
      }
    };

    fetchHistory();
  }, [token]);

  const handleFileChange = useCallback((e) => {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSummary('');
    setLoading(true);

    if (!file && !text) {
      setError('Please select a file or enter text to upload.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    if (text) {
      formData.append('text', text);
    }

    try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setSummary(data.post);
        setSummaries([...summaries, { id: data._id, originalText: text, summary: data.post }]);
        setError('');
      } else {
        setError(data.error || 'Error uploading content. Please try again.');
      }
    } catch (error) {
      setError('Error uploading content. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummaryById = async (_id) => {
    try {
      const response = await fetch(`http://localhost:8080/upload/history/${_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data,"hee");
        setSummary(data.summarizedText);
      } else {
        setError(data.error || 'Error fetching summary.');
      }
    } catch (error) {
      setError('Error fetching summary. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <History summaries={summaries} fetchSummaryById={fetchSummaryById} />
      <div className="form-container">
        <h1 className="title">Upload File or Enter Text for Summarization</h1>
        <form onSubmit={handleSubmit} className="upload-form">
          <div
            className={`dropzone ${file ? 'file-selected' : ''}`}
            onClick={() => document.getElementById('file-input').click()}
          >
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <p>{file ? `File selected: ${file.name}` : 'click here to upload a file'}</p>
          </div>

          <textarea
            placeholder="Enter text here..."
            value={text}
            onChange={handleTextChange}
            className="text-input"
          />

          <button type="submit" className="submit-button">Summarize</button>
        </form>
        {loading && <div className="loading"><img src={loadingGif} alt="Loading..." /></div>}
        {error && <p className="error-message">{error}</p>}
        {summary && (
          <div className="summary-container">
            <h2 className="success-message">Summarized Content</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
