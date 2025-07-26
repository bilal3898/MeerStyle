'use client';
import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as bodyPix from '@tensorflow-models/body-pix';

export default function BodyScanner({ onScanComplete }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [model, setModel] = useState(null);

  // Initialize camera and model
  useEffect(() => {
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        
        const net = await bodyPix.load();
        setModel(net);
        setLoading(false);
        
        startBodySegmentation();
      } catch (err) {
        setError('Camera access required for 3D scanning');
      }
    };

    init();
    return () => videoRef.current?.srcObject?.getTracks().forEach(t => t.stop());
  }, []);

  const startBodySegmentation = async () => {
    const ctx = canvasRef.current.getContext('2d');
    
    const detect = async () => {
      if (model && videoRef.current.readyState === 4) {
        const segmentation = await model.segmentPerson(videoRef.current);
        drawBodyMeasurements(segmentation);
        requestAnimationFrame(detect);
      }
    };
    
    detect();
  };

  const drawBodyMeasurements = (segmentation) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Measurement calculation logic
    // (This would integrate with actual measurement algorithms)
    const measurements = calculateBodyMeasurements(segmentation);
    
    // Draw body outline
    bodyPix.drawBokehEffect(
      canvasRef.current, 
      videoRef.current, 
      segmentation, 
      7, 
      0.7
    );

    // Draw measurement lines
    Object.entries(measurements).forEach(([part, value]) => {
      drawMeasurementLine(part, value);
    });
  };

  return (
    <div className="relative">
      {error && <p className="text-red-500">{error}</p>}
      
      {loading ? (
        <div className="bg-gray-100 w-full aspect-video rounded-lg flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full rounded-lg"
          />
          <canvas 
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
            width={videoRef.current?.videoWidth || 640}
            height={videoRef.current?.videoHeight || 480}
          />
          
          <button
            onClick={() => onScanComplete(getCurrentMeasurements())}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Capture Measurements
          </button>
        </>
      )}
    </div>
  );
}