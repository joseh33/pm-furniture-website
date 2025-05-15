// TestimonialsSection.jsx

import React from 'react';
import testimonials from "./review_data.jsx";
import TestimonialTile from "./review_tile.jsx";

const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold">What Our Customers Say</h2>
        <p className="mt-2 text-gray-600">
          Our customers love our products! Read what they have to say below.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialTile key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
