import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Photo.css';

const Photo = () => {
  const [stream, setStream] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [finalPhoto, setFinalPhoto] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        alert('Unable to access camera. Please make sure you have granted camera permissions.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && photos.length < 4) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      const photoUrl = canvas.toDataURL('image/jpeg');
      setPhotos([...photos, photoUrl]);
    }
  };

  const retakePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setFinalPhoto(null);
  };

  const createCollage = async () => {
    if (photos.length === 4) {
      const canvas = document.createElement('canvas');
      const size = 800; // Size of the final collage
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Draw background
      ctx.fillStyle = '#fff5f6';
      ctx.fillRect(0, 0, size, size);

      // Load all images first
      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };

      try {
        // Load all images
        const loadedImages = await Promise.all(photos.map(loadImage));

        // Draw each photo in a 2x2 grid
        const photoSize = size / 2;
        loadedImages.forEach((img, index) => {
          const row = Math.floor(index / 2);
          const col = index % 2;
          
          // Draw the photo
          ctx.drawImage(img, col * photoSize, row * photoSize, photoSize, photoSize);
          
          // Draw heart border
          ctx.strokeStyle = '#ff4d6d';
          ctx.lineWidth = 8;
          ctx.strokeRect(col * photoSize, row * photoSize, photoSize, photoSize);
          
          // Draw corner hearts
          const heartSize = 20;
          const corners = [
            [col * photoSize, row * photoSize],
            [col * photoSize + photoSize, row * photoSize],
            [col * photoSize, row * photoSize + photoSize],
            [col * photoSize + photoSize, row * photoSize + photoSize]
          ];
          
          corners.forEach(([x, y]) => {
            ctx.fillStyle = '#ff4d6d';
            ctx.beginPath();
            ctx.moveTo(x, y + heartSize/2);
            ctx.bezierCurveTo(
              x, y,
              x + heartSize/2, y,
              x + heartSize/2, y + heartSize/2
            );
            ctx.bezierCurveTo(
              x + heartSize/2, y,
              x + heartSize, y,
              x + heartSize, y + heartSize/2
            );
            ctx.bezierCurveTo(
              x + heartSize, y + heartSize,
              x + heartSize/2, y + heartSize,
              x + heartSize/2, y + heartSize/2
            );
            ctx.bezierCurveTo(
              x + heartSize/2, y + heartSize,
              x, y + heartSize,
              x, y + heartSize/2
            );
            ctx.fill();
          });
        });

        // Add final border with hearts
        ctx.strokeStyle = '#ff4d6d';
        ctx.lineWidth = 12;
        ctx.strokeRect(0, 0, size, size);

        // Add corner decorations
        const cornerSize = 40;
        const corners = [
          [0, 0],
          [size, 0],
          [0, size],
          [size, size]
        ];

        corners.forEach(([x, y]) => {
          ctx.fillStyle = '#ff4d6d';
          ctx.beginPath();
          ctx.moveTo(x, y + cornerSize/2);
          ctx.bezierCurveTo(
            x, y,
            x + cornerSize/2, y,
            x + cornerSize/2, y + cornerSize/2
          );
          ctx.bezierCurveTo(
            x + cornerSize/2, y,
            x + cornerSize, y,
            x + cornerSize, y + cornerSize/2
          );
          ctx.bezierCurveTo(
            x + cornerSize, y + cornerSize,
            x + cornerSize/2, y + cornerSize,
            x + cornerSize/2, y + cornerSize/2
          );
          ctx.bezierCurveTo(
            x + cornerSize/2, y + cornerSize,
            x, y + cornerSize,
            x, y + cornerSize/2
          );
          ctx.fill();
        });

        // Set the final photo
        setFinalPhoto(canvas.toDataURL('image/jpeg', 1.0));
      } catch (error) {
        console.error('Error creating collage:', error);
        alert('Error creating collage. Please try again.');
      }
    }
  };

  const savePhoto = () => {
    if (finalPhoto) {
      const link = document.createElement('a');
      link.download = 'love-collage.jpg';
      link.href = finalPhoto;
      link.click();
    }
  };

  return (
    <div className="photo-page">
      <Navbar />
      <div className="photo-container">
        <h1>Create Your Love Collage</h1>
        <div className="camera-container">
          {!finalPhoto ? (
            <>
              {photos.length < 4 && (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="camera-preview"
                  />
                  <button 
                    className="capture-btn" 
                    onClick={capturePhoto}
                    disabled={photos.length >= 4}
                  >
                    Take Photo {photos.length + 1}/4
                  </button>
                </>
              )}
              
              <div className="photo-grid">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="photo-frame">
                    {photos[index] ? (
                      <>
                        <img src={photos[index]} alt={`Captured ${index + 1}`} className="photo-preview" />
                        <button 
                          className="retake-btn"
                          onClick={() => retakePhoto(index)}
                        >
                          Retake
                        </button>
                      </>
                    ) : (
                      <div className="empty-frame">
                        <span>Photo {index + 1}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {photos.length === 4 && (
                <button className="create-btn" onClick={createCollage}>
                  Create Love Collage
                </button>
              )}
            </>
          ) : (
            <div className="final-collage">
              <img src={finalPhoto} alt="Love Collage" className="collage-preview" />
              <div className="collage-buttons">
                <button className="retake-all-btn" onClick={() => setFinalPhoto(null)}>
                  Create New Collage
                </button>
                <button className="save-btn" onClick={savePhoto}>
                  Save Collage
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Photo; 
 