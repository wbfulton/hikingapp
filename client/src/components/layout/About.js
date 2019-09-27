import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="about">
      <div className="dark-overlay">
        <div className="about-inner pt">
          {/* Section 1 */}
          <div className="m">
            <h3 className="text-primary">Who are We?</h3>
            <p className="text-center">
              We are a student led organization at the University of Washington
              - Seattle campus.
            </p>
            <div className="line"></div>
          </div>
          {/* Section 2 */}
          <div>
            <h3 className="text-primary">What do We Do?</h3>
            <p className="text-center m">
              Our purpose is to create a thriving community of snowboarders and
              skiers alike that share a love for the mountains and all things
              snow! Husky Snow Club is set up as a ride-share network for
              students at the University of Washington. We pair up team members
              in groups of 3 or more to go to local mountains through our
              Facebook page. To support these groups we reimburse the drivers
              for their gas money making it free for members to find a way to
              the mountain!
            </p>
            <div className="line"></div>
          </div>
          {/* Section 3 */}
          <div className="m">
            <h3 className="text-primary">How much does it cost?</h3>
            <p className="text-center">
              The membership fee is 30 dollars which can be paid through Venmo
              to huskysnowclub.
            </p>
            <h3 className="text-primary">How do I contact the club?</h3>
            <p className="text-center">
              Message one of our officers, call us at 408-523-1234, or contact
              us on our{' '}
              <a href="https://www.facebook.com/pg/huskysnowclub/">
                facebook page!
              </a>
            </p>
            <div className="line"></div>
          </div>
          {/* Buttons */}
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
