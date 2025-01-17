import React from 'react';
import Header from '../../../../../Components/Header/Header';
import Sidebar from '../../../../../Components/Sidebar/Sidebar';
import './DemoHub.css';
import Sidebar1 from './Sidebar1';
import Header1 from './Header1';
import MainContent from './MainContent';
import Sidebar2 from './Sidebar2';

const DemoHub = () => {
    return (
        <div>
            <Header />
            <div>
                <Sidebar />
                <div className="hub-ingest-container">
                    <div className="app1">
                        {/* Sidebar1, Sidebar2, and MainContent in a horizontal layout */}
                        <div className="main-layout1">
                            <Sidebar1 />
                            <Sidebar2 />
                            <div className="main-container1">
                                <Header1 />
                                <MainContent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoHub;
