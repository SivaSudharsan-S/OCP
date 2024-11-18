import React from 'react';
import './css/Discussion.css';
import { useTheme } from './ThemeContext'; // Import the theme hook

const InputSection = ({ 
  newDiscussion, 
  setNewDiscussion, 
  addDiscussion, 
  privateDiscussion, 
  setPrivateDiscussion, 
  filterByCategory 
}) => {
  const { theme } = useTheme(); // Access the theme from the context
  
  return (
    <div className={`input-section ${theme}`}>
      <input
        type="text"
        value={newDiscussion}
        onChange={(e) => setNewDiscussion(e.target.value)}
        placeholder="Ask a question..."
        className={`discussion-input ${theme}`} // Apply theme to input
      />
      <button onClick={addDiscussion} className={`post-button ${theme}`}>Post</button>

      <div className={`private-checkbox ${theme}`}> {/* Apply theme to checkbox container */}
        <label>
          <input
            type="checkbox"
            checked={privateDiscussion}
            onChange={(e) => setPrivateDiscussion(e.target.checked)}
            className={theme} // Optional: apply theme class to checkbox if needed
          />
          Private Discussion
        </label>
      </div>

      <div className={`category-section ${theme}`}>
        <button onClick={() => filterByCategory('general')} className={`category-button ${theme}`}>General</button>
        <button onClick={() => filterByCategory('interview')} className={`category-button ${theme}`}>Interview</button>
        <button onClick={() => filterByCategory('system-design')} className={`category-button ${theme}`}>System Design</button>
      </div>
    </div>
  );
};

export default InputSection;
