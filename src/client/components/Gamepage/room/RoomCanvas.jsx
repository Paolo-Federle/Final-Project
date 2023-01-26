import "../../../CSS/RoomCanvas.css"
import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { Link, useParams } from 'react-router-dom'

const apiUrl = process.env.REACT_APP_API_URL

const RoomCanvas = () => {
    const canvasRef = React.useRef(null);
    const [fabricCanvas, setFabricCanvas] = useState();
    const [imgURL, setImgURL] = useState('');
    const [brushEnabled, setBrushEnabled] = useState(false);

    const { id } = useParams()

    const getRoomCanvas = async (id) => {
        const url = `${apiUrl}/room/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Unable to find room');
        }
        const data = await response.json();
        let canvas = data.data.canvas
        return canvas;
    }

    const saveCanvas = (fabricCanvas, id) => {
        if (!fabricCanvas || fabricCanvas === "") {
            return
        }
        const canvas = JSON.stringify(fabricCanvas.toJSON())
        console.log('canvas ', canvas)
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

    // useEffect(() => {
    //     getRoomCanvas(id)
    //         .then(data => {
    //             if (!data.data.canvas || data.data.canvas === "") {
    //                 return
    //             }
    //             let canvasData = JSON.parse(data.data.canvas)
    //             console.log('getRoomCanvas of useEffect got triggered',)
    //             setFabricCanvas(new fabric.Canvas(canvasRef.current, canvasData));;
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);

    useEffect(() => {
        if (fabricCanvas) {
            saveCanvas(fabricCanvas, id);
            fabricCanvas.renderAll();
        }
    }, [fabricCanvas, id]);



    // useEffect(() => {
    //     if (fabricCanvas) {
    //         getJson()
    //     }
    // }, [fabricCanvas, id]);

    const handleCreateCanvas = async () => {
        if (!fabricCanvas) {
            console.log('handleCreateCanvas')
            const json = await getRoomCanvas(id)
            const newCanvas = new fabric.Canvas(canvasRef.current, {
                height: 600,
                width: 810,
                // backgroundColor: 'lightgray',
            })
            newCanvas.loadFromJSON(json, newCanvas.renderAll.bind(newCanvas), function (o, object) {
                fabric.log(o, object);
            });
            setFabricCanvas(newCanvas)
        }


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
        saveCanvas(fabricCanvas, id)
    }

    const handleBrushToggle = () => {
        if (brushEnabled) {
            fabricCanvas.isDrawingMode = false;
            setBrushEnabled(false);
            setFabricCanvas(fabricCanvas)
            saveCanvas(fabricCanvas, id)
        } else {
            fabricCanvas.isDrawingMode = true;
            setBrushEnabled(true);
            setFabricCanvas(fabricCanvas)
        }
    };

    const addDragon = (e, canvi) => {
        e.preventDefault();
        const url = "https://img.freepik.com/free-vector/hand-drawn-dragon_53876-88179.jpg";
        new fabric.Image.fromURL(url, img => {
            img.scale(0.1);
            canvi.add(img);
            canvi.renderAll();
        });
        setFabricCanvas(fabricCanvas)
        saveCanvas(fabricCanvas, id)
    }
    const addKnight = (e, canvi) => {
        e.preventDefault();
        const url = "https://p.turbosquid.com/ts-thumb/SQ/EiCnqf/Al/knight_030029/jpg/1649257901/600x600/fit_q87/5a443d0dc74d7bf59396210e2ee6f302c47636af/knight_030029.jpg";
        new fabric.Image.fromURL(url, img => {
            img.scale(0.1);
            canvi.add(img);
            canvi.renderAll();
        });
        setFabricCanvas(fabricCanvas)
        
    }

    function showCanvas() {
        console.log('fabricCanvas is ', fabricCanvas)
        console.log('fabricCanvas._objects is ', fabricCanvas._objects)
    }

    return (
        <>
            <button onClick={handleCreateCanvas}>Create Canvas</button>
            {/* <button onClick={createRectangle}>Create Rectangle</button> */}
            <button onClick={handleBrushToggle}>Brush</button>
            <button onClick={e => addDragon(e, fabricCanvas)}>Add Dragon</button>
            <button onClick={e => addKnight(e, fabricCanvas)}>Add Knight</button>
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