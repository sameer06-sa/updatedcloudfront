import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import SignIn from './Screens/SignIn/Signin';
import VerifyCode from './Screens/VerifyCode/VerifyCode';
import SignupForm from './Screens/Signup/Signup';
import Home from './Screens/Home/Home';

// All_Services which is in home page
import DataStoreService from './Screens/AllServices/DataStoreService/DataStoreService';
import TeamCollaborations from './Screens/AllServices/TeamCollaborations/TeamCollaborations';
import IntegrationService from './Screens/AllServices/IntegrationService/IntegrationService';
import ReportingAnalytics from './Screens/AllServices/ReportingAnalytics/ReportingAnalytics';
import Help from './Screens/AllServices/Help/Help';

import Sidebar from './Components/Sidebar/Sidebar';  // Regular Sidebar
import UserSidebar from './Settings/UsersSidebar';  // UserSidebar 
import VerifyIdentity from './Screens/VerifyIdentity/VerifyIdentity';
import LandingPage from './Screens/LandingPage/LandingPage';
import AllServices from './Screens/AllServices/AllServices';
import Dashboard from './Screens/Management_System/Dashboard/Dashboard';
import ProjectsPage from './Screens/Projects/Project';
import Users from './Screens/MyManage/Users/Users';
import Notifications from './Components/Notifications/Notifications';
import { RecentServicesProvider } from './Context/RecentServicesContext';
import SubscriptionPlans from './Components/Subscriptions/Subscription_plans';
import Free_trail_sub from './Components/Subscriptions/Free_trail_sub';
import Payment from './Components/Subscriptions/Payment';
import Payment_Details from './Components/Subscriptions/Payment_Details';
import OrganizationPage from './Screens/Organization/Organization';
import CreateOrganization from './Screens/CreateOrganization/CreateOrganization';
import CreateProjectForm from './Screens/Projects/CreateProject/CreateProject';

import Header from './Components/Header/Header'; // Import Header component

// Import User Management Components
import CreateUser from './Components/UserManagement/CreateUser';
import EditUser from './Components/UserManagement/EditUser';
import UserList from './Components/UserManagement/UserList';
import DeleteUser from './Components/UserManagement/DeleteUser'; // Import DeleteUser component
import Docs from './Components/Sidebar/Docs/Docs';
import Settings from './Settings/Settings';
import HubIngest from './Screens/AllServices/IntegrationService/HubIngest/HubIngest';
import CreateHubIngest from './Screens/AllServices/IntegrationService/HubIngest/CreateHubIngest/CreateHubIngest';
import Services from './Screens/AllServices/CreateService/CreateService';
import Success from './Components/Subscriptions/Success';
import Failure from './Components/Subscriptions/Failure';

function App() {
  const [notifications, setNotifications] = useState(() => {
    // Retrieve notifications from local storage on initial load
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(), // Use a unique ID for each notification
      date: new Date().toLocaleDateString(),
      message: message,
      time: "Just now"
    };
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications)); // Save to local storage
  };

  // Effect to update local storage whenever notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  return (
    <RecentServicesProvider>
      <Router>
        <div className="App font-sans">
          <ConditionalHeaderAndNotifications notifications={notifications} />

          {/* which pages using sidebar and user sidebar*/}
          <Routes>
            {/*  using Sidebar */}
            <Route path="/" element={<LandingPage addNotification={addNotification} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/verify-code" element={<VerifyCode addNotification={addNotification} />} />
            <Route path="/verify-identity" element={<VerifyIdentity />} />

            <Route path="/home" element={<><Sidebar /><Home /></>} />

            {/* All Services which is in the homepage */}
            <Route path="/data-store-services" element={<><Sidebar /><DataStoreService /></>} />
            <Route path="/team-collaborations" element={<><Sidebar /><TeamCollaborations /></>} />
            <Route path="/integration-services" element={<><Sidebar /><IntegrationService /></>} />
            <Route path="/reporting-analytics" element={<><Sidebar /><ReportingAnalytics /></>} />
            <Route path="/help-support" element={<><Sidebar /><Help /></>} />

            <Route path="/docs" element={<><Sidebar /><Docs /></>} />
            <Route path="/settings" element={<><Sidebar /><Settings /></>} />

            <Route path="/all-services" element={<><Sidebar /><AllServices /></>} />
            <Route path="/hub-ingest" element={<><Sidebar /><HubIngest /></>} />
            <Route path="/create-hub-ingest" element={<><Sidebar /><CreateHubIngest /></>} />
            <Route path="/subscriptions" element={<><Sidebar /><SubscriptionPlans /></>} />
            {/* <Route path="/notifications" element={<><Sidebar /><Notifications /></>} /> */}
            
            <Route path="/organizations" element={<><Sidebar /><OrganizationPage /></>} />
            <Route path="/create-organization" element={<><Sidebar /><CreateOrganization /></>} />

            {/*  using Sidebar */}
            <Route path="/dashboard" element={<><Sidebar /><Dashboard /></>} />
            <Route path="/projects" element={<><Sidebar /><ProjectsPage /></>} />
            <Route path="/create-project" element={<><Sidebar /><CreateProjectForm /></>} />

            {/* using  UserSidebar */}
            <Route path="/manage-users" element={<><UserSidebar /><Users /></>} />
            {/* Add other management routes with UserSidebar as needed */}

            <Route path="/freetrail" element={<><Sidebar /><Free_trail_sub /></>} />
            <Route path="/payment" element={<><Sidebar /><Payment /></>} />
            <Route path="/paymentdetails" element={<><Sidebar /><Payment_Details /></>} />
            {/* <Route path="/service" element={<><Sidebar /><Services /></>} /> */}

            <Route path="/payment-success" element={<Success />} />
            <Route path="/payment-failure" element={<Failure />} />

            {/* User Management Routes */}
            <Route path="/manage-users" element={<><UserSidebar /><UserList /></>} />
            <Route path="/create-user" element={<><UserSidebar /><CreateUser /></>} />
            <Route path="/edit-user/:id" element={<><UserSidebar /><EditUser /></>} />
            <Route path="/delete-user/:id" element={<><UserSidebar /><DeleteUser /></>} /> {/* Added DeleteUser route */}

          </Routes>
        </div>
      </Router>
    </RecentServicesProvider>
  );
}

const ConditionalHeaderAndNotifications = ({ notifications }) => {
  const location = useLocation();

  // Define the routes where you want to show the header and notifications
  const showHeaderRoutes = [
    '/notifications',
  ];

  // Check if the current route is one of the routes to show the header and notifications
  const shouldShowHeader = showHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && (
        <>
          <Header /> {/* Render Header only if on the specified routes */}
          <Notifications notifications={notifications} /> {/* Render Notifications only if on the specified routes */}
        </>
      )}
    </>
  );
};

export default App;