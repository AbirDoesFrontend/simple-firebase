import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

import './Main.css';

const Main = () => {
    return (
        <div className='main'>
            <Header />
            <Outlet />
        </div>
    );
};

export default Main;