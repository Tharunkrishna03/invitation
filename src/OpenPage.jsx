import React from 'react';
import openVideo from './assets/open.mp4';

export default function OpenPage({ onOpen, isLeaving }) {
  return (
    <div className={`open-page-container ${isLeaving ? 'leaving' : ''}`}>
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={openVideo} type="video/mp4" />
      </video>
      <div className="open-page-overlay"></div>
      <div className="open-page-content">
        <div className="open-page-monogram">
          <span>S</span>
          <span>&</span>
          <span>S</span>
        </div>
        <h2 className="open-page-title">WELCOME U</h2>
        <p className="open-page-subtitle">You are cordially invited to celebrate the engagement of</p>
        <h1 className="open-page-couple">
          Saravana <span className="ampersand-gold">&</span> Sangeetha
        </h1>
        <div className="ornament-divider-gold">✦ ✦ ✦</div>
        <button className="open-btn-violet" onClick={onOpen} aria-label="See Invitation">
          See Invitation
        </button>
      </div>
    </div>
  );
}
