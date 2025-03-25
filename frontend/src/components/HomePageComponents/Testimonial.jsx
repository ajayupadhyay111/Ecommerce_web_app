import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "I'm absolutely in love with the quality and style of products. The customer service is exceptional, and delivery is always on time!"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Professional",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "Best online shopping experience ever! The website is so easy to navigate, and the product range is impressive. Will definitely be a returning customer."
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Interior Designer",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "The attention to detail and product quality exceeded my expectations. It's refreshing to find an online store that truly cares about customer satisfaction."
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Tech Professional",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "Best online shopping experience ever! The website is so easy to navigate, and the product range is impressive. Will definitely be a returning customer."
  },
  {
    id: 5,
    name: "Emma Davis",
    role: "Interior Designer",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "The attention to detail and product quality exceeded my expectations. It's refreshing to find an online store that truly cares about customer satisfaction."
  },
];

const Testimonial = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers about their shopping experience
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-2xl shadow-lg p-8 h-[350px] transform transition-transform duration-300 hover:scale-105">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-gray-100"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">"{testimonial.text}"</p>
                <div className="mt-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .testimonial-swiper {
          padding-bottom: 50px !important;
        }
        .testimonial-swiper .swiper-pagination-bullet {
          background: #9CA3AF;
          opacity: 0.5;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #4B5563;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
