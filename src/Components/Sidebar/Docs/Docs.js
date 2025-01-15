import React, { useEffect } from 'react';
import { useServiceTracking } from "../../../Hooks/UseServiceTracking";

import '../Docs/Docs.css';
import Header from "../../../Components/Header/Header";

function Docs() {
    const startTracking = useServiceTracking();

    useEffect(() => {
        // Track when page loads
        startTracking('Docs', 'Documents');
    }, []);

    return (
        <div className="app-container">
            <Header />
        </div>
    );
}

export default Docs;