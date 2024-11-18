import React from 'react';
import './css/Home.css';

const Home = () => {
  return (
    <div className="main-content">
      <h1>Welcome Back, User</h1>

      {/* Platform Overview */}
      <section className="section overview">
        <h2>Platform Overview</h2>
        <p>
          Our platform offers a wide range of coding problems, contests, and community-driven discussions to enhance your coding skills. Whether you're preparing for interviews or simply want to improve your coding knowledge, we’ve got you covered!
        </p>
      </section>

      {/* Problem Sets */}
      <section className="section problem-sets">
        <h2>Problem Sets</h2>
        <ul>
          <li>Easy: Introduction to Programming</li>
          <li>Medium: Data Structures and Algorithms</li>
          <li>Hard: System Design and Advanced Topics</li>
        </ul>
      </section>

      {/* Contests and Challenges */}
      <section className="section contests">
        <h2>Upcoming Contests and Challenges</h2>
        <ul>
          <li>Monthly Coding Challenge - Nov 2024</li>
          <li>Algorithm Optimization Contest - Dec 2024</li>
          <li>System Design Hackathon - Dec 2024</li>
        </ul>
        <p>Participate in our contests to win exciting prizes and boost your rankings!</p>
      </section>

      {/* Community Features */}
      <section className="section community">
        <h2>Community Features</h2>
        <p>Join our vibrant community through discussion forums, code sharing, and collaboration tools. Share your knowledge, ask questions, and work with others on problem-solving!</p>
      </section>

      {/* Tutorials and Resources */}
      <section className="section tutorials">
        <h2>Tutorials and Resources</h2>
        <ul>
          <li><a href="/resources/getting-started">Getting Started Guide</a></li>
          <li><a href="/resources/data-structures">Data Structures and Algorithms Tutorial</a></li>
          <li><a href="/resources/system-design">System Design Primer</a></li>
        </ul>
      </section>

      
    </div>
  );
}

export default Home;
