import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';
import Header from '../../../Components/Header/Header';

const CreateService = () => {
  const [serviceName, setServiceName] = useState('');
  const [subscriptionName, setSubscriptionName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [projectName, setProjectName] = useState('');
//   const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      serviceName,
      subscriptionName,
      organizationName,
      projectName,
    });
    // Redirect to a confirmation page or perform other actions
    // router.push('/confirmation');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Header />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Create a Service</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="service-name" className="block font-medium mb-2">
              Service name *
            </label>
            <input
              type="text"
              id="service-name"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subscription-name" className="block font-medium mb-2">
              Subscription name *
            </label>
            <select
              id="subscription-name"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={subscriptionName}
              onChange={(e) => setSubscriptionName(e.target.value)}
              required
            >
              <option value="">Select a subscription</option>
              <option value="subscription1">Subscription 1</option>
              <option value="subscription2">Subscription 2</option>
              <option value="subscription3">Subscription 3</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="organization-name" className="block font-medium mb-2">
              Organization name *
            </label>
            <input
              type="text"
              id="organization-name"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="project-name" className="block font-medium mb-2">
              Project name *
            </label>
            <div className="relative">
              <input
                type="text"
                id="project-name"
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pr-10"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                <FaPlus className="text-gray-400 hover:text-gray-600" />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md mr-2"
            //   onClick={() => router.push('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateService;