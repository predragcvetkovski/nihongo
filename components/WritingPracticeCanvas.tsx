import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowPathIcon } from '../constants'; 

interface WritingPracticeCanvasProps {
  characterToPractice?: string; 
  guidanceImageUrl?: string; 
  width?: number;
  height?: number;
  canvasId: string; 
}

const WritingPracticeCanvas: React.FC<WritingPracticeCanvasProps> = ({
  characterToPractice,
  guidanceImageUrl,
  width = 200,
  height = 200,
  canvasId,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [loadedGuidanceImage, setLoadedGuidanceImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (context) {
        context.strokeStyle = '#FFFFFF'; // White for drawing lines
        context.lineWidth = 3.5; 
        context.lineCap = 'round';
        context.lineJoin = 'round';
        setCtx(context);
      }
    }
  }, [width, height]);

  useEffect(() => {
    let isActive = true;
    let imgElement: HTMLImageElement | null = null;

    if (guidanceImageUrl) {
      imgElement = new Image();
      imgElement.crossOrigin = "anonymous";
      
      imgElement.onload = () => {
        if (isActive) {
          setLoadedGuidanceImage(imgElement);
        }
      };
      imgElement.onerror = () => {
        if (isActive) {
          console.warn(`Could not load guidance image for canvas: ${guidanceImageUrl}. Text guidance will still be shown.`);
          setLoadedGuidanceImage(null);
        }
      };
      imgElement.src = guidanceImageUrl;
    } else {
      if (isActive) {
        setLoadedGuidanceImage(null);
      }
    }

    return () => {
      isActive = false;
      if (imgElement) {
        imgElement.onload = null;
        imgElement.onerror = null;
      }
    };
  }, [guidanceImageUrl]);

  const drawGuidance = useCallback(() => {
    if (!ctx || !canvasRef.current) return;
    const canvas = canvasRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear with transparent

    // Draw a semi-transparent background for the canvas itself to fit the theme
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Dark semi-transparent bg
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    if (loadedGuidanceImage) {
      try {
        ctx.globalAlpha = 0.12; 
        ctx.drawImage(loadedGuidanceImage, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0; 
      } catch (e) {
        console.warn("Error drawing guidance image on canvas:", e);
      }
    }
    
    if (characterToPractice) {
      ctx.font = `bold ${Math.min(canvas.width, canvas.height) * 0.75}px 'Noto Sans JP', sans-serif`; 
      ctx.fillStyle = "rgba(200, 200, 200, 0.35)"; // Lighter faint text for dark bg
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(characterToPractice, canvas.width / 2, canvas.height / 2 + (canvas.height * 0.05));
    }
  }, [ctx, loadedGuidanceImage, characterToPractice]);


  useEffect(() => {
    drawGuidance();
  }, [drawGuidance]);


  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    if (!ctx) return;
    const { offsetX, offsetY } = getCoordinates(event);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.strokeStyle = '#FFFFFF'; 
    ctx.globalAlpha = 1.0;      
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !ctx) return;
    const { offsetX, offsetY } = getCoordinates(event);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const endDrawing = () => {
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };
  
  const handleClearUserDrawing = () => {
    if (ctx && canvasRef.current) {
        drawGuidance(); 
    }
  };

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return { offsetX: 0, offsetY: 0 };
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (event.nativeEvent instanceof MouseEvent) {
      return { 
        offsetX: event.nativeEvent.clientX - rect.left, 
        offsetY: event.nativeEvent.clientY - rect.top 
      };
    } else if (event.nativeEvent instanceof TouchEvent && event.nativeEvent.touches.length > 0) {
      return { 
        offsetX: event.nativeEvent.touches[0].clientX - rect.left, 
        offsetY: event.nativeEvent.touches[0].clientY - rect.top
      };
    }
    return { offsetX: 0, offsetY: 0 };
  };
  

  return (
    <div className="flex flex-col items-center space-y-4 font-sans">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
        // Canvas background is now drawn in drawGuidance. Border from Tailwind.
        className="border-2 border-white/20 rounded-xl cursor-crosshair shadow-lg"
        aria-label={characterToPractice ? `Drawing canvas for character ${characterToPractice}` : "Drawing canvas"}
        id={canvasId}
        role="img"
      />
      <button
        onClick={handleClearUserDrawing}
        className="bg-sky-500/60 hover:bg-sky-400/70 backdrop-filter backdrop-blur-sm border border-sky-400/60 text-white font-semibold py-2 px-5 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
        aria-controls={canvasId}
      >
        <ArrowPathIcon className="h-5 w-5 mr-2" /> Clear Canvas
      </button>
    </div>
  );
};

export default WritingPracticeCanvas;