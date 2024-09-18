import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tabs from "./components/Tabs/Tabs"; // Your Tabs component

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Define your routes here */}
                <Route path="/" element={<Tabs />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
