import React from 'react';
import { Cliente } from './cliente';
import { Welcome } from './pages/welcome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/cliente" element={<Cliente />} />
                </Routes>
            </Router>
        </div>
    )
};
