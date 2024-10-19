import React, {memo} from "react";
import styled, { keyframes } from 'styled-components';

const wireAnimation = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

const FooterContainer = styled.div`
  background-color: #000;
  color: white;
  padding: 3rem 0;
  position: relative;
  overflow: hidden;
`;

const AnimatedWire = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #f9a826, #fff, #f9a826);
  animation: ${wireAnimation} 3s infinite ease-in-out;
`;

const ContactSection = styled.div`
  background-color: #f9a826;
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 30px;
  margin: 0 auto;
  max-width: 1000px;
`;

const ContactHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const ContactText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const EmailForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const EmailInput = styled.input`
  padding: 1rem;
  border: none;
  border-radius: 25px;
  width: 20rem;
  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  background-color: #000;
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  &:hover {
    background-color: #333;
  }
`;

const FooterBottom = styled.div`
  padding: 2rem 0;
  text-align: center;
`;

const FooterLogo = styled.div`
  margin-bottom: 1rem;
`;

const FooterLogoText = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const FooterLogoSubText = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #f9a826;
`;

const GoToTopButton = styled.button`
  padding: 0.75rem 2rem;
  border: 1px solid #f9a826;
  border-radius: 25px;
  color: #f9a826;
  background-color: transparent;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #f9a826;
    color: #000;
  }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <ContactSection>
                <ContactHeading>Subscribe To Our Newsletter</ContactHeading>
                <ContactText>
                    Get your early updates to the new events as well as your magzines.
                </ContactText>
                <EmailForm>
                    <EmailInput type="email" placeholder="Your email" />
                    <SendButton>SEND</SendButton>
                </EmailForm>
            </ContactSection>
            <FooterBottom>
                <FooterLogo>
                    <FooterLogoText>IEEE CS Society : SRM University</FooterLogoText>
                    <FooterLogoSubText>2024 All Rights reserved . IEEE CS Society , SRM Kattankulathur , Chennai</FooterLogoSubText>
                </FooterLogo>
                <GoToTopButton>GO TO TOP</GoToTopButton>
            </FooterBottom>
            <AnimatedWire />
        </FooterContainer>
    );
};

export default memo(Footer);
