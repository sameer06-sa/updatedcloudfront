import React from 'react';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import ServiceMenu from '../../Components/ServiceMenu/ServiceMenu';
import RecentServices from '../../Components/RecentServices/RecentServices';
import './Home.css';

function Home() {
  return (
    <div className="home-layout">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="home-content">
        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Main Content Area */}
        <div className="home-main-content">
          {/* Services Section */}
          <section className="services-section">
            <ServiceMenu />
          </section>

          {/* Recent Services Section */}
          <section className="recent-services-section">
            <RecentServices />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;