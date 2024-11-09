import { Link } from "react-router-dom";

const HomeCategory = () => {
  return (
    <section className="  flex flex-col  w-full  px-4  ">
      <p className="md:text-4xl text-start py-10 font-titlefont">
        Your Category Product !{" "}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full justify-center items-center">
        {[
          "https://i.ibb.co/9n9ngPv/Strength.jpg",
          "https://i.ibb.co/55h8BTZ/cardio-or-weights-first-scaled.webp",
          "https://i.ibb.co/s3H69q1/Conditioning.jpg",
          "https://i.ibb.co/Z6cG1Qf/R6-3284.jpg",
        ].map((image, index) => (
          <div
            key={index}
            className="relative h-64 bg-cover bg-center rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-[700ms] flex items-center justify-center">
              <Link
                state={{
                  category: "",
                }}
                to={"/product-page"}
                className="text-white  bg-designColor 75 px-4 py-2 rounded-lg"
              >
                See All
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeCategory;
