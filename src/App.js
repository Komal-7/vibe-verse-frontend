import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Moods and Activities
const MOODS = ['Happy', 'Calm', 'Energetic', 'Sad', 'Relaxed'];
const ACTIVITIES = ['Workout', 'Study', 'Party', 'Meditation', 'Driving'];

// Custom Combinations with Descriptive Titles
const CUSTOM_COMBINATIONS = [
  'Intense focus for study',
  'Peaceful joy in meditation',
  'Bright energy for driving',
  'Deep calm in meditation practice',
  'High energy for workout sessions',
  'Vibrant energy for party time',
  'Light effort during workout',
  'Easy focus during study time',
  'Relaxed ride for driving through nature',
];

function App() {
  const [selectedChip, setSelectedChip] = useState('');
  const [filterType, setFilterType] = useState('shuffled'); // 'shuffled' or 'popularity'
  const [recommendations, setRecommendations] = useState([]);

  // Fetch recommendations when a chip is selected or filter type changes
  useEffect(() => {
    if (selectedChip) {
      fetchRecommendations(selectedChip, filterType);
    }
  }, [filterType]);

  // Function to handle chip selection
  const handleChipClick = (chip) => {
    setSelectedChip(chip);
    fetchRecommendations(chip, filterType);
  };

  // Fetch recommendations
  const fetchRecommendations = async (chip, type) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/recommend', {
        filter: chip,
        filterType: type,
      },{
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Music Recommendation System</h1>

      {/* Filter for Shuffle or Popularity */}
      <div style={{ marginBottom: '20px' }}>
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

      <div style={{ display: 'flex', width: '98%', marginTop: '20px' }}>
        {/* Left Side: Chips */}
        <div style={{ flex: 1, padding: '10px', textAlign: 'center' }}>
          <h2>Select a Mood</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {MOODS.map((mood, index) => (
              <button
                key={index}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '20px',
                  background: mood === selectedChip ? '#4caf50' : '#f1f1f1',
                  color: mood === selectedChip ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
                onClick={() => handleChipClick(mood)}
              >
                {mood}
              </button>
            ))}
          </div>

          <h2>Select an Activity</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {ACTIVITIES.map((activity, index) => (
              <button
                key={index}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '20px',
                  background: activity === selectedChip ? '#4caf50' : '#f1f1f1',
                  color: activity === selectedChip ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
                onClick={() => handleChipClick(activity)}
              >
                {activity}
              </button>
            ))}
          </div>

          <h2>Custom Combinations</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {CUSTOM_COMBINATIONS.map((combo, index) => (
              <button
                key={index}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '20px',
                  background: combo === selectedChip ? '#4caf50' : '#f1f1f1',
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
          <h2>Recommendations</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Track Name</th>
                <th style={tableHeaderStyle}>Artist Name</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                  <tr key={index}>
                    <td style={tableCellStyle}>{rec.trackName}</td>
                    <td style={tableCellStyle}>{rec.artistName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={tableCellStyle} colSpan="2">
                    No recommendations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
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
