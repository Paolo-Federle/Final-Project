import HeaderMenu from "./header/HeaderMenu"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function Games({ userData, setUserData }) {
    console.log("Games", userData)

    return (
        <>
            <Routes>
            <Route path="/" element={<HeaderMenu userData={userData} setUserData={setUserData}/>} />
            </Routes>
            <div className="Gamepage">
                <h1>Games</h1>
            </div>
        </>
    );
}

export default Games