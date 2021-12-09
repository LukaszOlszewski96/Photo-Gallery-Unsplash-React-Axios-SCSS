import React from 'react';
import {MdOutlineClear} from 'react-icons/md';
import {IoIosSearch} from 'react-icons/io';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const FirstSearch = () => {
    return (
        <div className='app search'>
        <header className='app-header search'>
            <nav className='navigation'>
                <div className = "search-box">
                <Link className='search-icon' to="/search"><IoIosSearch /></Link>
                <input
                    className = "search-input"
                    type="text"  
                    placeholder = "Search"
                />
                <MdOutlineClear/>
            </div>
          </nav>
        </header>
        </div>
    )
}

export default FirstSearch
