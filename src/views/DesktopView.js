// src/views/DesktopView.jsx
import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoveAnimation from '../components/LoveAnimation';

const DesktopView = () => {
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
        display: 'flex',
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '2rem'
      }}>
        <div style={{
          flex: '0 0 400px',
          position: 'sticky',
          top: '2rem',
          height: 'fit-content'
        }}>
          <img 
            src="/bobob.jpg" 
            alt="Foto Ulang Tahun" 
            style={{
              width: '100%',
              height: '500px',
              objectFit: 'cover',
              borderRadius: '25px',
              boxShadow: '0 4px 20px rgba(215,38,96,0.15)',
              border: '4px solid #ffb6c1'
            }}
          />
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <div style={{
            padding: '2rem',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '20px',
            boxShadow: '0 2px 15px rgba(215,38,96,0.12)'
          }}>
            <p style={{
              fontSize: '1.2rem',
              color: '#d72660',
              lineHeight: '1.8',
              textAlign: 'left',
              marginBottom: '1.5rem'
            }}>
              Awoww cayangggkuu, selamat ulang tahunnn yahh. Semoga panjang umuurr, sehat selaluu, berbakti sama kedua orang tuaa. Maaci yaa udah nemenin aku sejauh inii. Semoga hubungan kita juga makin langgengg. Jadi anak yang baik dechh pokoknyaa. Dikurangin ngambek e muwhehehe. HBD pokoknyaa bubuu  🎉🎂💖
            </p>
            <p style={{
              color: '#000000',
              fontWeight: 500,
              fontSize: '1.1rem',
              textAlign: 'right'
            }}>
              From : Ur lovely Dudu
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'rgba(255,245,246,0.95)',
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(215,38,96,0.10)'
          }}>
            <audio ref={audioRef} src="/song.mp3" preload="metadata" />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
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
                  width: 40,
                  height: 40,
                  fontSize: 18,
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
                  width: 40,
                  height: 40,
                  fontSize: 18,
                  cursor: 'pointer'
                }}
              >
                ⏹️
              </button>
              <span style={{ fontWeight: 500, color: '#d72660', fontSize: 15 }}>
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
    </div>
  );
};

export default DesktopView;