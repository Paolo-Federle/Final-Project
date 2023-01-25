import React, { useState, useRef } from 'react';
import "../../../CSS/RoomCanvas.css"

const RoomCanvas = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [prevPos, setPrevPos] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
    
    function handleMouseDown(e) {
        if (isSelecting) return;
        setIsDrawing(true);
        setPrevPos({ x: e.clientX, y: e.clientY });
    }

    function handleMouseMove(e) {
        if (!isDrawing) return;

        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(prevPos.x, prevPos.y);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        setPrevPos({ x: e.clientX, y: e.clientY });
    }

    function handleMouseUp() {
        setIsDrawing(false);
    }

    function switchToSelect() {
        setIsSelecting(true);
        setIsDrawing(false);
    }

    function switchToDraw() {
        setIsSelecting(false);
    }

    function handleCanvasClick(e) {
        if (!isSelecting) return;

        const ctx = canvasRef.current.getContext('2d');
        const pixel = ctx.getImageData(e.clientX, e.clientY, 1, 1);
        const { data } = pixel;

        // check if the pixel is not transparent (color exists at that location)
        if (data[3] !== 0) {
            // handle selection (ex: add a class to highlight the selected drawing)
            console.log("drawing selected");
        }
    }

    return (
        <div>
            <canvas
                width="700px"
                height="500px"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={handleCanvasClick}
                className="canvas-element"
                ref={canvasRef}
            />
            <div className="canvas-buttons">
                <button onClick={switchToSelect} disabled={isSelecting}>Select</button>
                <button onClick={switchToDraw} disabled={!isSelecting}>Draw</button>
            </div>
        </div>
    );
}

export default RoomCanvas;

