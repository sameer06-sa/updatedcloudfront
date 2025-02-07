import React from "react";
import Header from "./DeploymentHeader";
import DeploymentSidebar from "../../Screens/Deploymentservices/DeploymentSidebar"; 

const CreateDeploymentTask = () => {
  return (
    <div className="flex">
     DeploymentSidebar
      <div className="w-64 fixed left-0 top-0 h-screen">
        <DeploymentSidebar />
      </div>

      {/* Main Content (Shifts Right to accommodate Sidebar) */}
      <div className="flex flex-col flex-grow ml-16">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="p-6 w-full bg-100 flex flex-col items-center">
          <div className="max-w-8xl w-full bg-white p-6 rounded-lg shadow-md mt-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-0">
              <div>
                <h1 className="text-2xl font-bold">Backend Infrastructure Enhancement</h1>
                <p className="text-gray-500">Task</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-gray-200 text-blue-600 rounded-lg">Follow</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">+ Update Status</button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Task Description */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h2 className="text-lg font-semibold">Task Description</h2>
                <textarea
                  placeholder="Add a detailed description of the deployment task..."
                  className="mt-2 w-full h-20 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  rows="4"
                ></textarea>
              </div>

              {/* Task Details */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h2 className="text-lg font-semibold">Task Details</h2>
                <div className="mt-3">
                  <p className="text-gray-600 font-medium">Status</p>
                  <p className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-yellow-500 rounded-full"></span> In Progress
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-gray-600 font-medium">Cycle</p>
                  <p>Cycle 23</p>
                </div>
              </div>
            </div>

            {/* Discussion & Timeline */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              {/* Discussion */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h2 className="text-lg font-semibold">Discussion</h2>
                <textarea
                  placeholder="Add a comment... Use # to reference tasks. @ to mention team members"
                  className="mt-2 w-full h-20 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  rows="4"
                ></textarea>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">Post Comment</button>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h2 className="text-lg font-semibold">Timeline</h2>
                <div className="mt-2">
                  <label className="block text-gray-600 font-medium">Start Date</label>
                  <input type="date" className="w-full p-2 border rounded-lg mt-1" />
                </div>
                <div className="mt-2">
                  <label className="block text-gray-600 font-medium">Due Date</label>
                  <input type="date" className="w-full p-2 border rounded-lg mt-1" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDeploymentTask;
