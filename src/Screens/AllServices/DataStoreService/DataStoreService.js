import React, { useEffect } from 'react';
import { useServiceTracking } from "../../../Hooks/UseServiceTracking";

import '../DataStoreService/DataStoreService.css';
import Header from "../../../Components/Header/Header";

function DataStoreService() {
    const startTracking = useServiceTracking();

    useEffect(() => {
        // Track when page loads
        startTracking('Data Store', 'Services');
    }, []);

    return (
        <div className="app-container">
            <Header />
        </div>
    );
}

export default DataStoreService;