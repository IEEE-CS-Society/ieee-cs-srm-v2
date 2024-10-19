import React, { memo } from "react";
import styled, { keyframes } from "styled-components";
import Image1 from '../../assets/images/12.png';

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  background: #000;
  color: #fff;
  animation: ${fadeIn} 1s ease-in-out;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 1.2s ease-in-out;
  max-width: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: -300px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 1000px;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  max-width: 500px;
  animation: ${fadeIn} 1.4s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
    padding: 0;
  }
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #d1d1d1;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const ConnectButton = styled.button`
  background: none;
  border: 2px solid #ffb800;
  color: #ffb800;
  padding: 15px 30px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: #ffb800;
    color: #000;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const WhyChooseUs = () => {
    return (
        <div>
            <Container>
                <ImageContainer>
                    <StyledImage src={Image1} alt="Why choose us illustration" />
                </ImageContainer>
                <TextContainer>
                    <Title>Our Team</Title>
                    <Description>
                        Meet the incredible minds driving our success. From creative visionaries to tech enthusiasts, each member of
                        our team brings a unique skill set that helps us grow, innovate, and create lasting impact.
                    </Description>
                    <ConnectButton>Let's Connect</ConnectButton>
                </TextContainer>
            </Container>
        </div>
    );
};

export default memo(WhyChooseUs);
