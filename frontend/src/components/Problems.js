import React from 'react';
import { Link } from 'react-router-dom';
import './css/Problems.css';
import { useTheme } from './ThemeContext'; // Import the useTheme hook

const Problems = () => {
    const { theme } = useTheme(); // Access the theme from the hook

    const problemList = [
        { id: 1, title: 'Two Sum', difficulty: 'Easy' },
        { id: 2, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium' },
        { id: 3, title: 'Merge Two Sorted Lists', difficulty: 'Easy' },
        { id: 4, title: 'Valid Parentheses', difficulty: 'Easy' },
        { id: 5, title: 'Maximum Subarray', difficulty: 'Easy' },
        { id: 6, title: 'Search in Rotated Sorted Array', difficulty: 'Medium' },
        { id: 7, title: 'Group Anagrams', difficulty: 'Medium' },
        { id: 8, title: 'Top K Frequent Elements', difficulty: 'Medium' },
        { id: 9, title: 'Longest Palindromic Substring', difficulty: 'Medium' },
        { id: 10, title: 'Coin Change', difficulty: 'Medium' }
    ];

    return (
        <div className={`problems-container ${theme}`}>
            <h2>Problems</h2>
            <ul className="problems-list">
                {problemList.map((problem) => (
                    <li key={problem.id} className={theme}>
                        <Link to={`/problems/${problem.id}`} className={theme}>
                            {problem.title} - {problem.difficulty}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Problems;
