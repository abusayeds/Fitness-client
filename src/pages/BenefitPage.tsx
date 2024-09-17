import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const benefits = [
  {
    id: 1,
    image:
      "https://carolbike.com/wp-content/uploads/2023/04/admin-site.carolbike-min.png",
    text: " Benefit 2: Improve your efficiency and productivity with this amazing product.",
    subText1:
      "lorem your efficiency and productivity with this amazing product ",
    subText2:
      "lorem your efficiency and productivity with this amazing product ",
    subText3:
      "lorem your efficiency and productivity with this amazing product ",
    subText4:
      "lorem your efficiency and productivity with this amazing product ",
  },
  {
    id: 2,
    image:
      "https://i0.wp.com/smashingfifty.com/wp-content/uploads/2019/08/Joining-a-gym-1.jpg?fit=800%2C533&ssl=1",
    text: "Benefit 2: Enhance your experience with cutting-edge features and design.",
    subText1:
      "help to build strong bones, as it is a weight bearing exercise. ",
    subText2: " strengthen muscles.",
    subText3: "improve cardiovascular fitness. ",
    subText4: " burn plenty of kilojoules.",
  },
  {
    id: 3,
    image:
      "https://mightyfitness.shop/cdn/shop/files/Mighty_Fitness_Trainers_Working_Out.webp?v=1706803189&width=1920",
    text: "Benefit 3: Reliable and efficient performance for daily use.",
    subText1: "Lower risk of heart disease and stroke. ...",
    subText2: "Lower risk of type 2 diabetes or diabetes complications. ...",
    subText3: "Longer life.",
    subText4: "Lower risk of some cancers. ...",
  },
];

const BenefitPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length);
    }, 4000); // Slides every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100 overflow-hidden md:my-20 my-10 ">
      {benefits.map((benefit, index) => (
        <div
          key={benefit.id}
          className={`absolute flex flex-col md:flex-row justify-between items-center w-full h-full transition-opacity duration-500 ease-in-out 
            ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className={`w-full md:w-1/2 h-1/2 md:h-full transform transition-transform duration-[2000ms] 
              ${
                index === currentIndex ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <img
              src={benefit.image}
              alt={`Benefit ${benefit.id}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div
            className={`w-full md:w-1/2 h-1/2 md:h-full   flex flex-col items-start justify-center md:gap-8 gap-4   md:p-8 text-xl transform transition-transform duration-[2000ms] 
              ${index === currentIndex ? "translate-x-0" : "translate-x-full"}`}
          >
            <p className="text-gray-800 md:text-4xl text-sm font-bodyfont text-center md:text-left">
              {benefit.text}
            </p>

            <div className=" flex flex-col md:gap-4">
              <li className="flex items-center">
                <IoIosArrowForward className=" text-yellow-600 font-semibold "></IoIosArrowForward>
                <p className=" text-xs font-titlefont font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                  {benefit.subText1}
                </p>
              </li>
              <li className="flex items-center">
                <IoIosArrowForward className=" text-yellow-600 font-semibold "></IoIosArrowForward>
                <p className=" text-xs font-titlefont font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                  {benefit.subText2}
                </p>
              </li>
              <li className="flex items-center">
                <IoIosArrowForward className=" text-yellow-600 font-semibold "></IoIosArrowForward>
                <p className=" text-xs font-titlefont font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                  {benefit.subText3}
                </p>
              </li>
              <li className="flex items-center">
                <IoIosArrowForward className=" text-yellow-600 font-semibold "></IoIosArrowForward>
                <p className=" text-xs font-titlefont font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                  {benefit.subText3}
                </p>
              </li>
            </div>

            <Link
              className=" bg-blue-600 text-white border rounded p-4 opacity-80 hover:opacity-100"
              to="/product-page"
            >
              {" "}
              Let's Start now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BenefitPage;
