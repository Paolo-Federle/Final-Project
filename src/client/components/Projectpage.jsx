import HeaderMenu from "./header/HeaderMenu"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../CSS/ProjectPage.css'

const ProjectPage = () => {
    return (
      <>
      <Routes>
        <Route path="/" element={<HeaderMenu />} />
      </Routes>
      <div className="left-aligned padded-text">
        <h1>My Final Project: A Website Similar to Roll20</h1>
        <p>
        My final project for my software developer program was to create a website similar to Roll20, a virtual tabletop platform for playing role-playing games online. I chose this project because I am already familiar with the website and wanted to build something that is composed of many pieces, where I can decide what to keep, discard, and add later as I see fit. I also wanted to test my skills by using both old and new technologies.
      </p>
      <p>
        The website I created includes features such as real-time dice rolling, character sheets, and a chat system. However, it is not optimized for use on mobile devices.
      </p>
      <p>
        Overall, this project was a great learning experience for me. I am proud of the final product and I hope that other players will find it useful for connecting and playing games online.
      </p>
      </div>
      </>
    );
  };
  
  export default ProjectPage;