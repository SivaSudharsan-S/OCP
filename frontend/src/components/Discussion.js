import React, { useState, useEffect } from 'react';
import InputSection from './InputSection';
import DiscussionList from './DiscussionList';
import RelatedDiscussions from './RelatedDiscussion';
import { useTheme } from './ThemeContext'; // Import the theme hook
import './css/Discussion.css';

const Discussion = () => {
  const [newDiscussion, setNewDiscussion] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [category, setCategory] = useState('general');
  const [privateDiscussion, setPrivateDiscussion] = useState(false);
  
  const { theme } = useTheme(); // Access the theme from the context

  // Hardcoded discussions data
  const hardcodedDiscussions = [
    { id: 1, text: 'Discussion 1', category: 'general', isPrivate: false, createdAt: new Date() },
    { id: 2, text: 'Discussion 2', category: 'general', isPrivate: false, createdAt: new Date() },
    // Add more hardcoded discussions as needed
  ];

  // Fetch discussions (hardcoded)
  useEffect(() => {
    setDiscussions(hardcodedDiscussions);
  }, []);

  // Add a new discussion (hardcoded)
  const addDiscussion = () => {
    if (newDiscussion.trim()) {
      const newDiscussionObj = {
        id: discussions.length + 1,
        text: newDiscussion,
        category,
        isPrivate: privateDiscussion,
        createdAt: new Date(),
      };
      setDiscussions([...discussions, newDiscussionObj]);
      setNewDiscussion('');
      setPrivateDiscussion(false);
    }
  };

  // Filter discussions by category
  const filterByCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className={`discussion-page ${theme}`}>
      <h2 className={theme}>Discussion Forum</h2>
      <InputSection 
        newDiscussion={newDiscussion} 
        setNewDiscussion={setNewDiscussion} 
        addDiscussion={addDiscussion} 
        privateDiscussion={privateDiscussion} 
        setPrivateDiscussion={setPrivateDiscussion} 
        filterByCategory={filterByCategory}
      />
      <DiscussionList discussions={discussions} category={category} />
      <RelatedDiscussions />
    </div>
  );
};

export default Discussion;