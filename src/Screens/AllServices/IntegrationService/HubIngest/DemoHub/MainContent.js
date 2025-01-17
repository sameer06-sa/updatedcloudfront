import React from "react";
import "./MainContent.css";

function MainContent() {
  return (
    <div className="main-content2">
      <h3>Recent Services</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Last Used</th>
            <th>Project Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Demo Collection</td>
            <td>Collection</td>
            <td>20-12-2024</td>
            <td>xyz project</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MainContent;
