import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCode, faTrophy, faComment, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import ThemeToggleButton from './ThemeToggleButton'; // Import the new toggle button
import './css/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Online Coding Platform</h2>
      <ul>
        <li>
          <Link to="/home">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
        </li>
        <li>
          <Link to="/problems">
            <FontAwesomeIcon icon={faCode} /> Problems
          </Link>
        </li>
        <li>
          <Link to="/contests">
            <FontAwesomeIcon icon={faTrophy} /> Contests
          </Link>
        </li>
        <li>
          <Link to="/discussions">
            <FontAwesomeIcon icon={faComment} /> Discussions
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} /> Profile
          </Link>
        </li>
        <li>
          <Link to="/login">
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Link>
        </li>
        <li>
          <ThemeToggleButton /> {/* Insert the toggle button here */}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
