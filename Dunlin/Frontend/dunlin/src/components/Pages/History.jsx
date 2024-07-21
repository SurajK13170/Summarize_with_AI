import React from 'react';
import './History.css';

const History = ({ summaries, fetchSummaryById, deleteSummaryById }) => {
  return (
    <div className="history-container">
      <h3>History</h3>
      {/* {console.log({ "data": summaries })} */}
      <ul className="history-list">
        {summaries.length === 0 ? (
          <p className="history-error">No History available.</p>
        ) : (
          summaries.map((item, index) => (
            <li key={index} className="history-item">
              <span onClick={() => fetchSummaryById(item._id)}>
                {item.originalText.length > 20 ? `${item.originalText.substring(0, 20)}...` : item.originalText}
              </span>
              <button 
                className="delete-button" 
                onClick={() => deleteSummaryById(item._id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default History;
