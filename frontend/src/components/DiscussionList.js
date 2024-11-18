import React from 'react';
import DiscussionItem from './DiscussionItem';
import './css/Discussion.css';
import { useTheme } from './ThemeContext'; // Import the theme hook

const DiscussionList = ({ discussions, category }) => {
  const { theme } = useTheme(); // Access the theme from the context

  return (
    <ul className={`discussion-list ${theme}`}>
      {discussions
        .filter((discussion) => discussion.category === category)
        .map((discussion) => (
          <DiscussionItem key={discussion.id} discussion={discussion} />
      ))}
    </ul>
  );
};

export default DiscussionList;
