import React from 'react';
import Navbar from './Navbar';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-container">
        <h1>About the Creator</h1>
        <div className="creator-card">
          <div className="creator-image">
            <img src="/arya.jpg" alt="Arya" className="profile-image" />
          </div>
          <div className="creator-info">
            <h2>Arya</h2>
            <p className="creator-description">
              The creative mind behind this special birthday website. With love and dedication, 
              I've crafted this digital space to celebrate your special day. Every feature, 
              from the love messages to the photo collage, is designed with you in mind. 
              May this website bring joy to your birthday celebration! 💖
            </p>
            <div className="love-quote">
              "Love is the greatest gift we can give and receive. Happy Birthday, my love!" 💝
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 