import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const benefits = [
  {
    id: 1,
    image:
      "https://i.ibb.co/JjK5X01/Whats-App-Image-2024-08-06-at-9-47-15-PM.jpg",
    text: " Benefit 2: Improve your efficiency and productivity with this amazing product.",
    subText1:
      "Are you looking for a general overview of the benefits of fitness ",
    subText2:
      "something more specific like benefits for a particular fitness program or feature",
    subText3: "Let me know how you'd like to proceed! ",
    subText4:
      "It seems like you're asking for a write-up related to fitness and benefits ",
  },
  {
    id: 2,
    image: "https://i.ibb.co/JCtT2Qg/3.png",
    text: "Benefit 2: Enhance your experience with cutting-edge features and design.",
    subText1:
      "help to build strong bones, as it is a weight bearing exercise. ",
    subText2: " strengthen muscles.",
    subText3: "improve cardiovascular fitness. ",
    subText4: " burn plenty of kilojoules.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/QPDfDCx/4.jpg",
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
    <main className="px-4">
      <p className="py-10 md:text-4xl text-2xl md:text-center font-titlefont">
        Benefits of a Healthy Lifestyle
      </p>
      <div className="relative flex justify-center items-center h-screen bg-gray-100 overflow-hidden  ">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.id}
            className={`absolute flex flex-col md:flex-row justify-between items-center w-full h-full transition-opacity duration-500 ease-in-out 
           ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className={`w-full md:w-1/2 h-1/2 md:h-full transform transition-transform duration-[2000ms] 
             ${index === currentIndex ? "translate-x-0" : "-translate-x-full"}`}
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
                  <IoIosArrowForward className="  text-designColor font-semibold "></IoIosArrowForward>
                  <p className=" text-xs font-titlefont font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                    {benefit.subText1}
                  </p>
                </li>
                <li className="flex items-center">
                  <IoIosArrowForward className="  text-designColor font-semibold "></IoIosArrowForward>
                  <p className=" text-xs font-titlefont font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                    {benefit.subText2}
                  </p>
                </li>
                <li className="flex items-center">
                  <IoIosArrowForward className="  text-designColor font-semibold "></IoIosArrowForward>
                  <p className=" text-xs font-titlefont font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                    {benefit.subText3}
                  </p>
                </li>
                <li className="flex items-center">
                  <IoIosArrowForward className="  text-designColor font-semibold "></IoIosArrowForward>
                  <p className=" text-xs font-titlefont font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                    {benefit.subText3}
                  </p>
                </li>
              </div>

              <Link
                className="  bg-designColor text-white border rounded p-4 opacity-80 hover:opacity-100"
                to="/product-page"
              >
                {" "}
                Let's Start now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BenefitPage;
