import React, { useState } from 'react';
import EventGrid from './EventGrid';
import EventModal from './EventModal';
import AnimatedBackground from './AnimatedBackground';
import './Events.css';

import TechImg from '../../assets/events/tech.jpg';
import HackImg from '../../assets/events/hackathon.jpg';
import BootImg from '../../assets/events/boot.jpg';
import AIImg from '../../assets/events/ai.jpg';
import CyberImg from '../../assets/events/cyber.jpg';
import IoTImg from '../../assets/events/IoT.jpg';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "2024-11-15",
      time: "09:00 AM",
      venue: "Turning hall TP",
      info: [
        "Explore latest advancements in technology",
        "Engage with keynote speakers renowned in their fields",
        "Participate in hands-on workshops and breakout sessions",
        "Network with peers and industry experts",
        "Showcase innovative products and technologies",
        "Platform for knowledge sharing and collaboration"
      ],
      icon: "fa-microphone",
      image: TechImg
    },
    {
      id: 2,
      title: "Hackathon",
      date: "2024-12-01",
      time: "10:00 AM",
      venue: "TP Ganeshan",
      info: [
        "Collaborative event for developers, designers, and innovators",
        "Create groundbreaking applications within a limited timeframe",
        "Work in teams to brainstorm ideas and design prototypes",
        "Present projects to judges with chance to win prizes",
        "Emphasizes creativity, technical skills, and teamwork",
        "Gain valuable experience and connections"
      ],
      icon: "fa-code",
      image: HackImg
    },
    {
      id: 3,
      title: "IEEE Bootcamp",
      date: "2025-01-10",
      time: "02:00 PM",
      venue: "UB",
      info: [
        "Intensive educational program for students and early-career professionals",
        "Gain practical technical skills and knowledge in specialized areas",
        "Hands-on projects and interactive workshops led by industry professionals",
        "Culminates in project presentations",
        "Receive constructive feedback on newly acquired skills",
        "Opens doors to networking opportunities within IEEE community"
      ],
      icon: "fa-laptop-code",
      image: BootImg
    },
    {
      id: 4,
      title: "AI Symposium",
      date: "2025-02-20",
      time: "11:00 AM",
      venue: "Virtual Event",
      info: [
        "Platform for discussing latest advancements in artificial intelligence",
        "Share insights on emerging trends and ethical considerations",
        "Features keynote presentations from leading experts",
        "Panel discussions encouraging diverse perspectives",
        "Opportunities for attendees to present research findings",
        "Fosters collaboration and knowledge exchange in AI"
      ],
      icon: "fa-brain",
      image: AIImg
    },
    {
      id: 5,
      title: "Cybersecurity Workshop",
      date: "2025-03-15",
      time: "03:00 PM",
      venue: "TP Auditorium",
      info: [
        "Enhance understanding of security measures in the digital age",
        "Led by experienced cybersecurity professionals",
        "Covers threat detection and data protection strategies",
        "Learn ethical hacking techniques",
        "Engage in hands-on exercises and real-world scenarios",
        "Equip yourself with practical skills to safeguard digital assets"
      ],
      icon: "fa-shield-alt",
      image: CyberImg
    },
    {
      id: 6,
      title: "IoT Expo",
      date: "2025-04-05",
      time: "10:00 AM",
      venue: "Innovation Center",
      info: [
        "Showcase of latest innovations in Internet of Things (IoT) ecosystem",
        "Explore new IoT applications, devices, and solutions",
        "Participate in keynote sessions and panel discussions",
        "Attend product demonstrations",
        "Network with experts and peers in IoT field",
        "Gain insights into the future of connectivity and automation"
      ],
      icon: "fa-network-wired",
      image: IoTImg
    }
  ];

  return (
    <div className="App">
      <AnimatedBackground />
      <div className="container">
        <div className="logo">
          <div className="logo-circle">φ</div>
          <div className="logo-text">
            <h2>IEEE</h2>
            <h3>COMPUTER SOCIETY</h3>
          </div>
        </div>
        <h1>Upcoming IEEE Events</h1>
        <p className="intro-paragraph">
          <strong>Join Us for an Exciting Experience! </strong>
          We are thrilled to invite you to participate in our upcoming events, 
          where creativity and innovation come together! 
          Whether you're looking to learn something new, meet like-minded individuals, 
          or showcase your talents, there's something for everyone. 
          Don't miss this opportunity to engage with our vibrant community, share your ideas, 
          and make lasting connections. Mark your calendars, bring your friends, and get ready for an unforgettable experience! 
          We can't wait to see you there!
        </p>
        <EventGrid events={events} setSelectedEvent={setSelectedEvent} />
      </div>
      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
};

export default Events; 
