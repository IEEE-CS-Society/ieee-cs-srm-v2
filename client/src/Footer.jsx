import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {}
        <div className="footer-discuss">
          <h2>Let's discuss the idea</h2>
          <p>
            Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta
            feugiat scelerisque in elit.
          </p>
          <form className="email-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">SEND</button>
          </form>
        </div>

        {}
        <div className="footer-links">
          {}
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About us</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>
          
          {}
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><a href="#branding">Branding</a></li>
              <li><a href="#webdev">Web Development</a></li>
              <li><a href="#digital">Digital Marketing</a></li>
            </ul>
            </div>
            <div className="footer-column">
            <h4>Follow us</h4>
            <ul>
              <li><a href="https://www.instagram.com/ieeecs_srmist/">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/ieee-computer-society-srmist/">LinkedIn</a></li>
              <li><a href="https://x.com/IEEECS_SRMIST">X</a></li>
              </ul>
          </div>
          
          {}
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#casestudy">Case Study</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </div>
          {}
        <div className="go-to-top">
          <button onClick={() => window.scrollTo(0, 0)}>GO TO TOP</button>
        </div>
        </div>

        {}
        <div className="footer-social">
          <form className="email-updates-form">
            <label>Get latest updates</label>
            <input type="email" placeholder="Your email" />
          </form>
        </div>

    

        {}
        <div className="footer-credit">
          <p>Created by IEEE CS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;