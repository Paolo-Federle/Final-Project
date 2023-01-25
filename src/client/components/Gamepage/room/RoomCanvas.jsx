import "../../../CSS/RoomCanvas.css"
import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { Link, useParams } from 'react-router-dom'

const apiUrl = process.env.REACT_APP_API_URL

const RoomCanvas = () => {
    const canvasRef = React.useRef(null);
    const [fabricCanvas, setFabricCanvas] = useState();
    const [imgURL, setImgURL] = useState('');
    const [brushEnabled, setBrushEnabled] = useState(false);

    const { id } = useParams()

    const saveCanvas = (fabricCanvas, id) => {
        const canvas = JSON.stringify(fabricCanvas);
        console.log('canvas is ', canvas)
        console.log('typeof canvas is ', typeof(canvas))
        const url = `${apiUrl}/room/${id}/canvas`
        fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                canvas: canvas
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        if (fabricCanvas) {
            saveCanvas(fabricCanvas, id);
        }
    }, [fabricCanvas, id]);

    const handleCreateCanvas = () => {
        if (!fabricCanvas) {
            setFabricCanvas(new fabric.Canvas(canvasRef.current, {
                height: 600,
                width: 810,
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
        setFabricCanvas(fabricCanvas)
    }

    const addImg = (e, url, canvi) => {
        e.preventDefault();
        new fabric.Image.fromURL(url, img => {
            img.scale(0.1);
            canvi.add(img);
            canvi.renderAll();
            setImgURL('');
        });
        setFabricCanvas(fabricCanvas)
    }

    const handleBrushToggle = () => {
        if (brushEnabled) {
            fabricCanvas.isDrawingMode = false;
            setBrushEnabled(false);
            setFabricCanvas(fabricCanvas)
        } else {
            fabricCanvas.isDrawingMode = true;
            setBrushEnabled(true);
            setFabricCanvas(fabricCanvas)
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