import React from 'react';
import { useTheme } from './ThemeContext'; // Import the useTheme hook
import './css/Contest.css';

const Contest = () => {
  const { theme } = useTheme(); // Access the theme from the hook

  return (
    <div className={`contest-page ${theme}`}>
      <h2 className={theme}>Contests</h2>

      {/* Upcoming and Past Contests Section */}
      <div className={`contests-section ${theme}`}>
        <h3 className={theme}>Upcoming and Past Contests</h3>
        <p className={theme}>List of upcoming and past contests...</p>
      </div>

      {/* Practice Contests Section */}
      <div className={`practice-contests ${theme}`}>
        <h3 className={theme}>Practice Contests</h3>
        <p className={theme}>
          Offer practice contests to allow users to test their skills and get familiar with the platform's contest mechanics before participating in competitive events.
        </p>
      </div>

      {/* Leaderboard Section */}
      <div className={`leaderboard ${theme}`}>
        <h3 className={theme}>Leaderboard</h3>
        <table>
          <thead>
            <tr>
              <th className={theme}>Rank</th>
              <th className={theme}>Username</th>
              <th className={theme}>Score</th>
              <th className={theme}>Contests Attended</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample data, can be dynamically generated */}
            <tr>
              <td className={theme}>1</td>
              <td className={theme}>Sakthi Kumaran</td>
              <td className={theme}>0</td>
              <td className={theme}>0</td>
            </tr>
            <tr>
              <td className={theme}>2</td>
              <td className={theme}>Velavan</td>
              <td className={theme}>0</td>
              <td className={theme}>0</td>
            </tr>
            <tr>
              <td className={theme}>3</td>
              <td className={theme}>Sahilashwar</td>
              <td className={theme}>0</td>
              <td className={theme}>0</td>
            </tr>
            <tr>
              <td className={theme}>4</td>
              <td className={theme}>Siva</td>
              <td className={theme}>0</td>
              <td className={theme}>0</td>
            </tr>
            <tr>
              <td className={theme}>5</td>
              <td className={theme}>Mugundhan</td>
              <td className={theme}>0</td>
              <td className={theme}>0</td>
            </tr>
            {/* More entries */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contest;
