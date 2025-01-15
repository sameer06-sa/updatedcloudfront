// import React, { useState } from "react";
// import "./Dashboard.css";

// const menuItems = [
//   { name: "Dashboard", icon: "📊" },
//   { name: "Notifications", icon: "🔔" },
//   { name: "Team", icon: "👥" },
//   { name: "Calendar", icon: "📅" },
//   { name: "Projects", icon: "📋" },
//   { name: "Docs", icon: "📄" },
//   { name: "Others", icon: "📈" },
//   { name: "Logout", icon: "🔙", logout: true },
// ];

// const Dashboard = () => {
//   const [activeMenu, setActiveMenu] = useState("Notifications");
//   const [activeSubPage, setActiveSubPage] = useState("");

//   const handleMenuClick = (item) => {
//     if (item.logout) {
//       alert("Logging out...");
//     } else {
//       setActiveMenu(item.name);
//       setActiveSubPage(""); // Reset the sub-page when a new menu is selected
//     }
//   };

//   const newPage = (pageTitle) => {
//     setActiveSubPage(pageTitle);
//   };

//   return (
//     <div className="app">
//       {/* Top Bar */}
//       {/* <header className="top-bar">
//         <div className="logo">Application Name</div>
//         <div className="search-bar">
//           <input type="text" placeholder="Search" />
//         </div>
//         <div className="top-bar-icons">
//           <button className="upgrade-btn">Upgrade</button>
//           <span className="top-icon">🔔</span>
//           <span className="top-icon">👤</span>
//         </div>
//       </header> */}

//       {/* Main Layout */}
//       <div className="main-layout">
//         {/* Sidebar */}
//         <aside className="sidebar">
//           <ul>
//             {menuItems.map((item, index) => (
//               <li
//                 key={index}
//                 className={item.name === activeMenu ? "active" : ""}
//                 onClick={() => handleMenuClick(item)}
//               >
//                 <span className="icon">{item.icon}</span>
//                 <span className="text">{item.name}</span>
//               </li>
//             ))}
//           </ul>
//         </aside>

//         {/* Main Content */}
//         <main className="content">
//           <div className="notification-container">
//             <h1>{activeMenu}</h1>
//             {activeMenu === "Notifications" && (
//               <button className="mark-read">Mark all as read</button>
//             )}
//           </div>
//           {activeMenu === "Notifications" ? (
//             <div className="notifications">
//               <div className="tabs">
//                 <button onClick={() => newPage("Inbox")}>Inbox</button>
//                 <button onClick={() => newPage("Chats")}>Chats</button>
//                 <button onClick={() => newPage("Archive")}>Archive</button>
//               </div>
//               {activeSubPage === "Inbox" && (
//                 <div className="sub-container">
//                   <h2>Inbox</h2>
//                   <p>This is the Inbox section where you can view your messages.</p>
//                 </div>
//               )}
//               {activeSubPage === "Chats" && (
//                 <div className="sub-container">
//                   <h2>Chats</h2>
//                   <p>This is the Chats section for ongoing conversations.</p>
//                 </div>
//               )}
//               {activeSubPage === "Archive" && (
//                 <div className="sub-container">
//                   <h2>Archive</h2>
//                   <p>This is the Archive section for saved messages.</p>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <p>This is the content for the "{activeMenu}" section.</p>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;