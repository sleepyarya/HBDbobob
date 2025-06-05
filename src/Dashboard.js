import React, { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoveAnimation from './components/LoveAnimation';

const Dashboard = () => {
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

  // Real-time detik berjalan hanya saat play
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime);
        }
      }, 200); // update setiap 0.2 detik
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
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        maxWidth: '1200px',
        width: '90%',
        boxSizing: 'border-box',
        margin: '0.5rem auto 0 auto',
        '@media (max-width: 768px)': {
          padding: '1rem',
          width: '95%'
        }
      }}>
        <div
          className="dashboard-card"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFE4E1',
            borderRadius: '28px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(215,38,96,0.10), 0 0 16px 4px #ff4d6d66, 0 0 32px 8px #ffb3c144',
            overflow: 'hidden',
            '@media (maxWidth: 768px)': {
              flexDirection: 'column',
              padding: '1rem'
            }
          }}
        >
          <div
            className="dashboard-card-border"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '28px',
              padding: 0,
              zIndex: 0,
              pointerEvents: 'none',
              boxSizing: 'border-box',
              border: '4px solid transparent',
              background: 'linear-gradient(90deg, #ff6a88 0%, #ffb86c 100%) border-box',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          <div className="dashboard-card-inner" style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'inherit', alignItems: 'center' }}>
            <img 
              src="/bobob.jpg" 
              alt="Foto Ulang Tahun" 
              style={{
                width: '200px',
                height: '260px',
                objectFit: 'cover',
                borderRadius: '18px',
                marginRight: '1.5rem',
                boxShadow: '0 4px 16px rgba(215,38,96,0.13)',
                border: '2px solid #ffb6c1',
                background: '#fff',
                '@media (maxWidth: 768px)': {
                  marginBottom: '1.2rem',
                  width: '140px',
                  height: '180px'
                }
              }}
            />
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: '1.1rem',
                color: '#d72660',
                marginTop: '1.2rem',
                lineHeight: '1.7',
                fontWeight: 500,
                textAlign: 'center'
              }}>
                Awoww cayangggkuu, selamat ulang tahunnn yahh. Semoga panjang umuurr, sehat selaluu, berbakti sama kedua orang tuaa. Maaci yaa udah nemenin aku sejauh inii. Semoga hubungan kita juga makin langgengg. Jadi anak yang baik dechh pokoknyaa. Dikurangin ngambek e muwhehehe. HBD pokoknyaa bubuu  🎉🎂💖
              </p>
              <p style={{ color: '#000000', fontWeight: 500, fontSize: '1rem', textAlign: 'center', marginTop: '0.7rem' }}>
                From : Ur lovely Dudu
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '1rem 0 0 0',
                padding: '1rem',
                background: 'rgba(255,245,246,0.95)',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(215,38,96,0.10)',
                maxWidth: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                <audio ref={audioRef} src="/song.mp3" preload="metadata" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <button onClick={handlePlay} disabled={isPlaying} style={{
                    background: '#ff4d6d', color: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 18, cursor: isPlaying ? 'not-allowed' : 'pointer', boxShadow: '0 2px 8px rgba(255,77,109,0.10)'
                  }}>▶️</button>
                  <button onClick={handleStop} style={{
                    background: '#ffb3c1', color: '#ff4d6d', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,77,109,0.10)'
                  }}>⏹️</button>
                  <span style={{ fontWeight: 500, color: '#d72660', fontSize: 15 }}>Music</span>
                </div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: 13, color: '#d72660', minWidth: 36 }}>{formatTime(progress)}</span>
                  <div onClick={handleProgressClick} style={{ flex: 1, height: 8, background: '#ffb3c1', borderRadius: 4, cursor: 'pointer', position: 'relative' }}>
                    <div style={{ width: duration ? `${(progress/duration)*100}%` : '0%', height: '100%', background: '#ff4d6d', borderRadius: 4, transition: 'width 0.2s' }} />
                  </div>
                  <span style={{ fontSize: 13, color: '#d72660', minWidth: 36 }}>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 