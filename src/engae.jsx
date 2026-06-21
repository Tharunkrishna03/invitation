import React, { useState, useEffect, useRef } from "react";
import weddingCouple from "./assets/wedding_couple.png";
import hangingFlowers from "./assets/hanging_flowers.png";

const MUSIC_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export default function Engage() {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: 1,
    attendance: "yes",
    message: "",
  });

  const targetDate = new Date("2026-06-24T10:00:00").getTime();

  const calculateTimeLeft = () => {
    const diff = targetDate - new Date().getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setRsvpOpen(false);
    }, 4000);
  };

  const getCalendarLink = () => {
    const title = encodeURIComponent(
      "Saravana & Sangeetha Wedding"
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}`;
  };

  return (
    <div className="invite-wrapper">
      <audio ref={audioRef} src={MUSIC_URL} loop />



      <div className="invite-card">

        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="particle"
            ></span>
          ))}
        </div>


        <img
          src={hangingFlowers}
          alt=""
          className="hanging-flowers-img"
        />

        <div className="invite-content">

          <div className="monogram">
            <span>S</span>
            <span>&</span>
            <span>S</span>
          </div>

          <p className="section-title">
            ENGAGEMENT INVITATION
          </p>

          <p className="invite-subtitle">
            Together with their families
          </p>

          <p className="wedding-quote">
            "Two souls with but a single thought,
            two hearts that beat as one."
          </p>

          <h1 className="bride-groom-names">
            Saravana
            <span className="ampersand">&</span>
            Sangeetha
          </h1>

          <div className="ornament-divider">
            ✦ ✦ ✦
          </div>

          <div className="datetime-details">
            <p className="wedding-date">
              WEDNESDAY • JUNE 24 • 2026
            </p>

            <p className="wedding-venue">
              Tirupur MainRoad,
              <br />
              Ponneri village,
              <br />
            </p>
          </div>

          <div className="action-buttons">
            <a
              href={getCalendarLink()}
              target="_blank"
              rel="noreferrer"
              className="user-profile"
            >
              <div className="user-profile-inner">
                📅 Save The Date
              </div>
            </a>
          </div>
        </div>

        <div className="couple-container">
          <img
            src={weddingCouple}
            alt="Couple"
            className="wedding-couple-img"
          />
        </div>
      </div>

      <div className="countdown-panel">
        <h3 className="countdown-title">
          CELEBRATION BEGINS IN
        </h3>

        <div className="countdown-timer">

          <div className="time-block">
            <span className="time-number">
              {timeLeft.days}
            </span>
            <span className="time-label">
              DAYS
            </span>
          </div>

          <div className="time-block">
            <span className="time-number">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="time-label">
              HOURS
            </span>
          </div>

          <div className="time-block">
            <span className="time-number">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="time-label">
              MINUTES
            </span>
          </div>

          <div className="time-block">
            <span className="time-number">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="time-label">
              SECONDS
            </span>
          </div>

        </div>
      </div>

      {rsvpOpen && (
        <div className="modal-backdrop">
          <div className="modal-content glassmorphism">

            <button
              className="modal-close"
              onClick={() => setRsvpOpen(false)}
            >
              ×
            </button>

            {!submitted ? (
              <form
                className="rsvp-form"
                onSubmit={handleSubmit}
              >
                <h2 className="form-title">
                  RSVP
                </h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <textarea
                  name="message"
                  placeholder="Best Wishes..."
                  value={formData.message}
                  onChange={handleInputChange}
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit RSVP
                </button>
              </form>
            ) : (
              <div className="rsvp-thankyou">
                <h2>💖 Thank You!</h2>

                <p>
                  Your RSVP has been received.
                </p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
