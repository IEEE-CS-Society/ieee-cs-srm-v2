import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { memo } from "react";

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const expandBox = keyframes`
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #1c1c1c;
  color: #fff;
  animation: ${fadeIn} 1s ease-in-out;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 40px;
  }
`;

const WorkSection = styled.div`
  animation: ${fadeIn} 1.2s ease-in-out;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    flex: 1;
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #ffb800;
  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const Description = styled.p`
  margin: 15px 0;
  line-height: 1.6;
  font-size: 16px;
  color: #d1d1d1;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const ShowMoreButton = styled.button`
  background-color: #ffb800;
  color: #000;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  border-radius: 25px;
  transition: 0.3s;
  animation: ${fadeIn} 1.4s ease-in-out;

  &:hover {
    background-color: #ff9500;
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(255, 184, 0, 0.4);
  }

  @media (min-width: 768px) {
    font-size: 16px;
    padding: 12px 25px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  animation: ${fadeIn} 1.6s ease-in-out;
  @media (min-width: 768px) {
    flex: 2;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
`;

const WorkCard = styled.div`
  background: #333;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeIn} 1.8s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  }

  @media (min-width: 768px) {
    padding: 25px;
  }
`;

const ImagePlaceholder = styled.div`
  height: 120px;
  background: #9573c4;
  border-radius: 12px;
  animation: ${fadeIn} 2s ease-in-out;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 768px) {
    height: 150px;
  }
`;

const Tag = styled.span`
  background-color: #ffb800;
  color: #000;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 12px;
  align-self: flex-start;
  animation: ${fadeIn} 2.2s ease-in-out;
  @media (min-width: 768px) {
    padding: 8px 15px;
  }
`;

const WorkTitle = styled.h3`
  font-size: 20px;
  margin: 0;
  color: #fff;
  animation: ${fadeIn} 2.4s ease-in-out;
  @media (min-width: 768px) {
    font-size: 22px;
  }
`;

const ReadMore = styled.button`
  margin-top: auto;
  color: #ffb800;
  background: none;
  border: none;
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: 0.3s;
  animation: ${fadeIn} 2.6s ease-in-out;

  &:hover {
    color: #fff;
  }

  &::after {
    content: "\2192";
    margin-left: 8px;
    transition: margin-left 0.3s;
  }

  &:hover::after {
    margin-left: 12px;
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-in-out;
  padding: 20px;
`;

const LightboxContent = styled.div`
  background: #222;
  color: #fff;
  padding: 30px;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  animation: ${expandBox} 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (min-width: 768px) {
    max-width: 700px;
    padding: 40px;
  }
`;

const LightboxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #444;
`;

const LightboxTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #ffb800;
  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const LightboxCloseButton = styled.button`
  background: none;
  border: none;
  color: #ffb800;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ff4d4d;
  }

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const LightboxDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const LightboxDetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #333;
  padding: 10px;
  border-radius: 10px;
`;

const LightboxDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  background: #333;
  padding: 15px;
  border-radius: 10px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const LightboxButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }
`;

const LightboxButton = styled.button`
  background-color: #ffb800;
  color: #000;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  border-radius: 15px;
  transition: 0.3s;
  box-shadow: 0 5px 15px rgba(255, 184, 0, 0.4);

  &:hover {
    background-color: #ff9500;
    transform: translateY(-5px);
  }

  @media (min-width: 768px) {
    font-size: 18px;
    padding: 12px 25px;
  }
`;

const data = [
    { tag: "Conference", title: "The Future of Web Development", details: "Join us for an in-depth look at the future of web development, including new technologies and trends.", time: "10:00 AM - 4:00 PM", place: "Tech Conference Center, NY", date: "March 15, 2024", fees: "$99", benefits: "Certificate of Participation, Lunch, and Networking Opportunities" },
    { tag: "Workshop", title: "Hands-on JavaScript Training", details: "Get hands-on training with JavaScript in this interactive workshop led by industry experts.", time: "9:00 AM - 5:00 PM", place: "Online", date: "April 10, 2024", fees: "$49", benefits: "Live Q&A, Access to Recording, and Practice Materials" },
    { tag: "Webinar", title: "Digital Marketing Insights", details: "Learn the latest insights in digital marketing from top professionals in the field.", time: "6:00 PM - 8:00 PM", place: "Online", date: "May 5, 2024", fees: "Free", benefits: "E-book and Webinar Recording" },
    { tag: "Meetup", title: "User Experience Design Meetup", details: "Meet fellow designers and discuss the latest trends in user experience design.", time: "5:00 PM - 7:00 PM", place: "Downtown Design Hub, SF", date: "June 20, 2024", fees: "$10", benefits: "Snacks and Networking Opportunities" },
    { tag: "Hackathon", title: "Automation and AI Challenge", details: "Join our hackathon and showcase your skills in automation and artificial intelligence.", time: "48 Hours", place: "Innovation Lab, LA", date: "July 15-17, 2024", fees: "$25", benefits: "Prizes, Swag, and Job Opportunities" },
    { tag: "Seminar", title: "SEO Best Practices 2024", details: "Discover the best practices for SEO in 2024 and stay ahead of the competition.", time: "2:00 PM - 5:00 PM", place: "Marketing HQ, Chicago", date: "August 10, 2024", fees: "$30", benefits: "SEO Checklist and Networking" },
];

const App = () => {
    const [lightbox, setLightbox] = useState(null);

    const openLightbox = (event) => {
        setLightbox(event);
    };

    const closeLightbox = () => {
        setLightbox(null);
    };

    return (
        <Container>
            <WorkSection>
                <Title>Upcoming Events</Title>
                <Description>
                    Discover our latest events, conferences, and workshops. Join us and
                    stay ahead in the ever-evolving tech industry. Learn, grow, and
                    connect with like-minded professionals.
                </Description>
                <ShowMoreButton>Show More Events</ShowMoreButton>
            </WorkSection>
            <GridContainer>
                {data.map((item, index) => (
                    <WorkCard key={index}>
                        <ImagePlaceholder />
                        <Tag>{item.tag}</Tag>
                        <WorkTitle>{item.title}</WorkTitle>
                        <ReadMore onClick={() => openLightbox(item)}>Read more</ReadMore>
                    </WorkCard>
                ))}
            </GridContainer>
            {lightbox && (
                <LightboxOverlay>
                    <LightboxContent>
                        <LightboxHeader>
                            <LightboxTitle>{lightbox.title}</LightboxTitle>
                            <LightboxCloseButton onClick={closeLightbox}>&times;</LightboxCloseButton>
                        </LightboxHeader>
                        <LightboxDescription>{lightbox.details}</LightboxDescription>
                        <LightboxDetails>
                            <LightboxDetailItem><FaClock /> <strong>Time:</strong> {lightbox.time}</LightboxDetailItem>
                            <LightboxDetailItem><FaMapMarkerAlt /> <strong>Place:</strong> {lightbox.place}</LightboxDetailItem>
                            <LightboxDetailItem><FaRegCalendarAlt /> <strong>Date:</strong> {lightbox.date}</LightboxDetailItem>
                            <LightboxDetailItem><FaTicketAlt /> <strong>Fees:</strong> {lightbox.fees}</LightboxDetailItem>
                            <LightboxDetailItem><IoMdPeople /> <strong>Benefits:</strong> {lightbox.benefits}</LightboxDetailItem>
                        </LightboxDetails>
                        <LightboxButtonContainer>
                            <LightboxButton>One-Tap Register</LightboxButton>
                            <LightboxButton>Register</LightboxButton>
                        </LightboxButtonContainer>
                    </LightboxContent>
                </LightboxOverlay>
            )}
        </Container>
    );
};

export default memo(App);
