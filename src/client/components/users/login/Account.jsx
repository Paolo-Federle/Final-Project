import HeaderMenu from "../../header/HeaderMenu"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function Account({ userData, setUserData }) {

    return (
        <>
            <Routes>
                <Route path="/" element={<HeaderMenu userData={userData} setUserData={setUserData} />} />
            </Routes>
            <div className="Accountpage">
                <h1>Account</h1>
            </div>
        </>
    );
}

export default Account