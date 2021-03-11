import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="item">Home</Link>
            <Link to="/gdp" className="item">GDP / Military Expenditure</Link>
            <Link to="/area" className="item"> Number of Disputes</Link>
            <Link to="/threat" className="item">Threat</Link>
            <Link to="/area2" className="item"> Number of Alliances</Link>
            <Link to="/alliance" className="item">Threat vs Alliances</Link>
            <Link to="/total_alliance" className="item">Global Cooperations</Link>
        </div>
    );
};

export default Header;