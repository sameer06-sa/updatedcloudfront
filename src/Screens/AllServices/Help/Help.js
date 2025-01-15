import React, { useEffect } from 'react';
import { useServiceTracking } from "../../../Hooks/UseServiceTracking";

import '../Help/Help.css';
import Header from "../../../Components/Header/Header";

function Help() {
    const startTracking = useServiceTracking();

    useEffect(() => {
        // Track when page loads
        startTracking('Help', 'Support');
    }, []);

    return (
        <div className="app-container">
            <Header />
        </div>
    );
}

export default Help;