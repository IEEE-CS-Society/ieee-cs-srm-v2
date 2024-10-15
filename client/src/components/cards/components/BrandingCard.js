import React from 'react';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import BrandIc from '../images/brand.svg';

const BrandingCard = () => {
  return (
    <CardContainer className="inter-var w-full">
      <CardBody
        className="relative group/card bg-gray-600 bg-opacity-20 rounded-lg p-6 shadow-md overflow-hidden transition-transform border border-white/40">
        <CardItem translateZ={50} className="relative">
          <img
            className="w-10 h-10 mb-4"
            src={BrandIc}
            alt="Brand Icon"
          />
        </CardItem>

        <CardItem translateZ={40} className="relative z-10">
          <h3
            className="mb-2"
            style={{ fontFamily: 'Roboto', fontSize: '28px', fontWeight: 'bold', color: '#FFFFFF' }}
          >
            Branding
          </h3> 
        </CardItem>

        <CardItem translateZ={30} className="relative z-10">
          <p
            className="text-sm mt-5"
            style={{ fontFamily: 'Roboto', fontSize: '14px', color: '#9E9E9E' }}
          >
            Egestas tellus nunc proin amet tellus tincidunt lacus consequat. Ultrices.
          </p>
        </CardItem>

        <CardItem translateZ={0} className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900 to-transparent opacity-50 group-hover:opacity-75 transition-opacity"></CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default BrandingCard;