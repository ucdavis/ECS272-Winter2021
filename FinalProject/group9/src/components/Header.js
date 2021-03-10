import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="item">Home</Link>
            <Link to="/threat" className="item">Disputes map</Link>
            <Link to="/alliance" className="item">Alliances vs Possible threats</Link>
            <Link to="/total_alliance" className="item">Global Cooperations</Link>
        </div>
    );
};

export default Header;