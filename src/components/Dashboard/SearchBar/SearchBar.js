import React, { Component } from 'react';
import '../../../utils/styles/global.css';
import './SearchBar.css';

class SearchBar extends Component {
    render() {
        return(
            <div id="search-bar">
                <h4 className="search-title">Search</h4>
                <input className="search-input" />
                <i className="fas fa-search search-icon"></i>
            </div>
        );
    }
}

export default SearchBar