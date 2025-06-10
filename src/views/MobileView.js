// src/views/MobileView.jsx
import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoveAnimation from '../components/LoveAnimation';

const MobileView = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
    };
  }, []);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime);
        }
      }, 200);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const seekTime = percent * duration;
    audioRef.current.currentTime = seekTime;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#FFE4E1',
      width: '100%',
      overflowX: 'hidden'
    }}>
      <Navbar />
      <LoveAnimation />
      <div style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <img 
          src="/bobob.jpg" 
          alt="Foto Ulang Tahun" 
          style={{
            width: '280px',
            height: '350px',
            objectFit: 'cover',
            borderRadius: '20px',
            marginTop: '1rem',
            boxShadow: '0 4px 16px rgba(215,38,96,0.13)',
            border: '3px solid #ffb6c1'
          }}
        />
        
        <div style={{
          margin: '1.5rem 1rem',
          padding: '1.5rem',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(215,38,96,0.15)'
        }}>
          <p style={{
            fontSize: '1rem',
            color: '#d72660',
            lineHeight: '1.6',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Awoww cayangggkuu, selamat ulang tahunnn yahh. Semoga panjang umuurr, sehat selaluu, berbakti sama kedua orang tuaa. Maaci yaa udah nemenin aku sejauh inii. Semoga hubungan kita juga makin langgengg. Jadi anak yang baik dechh pokoknyaa. Dikurangin ngambek e muwhehehe. HBD pokoknyaa bubuu  🎉🎂💖
          </p>
          <p style={{
            color: '#000000',
            fontWeight: 500,
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            From : Ur lovely Dudu
          </p>
        </div>

        <div style={{
          width: '90%',
          padding: '1rem',
          background: 'rgba(255,245,246,0.95)',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(215,38,96,0.10)'
        }}>
          <audio ref={audioRef} src="/song.mp3" preload="metadata" />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            marginBottom: '0.8rem',
            justifyContent: 'center'
          }}>
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              style={{
                background: '#ff4d6d',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                fontSize: 16,
                cursor: isPlaying ? 'not-allowed' : 'pointer'
              }}
            >
              ▶️
            </button>
            <button
              onClick={handleStop}
              style={{
                background: '#ffb3c1',
                color: '#ff4d6d',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                fontSize: 16,
                cursor: 'pointer'
              }}
            >
              ⏹️
            </button>
            <span style={{ fontWeight: 500, color: '#d72660', fontSize: 13 }}>
              Music
            </span>
          </div>
          <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: 13, color: '#d72660', minWidth: 36 }}>
              {formatTime(progress)}
            </span>
            <div
              onClick={handleProgressClick}
              style={{
                flex: 1,
                height: 8,
                background: '#ffb3c1',
                borderRadius: 4,
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: duration ? `${(progress/duration)*100}%` : '0%',
                  height: '100%',
                  background: '#ff4d6d',
                  borderRadius: 4,
                  transition: 'width 0.2s'
                }}
              />
            </div>
            <span style={{ fontSize: 13, color: '#d72660', minWidth: 36 }}>
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileView;