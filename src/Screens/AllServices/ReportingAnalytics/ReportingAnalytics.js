import React, { useEffect } from 'react';
import { useServiceTracking } from "../../../Hooks/UseServiceTracking";

import '../ReportingAnalytics/ReportingAnalytics.css';
import Header from "../../../Components/Header/Header";

function ReportingAnalytics() {

    const startTracking = useServiceTracking();

    useEffect(() => {
        // Track when page loads
        startTracking('Reporting & Analytics', 'Services');
    }, []);
    
    return (
        <div className="app-container">
            <Header />
        </div>
    );
}

export default ReportingAnalytics;