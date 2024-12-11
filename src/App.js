import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './Navbar.js';
import Modal from './Modal.js';

// Moods and Activities
const MOODS = ['happy', 'calm', 'energetic', 'sad', 'relaxed', 'romantic', 'melancholic'];
const ACTIVITIES = ['workout', 'study', 'party', 'meditation', 'driving', 'relaxing', 'surprise me'];
const CUSTOM_COMBINATIONS = [
  'bright energy for driving',
  'deep calm in meditation practice',
  'high energy for workout sessions',
  'romantic with low tempo',
  'melancholic with acoustic feel',
  'vibrant energy for party time',
  'light effort during workout',
  'easy focus during study time',
  'relaxed ride for driving through nature',
];

const CUSTOM_QUERIES = [
  'Get all artist names',
  'All albums of Coldplay',
  "Get Count and Avg Popularity of Taylor Swift's tracks for each Album",
  "Rewind to the 2000s",
  "Same Energy as song Calm Down"
];

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState('');
  const [filterType, setFilterType] = useState('shuffled'); // 'shuffled' or 'popularity'
  const [recommendations, setRecommendations] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Fetch recommendations when a chip is selected or filter type changes
  useEffect(() => {
    if (selectedChip) {
      fetchRecommendations(selectedChip, filterType);
    }
  }, [filterType]);

  // Function to handle chip selection
  const handleChipClick = (chip) => {
    const lowerCaseChip = chip.toLowerCase(); // Convert to lowercase
    setSelectedChip(lowerCaseChip);
  
    if (lowerCaseChip === 'surprise me') {
      fetchSurprise(); // Call the Surprise Me API
    } else {
      fetchRecommendations(lowerCaseChip, filterType);
    }
  };
    
  const handleQueryChipClick = (chip) => {
    setSelectedChip(chip);
    fetchQueryRecommendations(chip);
  };

  // Fetch recommendations
  const fetchRecommendations = async (chip, type) => {
    try {
      console.log("Selected Filter:", chip, "Filter Type:", type); // Log the filter
      const response = await axios.post('http://127.0.0.1:5000/api/recommend', {
        filter: chip,
        filterType: type,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('API Response:', response.data); // Log the API response
      setCurrentQuery(response.data.query || '');
      setRecommendations(response.data.recommendations || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations([]); // Ensure recommendations is always an array
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search query.');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/search', {
        query: searchQuery,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Search Results:', response.data);
      setRecommendations(response.data); // Update recommendations with search results
    } catch (error) {
      console.error('Error executing search:', error);
    }
  };  

  const fetchQueryRecommendations = async (chip) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/custom-query', {
        filter: chip,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setCurrentQuery(response.data.query);
      setRecommendations(response.data.recommendations || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations([]); // Ensure recommendations is always an array
    }
  };

  const fetchSurprise = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/surprise');
      console.log('Surprise Song:', response.data);
      setRecommendations(response.data); 
    } catch (error) {
      console.error('Error fetching surprise song:', error);
      setRecommendations([]);
    }
  };  

  return (
    <div>
      <Navbar />

      {/* Filter for Shuffle or Popularity */}
      <div style={{ margin: '20px', textAlign: 'center' }}>
        <label>
          <input
            type="radio"
            name="filterType"
            value="shuffled"
            checked={filterType === 'shuffled'}
            onChange={() => setFilterType('shuffled')}
          />
          Shuffled Recommendations
        </label>
        <label style={{ marginLeft: '20px' }}>
          <input
            type="radio"
            name="filterType"
            value="popularity"
            checked={filterType === 'popularity'}
            onChange={() => setFilterType('popularity')}
          />
          Popularity-Based Recommendations
        </label>
      </div>

      <div style={{ margin: '20px', textAlign: 'center' }}>
        <input
              type="text"
              placeholder="Search by song or artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '10px',
                width: '60%',
                marginRight: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
          />
        <button
              onClick={handleSearch}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2392db',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Search
        </button>
      </div>

      <div style={{ display: 'flex', width: '98%', marginTop: '20px' }}>
        {/* Left Side: Chips */}
        <div style={{ flex: 1, padding: '10px', textAlign: 'center' }}>
          <h3>Select a Mood</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {MOODS.map((mood, index) => (
              <button
                key={index}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '20px',
                  background: mood === selectedChip ? '#2392db' : '#f1f1f1',
                  color: mood === selectedChip ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
                onClick={() => handleChipClick(mood)}
              >
                {mood}
              </button>
            ))}
          </div>

          <h3>Select an Activity</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {ACTIVITIES.map((activity, index) => (
              <button
                key={index}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '20px',
                  background: activity.toLowerCase()  === selectedChip ? '#2392db' : '#f1f1f1',
                  color: activity.toLowerCase()  === selectedChip ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
                onClick={() => handleChipClick(activity)}
              >
                {activity}
              </button>
            ))}
          </div>

          <h3>Custom Combinations</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {CUSTOM_COMBINATIONS.map((combo, index) => (
              <button
                key={index}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '20px',
                  background: combo === selectedChip ? '#2392db' : '#f1f1f1',
                  color: combo === selectedChip ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
                onClick={() => handleChipClick(combo)}
              >
                {combo}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Recommendations */}
        <div
          style={{
            flex: 1,
            padding: '10px',
            maxHeight: '650px',
            overflowY: 'scroll',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Recommendations</h2>
            <button className="open-modal-btn" onClick={openModal}>Show Query</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {recommendations && recommendations.length > 0 && Object.keys(recommendations[0]).map((col, index) => (
                  <th key={index} style={tableHeaderStyle}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                  <tr key={index}>
                    {Object.keys(rec).map((key, colIndex) => (
                      <td key={colIndex} style={tableCellStyle}>{rec[key]}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={tableCellStyle} colSpan="2">
                    No recommendations found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} stateValue={currentQuery} onClose={closeModal} />
    </div>
  );
}

const tableHeaderStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  background: '#f9f9f9',
  textAlign: 'left',
};

const tableCellStyle = {
  border: '1px solid #ccc',
  padding: '10px',
};

export default App;