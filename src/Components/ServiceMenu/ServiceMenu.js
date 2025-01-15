import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaChartLine, FaUsers, FaPlug, FaChartPie, FaHeadset } from "react-icons/fa";
import { BsFillDatabaseFill } from "react-icons/bs";import './ServiceMenu.css';
import { IoIosHelpCircle } from "react-icons/io";
import { MdIntegrationInstructions } from "react-icons/md";
 
function ServiceMenu() {
    const navigate = useNavigate();
 
    const menuItems = [
        { label: "All Services", icon: <FaPlusCircle className="icon-blue" />, path: "/all-services" },
        { label: "Data Storage", icon: <BsFillDatabaseFill className="icon-blue" />, path: "/data-store-services" },
        { label: "Team Collaboration", icon: <FaUsers className="icon-blue" />, path: "/team-collaborations" },
        { label: "Integrations", icon: <MdIntegrationInstructions className="icon-blue" />, path: "/integration-service" },
        { label: "Reporting and Analytics", icon: <FaChartPie className="icon-blue" />, path: "/reporting-analytics" },
        { label: "Help and Support", icon: <IoIosHelpCircle className="icon-blue" />, path: "/help-support" }
    ];
 
    const handleNavigation = (path) => {
        if (path) {
            navigate(path);
        }
    };
 
    return (
        <div className="service-menu">
            <h1 className="service-title">Application_name Services</h1>
            <div className="menu-container">
                <div className="menu-scroll">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            className="menu-item"
                            onClick={() => handleNavigation(item.path)}
                        >
                            {item.icon}
                            <span className="menu-label">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default ServiceMenu;