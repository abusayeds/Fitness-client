// About.js



const About = () => {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-400 min-h-screen p-8">
      <div className="max-w-4xl mx-auto py-16">
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Company Overview</h2>
          <p className="text-white">
            Fitness Zone is dedicated to promoting health and wellness through innovative fitness solutions. Founded in Dhaka, our mission is to inspire individuals to achieve their fitness goals and lead healthier lives. With a commitment to excellence and community engagement, we aim to become a leading force in the fitness industry.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Team Introduction</h2>
          {/* Team members section */}
          {/* Example of a team member */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              className="w-36 h-36 "
              src="https://www.fitnesszonegloucester.com/wp-content/uploads/2022/02/SteveM.jpg"
              alt="Team Member"
            />
            <div>
              <h3 className="text-white font-bold">Fitness king</h3>
              <p className="text-white">CEO & Founder</p>
              <p className="text-white">Brief bio of fitness king.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Customer Testimonials</h2>
          {/* Testimonials section */}
          {/* Example of a testimonial */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-800">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              gravida finibus feugiat."
            </p>
            <p className="text-gray-600 mt-2">- Customer Name</p>
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold text-white mb-4">Contact Information</h2>
          {/* Contact information section */}
          <p className="text-white">Contact details: city of Dhaka , <br />
           phone : 088++<br /> email : fitness@gmail.com</p>
        </section>
      </div>
    </div>
  );
};

export default About;
