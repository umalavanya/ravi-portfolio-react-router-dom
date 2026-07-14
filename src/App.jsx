import { Routes, Route } from 'react-router-dom';
import LeftPane from './layouts/LeftPane';
import MainContent from './layouts/MainContent';
import './styles/App.css';
import About from './pages/About';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Awards from './pages/Awards';
import Publications from './pages/Publications';
import Footer from './pages/Footer';
import Talks from './pages/Talks';
import Skills from './pages/Skills';
import Pictures from './pages/Pictures'

function App() {
  return (
    <>
      <div className="app-container">
        <LeftPane />
        <MainContent>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/talks" element={<Talks />} />
            <Route path="/pictures" element={<Pictures />} />
          </Routes>
        </MainContent>
      </div>
      <Footer className="footer" />
    </>
  );
}

export default App;