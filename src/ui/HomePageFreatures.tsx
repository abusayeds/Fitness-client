import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "100% Authentic Products",
    description:
      "Embrace authenticity with RoyalBlue. Our 100% genuine products ensure a true commitment to quality, elevating your fitness experience with trust and excellence.",
    image:
      "https://www.hussle.com/blog/wp-content/uploads/2020/12/Gym-structure.png",
  },
  {
    title: "Extensive Warranty",
    description:
      "RoyalBlue ensures your peace of mind with a genuine and extensive warranty on all products. Elevate your fitness journey with confidence – choose RoyalBlue for lasting quality.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsO0djpj3KYkJ3tPtHP_iJJ904ANdAICizg&s",
  },
  {
    title: "Delivering All Over Bangladesh",
    description: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrHZcpATGDg7VsVwpi4qv6gw5Q4Lku0HHoldiwNj2j8nBMi0NqNZs2bSXU0Zrv6VopIQM&usqp=CAU",
  },
  {
    title: "Best Customer Care Service",
    description: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwYZ-5cG8_cOGYWFs4BKDVpdmk72woZrcNdw&s",
  },
  {
    title: "Unrivaled Quality",
    description: "",
    image:
      "https://www.canfitpro.com/wp-content/uploads/2022/06/How-To-Avoid-the-Gym-Dead-Zone-This-Summer-Featured-Blog-1024x536.jpg",
  },
];

const HomePageFreatures = () => {
  return (
    <section className="pb-10 px-4">
      <p className=" text-center py-10  text-4xl font-titlefont">
        Why Choose US?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-4  ">
        {features.slice(0, 2).map((feature, index) => (
          <Link
            state={{
              category: "",
            }}
            to="/product-page"
            key={index}
            className="relative overflow-hidden  shadow-lg group w-full"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 text-white">
              <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
              {feature.description && (
                <p className="text-sm">{feature.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 mt-4  ">
        {features.slice(2, 5).map((feature, index) => (
          <Link
            state={{
              category: "",
            }}
            to="/product-page"
            key={index}
            className="relative overflow-hidden  shadow-lg group w-full"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 text-white">
              <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
              {feature.description && (
                <p className="text-sm">{feature.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomePageFreatures;
