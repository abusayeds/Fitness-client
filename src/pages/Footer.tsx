import { faFacebookF, faGithub, faLinkedinIn, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
            <img
            className="w-6 h-6 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkooLRLnw6KYliBKMSdCBPO1yyLH-ELhCTuw&s"
            alt=""
          />
              <p className="text-white">
                © 2024 . Privacy Policy
              </p>
            </div>

            <div className=' mt-2 flex '  >
                    <h1 className=' text-3xl hover:text-blue-600 ' ><a href="https://www.facebook.com/profile.php?id=100074503997052" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className='icon ' icon= {faFacebookF}  ></FontAwesomeIcon></a></h1>
                    <h1 className='ml-6 text-3xl hover:text-blue-600 '><a href="https://github.com/abusayeds" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className=' icon' icon= {faGithub}  ></FontAwesomeIcon></a></h1>
                    <h1 className='ml-6 text-3xl hover:text-blue-600 '><a href="https://www.linkedin.com/in/abu-sayed96/" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className=' icon' icon= {faLinkedinIn}  ></FontAwesomeIcon></a></h1>
                    <h1 className='ml-6 text-3xl hover:text-blue-600 '> <FontAwesomeIcon className='icon' icon= {faWhatsapp} /> </h1>
                </div>
          </div>

          <div className="mb-4">
            <p className="text-white mb-2">Contact us : abusayedstudent@gmail.com</p>
            <p className="text-white">Uttora , Dhaka , Bangladesh</p>
          </div>

          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-facebook-square text-2xl"></i>
              
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-twitter-square text-2xl"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-instagram-square text-2xl"></i>
            </a>
          </div>

          <div>
            <a href="#" className="text-white hover:text-gray-400">
             Location
            </a>
            <span className="text-gray-600 mx-2">•</span>
            <a href="#" className="text-white hover:text-gray-400">
              Dhaka 
            </a>
          </div>
        </div>
        <p className='text-center'>Create by <FontAwesomeIcon className='text-yellow-400' icon={faHeart}></FontAwesomeIcon> Abu sayed (copyright @2024))</p>
      </footer>
    </div>
  );
};

export default Footer;
