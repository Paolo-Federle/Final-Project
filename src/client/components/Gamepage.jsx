import HeaderMenu from "./header/HeaderMenu"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function Games() {

    return (
        <>
            <Routes>
                <Route path="/" element={<HeaderMenu />} />
            </Routes>
            <div className="Gamepage">
                <h1>Games</h1>
            </div>
        </>
    );
}

export default Games