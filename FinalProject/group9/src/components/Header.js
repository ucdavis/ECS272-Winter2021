import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="item">Home</Link>
            <Link to="/threat" className="item">Threat</Link>
            <Link to="/alliance" className="item">Threat vs Alliances</Link>
            <Link to="/total_alliance" className="item">Global Cooperations</Link>
        </div>
    );
};

export default Header;