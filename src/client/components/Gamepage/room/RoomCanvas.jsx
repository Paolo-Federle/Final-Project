import "../../../CSS/RoomCanvas.css"
import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const RoomCanvas = () => {
    const canvasRef = React.useRef(null);
    const [fabricCanvas, setFabricCanvas] = useState();
    const [imgURL, setImgURL] = useState('');
    const [brushEnabled, setBrushEnabled] = useState(false);

    // useEffect(() => {
    //     handleCreateCanvas()
    // }, [])

    const handleCreateCanvas = () => {
        if (!fabricCanvas) {
            setFabricCanvas(new fabric.Canvas(canvasRef.current, {
                height: 800,
                width: 800,
                backgroundColor: 'lightblue'
            }));
            return
        }
        fabricCanvas.renderAll();
    }

    function createRectangle() {
        const rect = new fabric.Rect({
            width: 50,
            height: 50,
            fill: "red"
        });
        fabricCanvas.add(rect);
    }

    const addImg = (e, url, canvi) => {
        e.preventDefault();
        new fabric.Image.fromURL(url, img => {
            img.scale(0.1);
            canvi.add(img);
            canvi.renderAll();
            setImgURL('');
        });
    }

    const handleBrushToggle = () => {
        if (brushEnabled) {
            fabricCanvas.isDrawingMode = false;
            setBrushEnabled(false);
        } else {
            fabricCanvas.isDrawingMode = true;
            setBrushEnabled(true);
        }
    };

    function showCanvas() {
        console.log('fabricCanvas is ', fabricCanvas)
        console.log('fabricCanvas._objects is ', fabricCanvas._objects)
    }

    return (
        <>
            <button onClick={handleCreateCanvas}>Create Canvas</button>
            <button onClick={createRectangle}>Create Rectangle</button>
            <button onClick={handleBrushToggle}>Brush</button>
            <button onClick={showCanvas}>show canvas</button>
            <form onSubmit={e => addImg(e, imgURL, fabricCanvas)}>
                <div>
                    <input
                        type="text"
                        value={imgURL}
                        onChange={e => setImgURL(e.target.value)}
                    />
                    <button type="submit">Add Image</button>
                </div>
            </form>
            <canvas
                width="1px"
                height="1px"
                ref={canvasRef}
            />
        </>
    );
};

export default RoomCanvas;