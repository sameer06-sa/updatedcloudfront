import React, { useEffect } from 'react';
import { useServiceTracking } from "../Hooks/UseServiceTracking";

import '../Settings/Settings.css';
import Header from "../Components/Header/Header";

function Settings() {
    const startTracking = useServiceTracking();

    useEffect(() => {
        // Track when page loads
        startTracking('Settings', 'Settings');
    }, []);

    return (
        <div className="app-container">
            <Header />
        </div>
    );
}

export default Settings;