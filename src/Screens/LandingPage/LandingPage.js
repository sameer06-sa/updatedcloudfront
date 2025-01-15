import React from 'react';
import SignupForm from '../Signup/Signup';
import styles from './LandingPage.module.css';

const services = [
  {
    title: "Cloud Solutions",
    description: "Scalable and secure cloud infrastructure solutions",
    icon: "🌥️"
  },
  {
    title: "Data Analytics",
    description: "Transform raw data into business insights",
    icon: "📊"
  },
  {
    title: "AI Integration",
    description: "Cutting-edge AI solutions for your workflow",
    icon: "🤖"
  },
  {
    title: "Cybersecurity",
    description: "Advanced security for digital assets",
    icon: "🔒"
  }
];

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      {/* Two Column Layout */}
      <div className={styles.container}>
        {/* Left Side - Scrolling Services */}
        <div className={styles.servicesSection}>
          <h1 className={styles.title}>Application Name</h1>
          <div className={styles.ScrollContainer}>
            <div className={styles.crawlContent}>
              {services.concat(services).map((service, index) => (
                <div key={index} className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className={styles.signupSection}>
          <SignupForm/>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;