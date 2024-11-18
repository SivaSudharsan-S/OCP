import React from 'react';
import './css/Discussion.css';
import { useTheme } from './ThemeContext'; // Import the theme hook

const DiscussionItem = ({ discussion }) => {
  const { theme } = useTheme(); // Access the theme from the context

  return (
    <li className={`discussion-item ${theme}`}>
      {discussion.text}
      {discussion.isPrivate && <span className={`private-tag ${theme}`}>Private</span>}
    </li>
  );
};

export default DiscussionItem;
