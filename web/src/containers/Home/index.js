import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import './style.css';

export default class Home extends Component {
  
  componentDidMount() {
    fetch(`http://localhost:4000/indexData`)
  };

  render() {
    return (
      <main className="main-wrapper">
        <Button type="primary" size="large">
          <NavLink to={'/products'}>Products</NavLink>
        </Button>
      </main>
    )
  }; 
};