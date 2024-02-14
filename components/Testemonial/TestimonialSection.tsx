// components/TestimonialSection.tsx
'use client';

import React from 'react';

// components/TestimonialSection.tsx

// components/TestimonialSection.tsx

// components/TestimonialSection.tsx

// components/TestimonialSection.tsx

// components/TestimonialSection.tsx

// components/TestimonialSection.tsx

// components/TestimonialSection.tsx

// components/TestimonialSection.tsx

interface Testimonial {
  id: number;
  name: string;
  testimonial: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Doe',
    testimonial:
      'Incredible service fromPatientFlowHQ! Their expertise and attention to detail resulted in a final product that exceeded my expectations. I highly recommend them for anyone seeking top-notch services..',
  },
  {
    id: 2,
    name: 'Jane Smith',
    testimonial:
      'Incredible service fromPatientFlowHQ! Their expertise and attention to detail resulted in a final product that exceeded my expectations. I highly recommend them for anyone seeking top-notch services.',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    testimonial:
      'Incredible service fromPatientFlowHQ! Their expertise and attention to detail resulted in a final product that exceeded my expectations. I highly recommend them for anyone seeking top-notch services.',
  },
];

const TestimonialCard: React.FC<Testimonial> = ({ name, testimonial }) => {
  const isCenterCard = name === 'Jane Smith'; // Adjust based on your data or logic

  return (
    <div
      className={`card p-6 rounded-md shadow-md ${
        isCenterCard ? 'md:transform md:scale-125' : ''
      }`}
    >
      <p className="text-gray-600 mb-4 xl:text-2xl">"{testimonial}"</p>
      <p className="font-bold">{name}</p>
    </div>
  );
};

const TestimonialSection: React.FC = () => {
  return (
    <div className="container text-center mx-auto py-12 ">
      <h2 className="text-2xl xl:text-3xl font-medium mb-12">
        What our partners have say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 xl:gap-x-20 gap-y-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
