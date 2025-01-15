import React, { useEffect } from 'react';
import { useServiceTracking } from "../../../Hooks/UseServiceTracking";

import '../TeamCollaborations/TeamCollaborations.css';
import Header from "../../../Components/Header/Header";

function TeamCollaborations() {

    const startTracking = useServiceTracking();

    useEffect(() => {
        // Track when page loads
        startTracking('Team Collaboration', 'Services');
    }, []);

    return (
        <div className="app-container">
            <Header />
        </div>
    );
}

export default TeamCollaborations;