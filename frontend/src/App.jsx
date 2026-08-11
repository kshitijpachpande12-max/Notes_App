import React from 'react';
import {Route, Routes} from 'react-router';
import HomePage from "./pages/HomePage.jsx";
import Create from "./pages/Create.jsx";
import NoteDetail from "./pages/NoteDetail.jsx";
import toast from 'react-hot-toast';

const App = () => {
  return (
    <div data-theme = "synthwave" className='bg-base-200'>
      <Routes>
        <Route path = "/" element={<HomePage/>}/>
        <Route path = "/create" element={<Create/>}/>
        <Route path = "/note/:id" element={<NoteDetail/>}/>
      </Routes>
    </div>
  )
}

export default App
