import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import T1 from '../testimonials/1.svg';
import T2 from '../testimonials/2.svg';

const Testimonials = () => {
  const testimonials = [
    { name: "Brooklyn Simmons", role: "mamam", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: T1 },
    { name: "Arlene McCoy", role: "blogspot", text: "Eros eget lorem commodo sagittis enim in viverra.", image: T1 },
    { name: "Jane Cooper", role: "unspell", text: "Amet aliquam, volutpat nisi duis sed et.", image: T1 },
    { name: "Alex Johnson", role: "developer", text: "Integer malesuada nunc vel risus commodo viverra maecenas.", image: T2 },
    { name: "Emily Davis", role: "designer", text: "Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.", image: T2 },
    { name: "Michael Brown", role: "entrepreneur", text: "Scelerisque purus semper eget duis at tellus at.", image: T2 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsToShow = 3;

  const handleNext = () => {
    if (currentIndex + testimonialsToShow < testimonials.length) {
      setCurrentIndex(currentIndex + testimonialsToShow);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - testimonialsToShow >= 0) {
      setCurrentIndex(currentIndex - testimonialsToShow);
    }
  };

  return (
    <section className="bg-dark-bg text-white py-16 px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-16 font-bold" style={{ fontFamily: 'Roboto', fontWeight: 'bold', color: '#FFFFFF', fontSize: '16px' }}>
          Hear what students say :)
        </h2>

        <div className="flex space-x-4">
          <button
            className="rounded-lg border-2 border-orange-500 p-2 hover:bg-orange-500 hover:bg-opacity-20 transition transform hover:scale-105 hover:shadow-2xl"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <FiChevronLeft size={30} className="text-orange-500" />
          </button>
          <button
            className="rounded-lg border-2 border-orange-500 p-2 hover:bg-orange-500 hover:bg-opacity-20 transition transform hover:scale-105 hover:shadow-2xl"
            onClick={handleNext}
            disabled={currentIndex + testimonialsToShow >= testimonials.length}
          >
            <FiChevronRight size={30} className="text-orange-500" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {testimonials.slice(currentIndex, currentIndex + testimonialsToShow).map((testimonial, index) => (
          <div
            key={index}
            className="border border-gray-600 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 'bold', color: '#FFFFFF' }}>{testimonial.name}</h3>
                <p className="text-sm" style={{ fontFamily: 'Roboto', color: '#9E9E9E', fontSize: '16px', fontWeight: 'bold' }}>{testimonial.role}</p>
              </div>
            </div>
            <p style={{ fontFamily: 'Roboto', color: '#FFFFFF', fontWeight: 'bold', fontSize: '16px' }}>{testimonial.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;