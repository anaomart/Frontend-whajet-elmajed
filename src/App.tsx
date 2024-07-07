import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateSingleNews from './pages/createSingleNews/createSingleNews';
import DisplayAllNews from './pages/allNews/AllNews';
import DisplaySingleNews from './pages/displaySingleNews/DisplaySingleNews';
import Home from './pages/Home';
import EditSingleNews from './pages/EditSingleNews/EditSingleNews';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateSingleNews />} />
        <Route path="/news/:id" element={<DisplaySingleNews />} />
        <Route path="/news/edit/:id" element={<EditSingleNews />} />
        <Route path="/news" element={<DisplayAllNews />} />
      </Routes>
    </div>
  );
};

export default App;
