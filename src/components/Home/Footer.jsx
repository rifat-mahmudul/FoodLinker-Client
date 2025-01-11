import { Link } from "react-router"
import Container from "../Shared/Container"
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";


const Footer = () => {

    return (
        <footer className="bg-gradient-to-tr from-[#171339] via-[#0B0C26] to-[#020617] py-10 overflow-hidden">
        
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
                {/* Website Info */}
                <div>
                    <Link to='/'>
                        <div className='flex space-x-1 items-center justify-center sm:justify-start'>
                            <img className='h-10' src={"https://i.ibb.co.com/VMdncbV/food1.png"} alt="logo image" />
                            <h1 className='font-Rancho text-3xl'>FoodLinker</h1>
                        </div>
                    </Link>
                    <p className="mt-4 text-sm text-gray-400">
                    FoodLinker makes it easy to share excess food and spread happiness. Let’s turn surplus into a sustainable solution. At FoodLinker, we believe that every meal has the power to make a difference. Our platform connects people with surplus food to those in need, creating a network where sharing sustains lives and strengthens communities. By bridging the gap between abundance and scarcity, we aim to reduce food waste and ensure that no one goes hungry.
                    </p>
                </div>

                {/* Contact Information */}
                <div className="text-gray-400">
                    <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                    <ul className="mt-4 space-y-2">
                    <li>
                        <a className="hover:text-white">
                        support@foodlinker.com
                        </a>
                    </li>
                    <li>
                        <a href="tel:+1234567890" className="hover:text-white">
                        +1 (234) 567-890
                        </a>
                    </li>
                    <li>
                        <p className="hover:text-white">
                        Contact Form
                        </p>
                    </li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                    <ul className="mt-4 flex justify-center md:justify-start space-x-4">
                    <li>
                        <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-blue-500"
                        >
                        <FaFacebookF size={24} />
                        </a>
                    </li>
                    <li>
                        <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-blue-400"
                        >
                        <FaTwitter size={24} />
                        </a>
                    </li>
                    <li>
                        <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-pink-500"
                        >
                        <FaInstagram size={24} />
                        </a>
                    </li>
                    </ul>
                </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-8"></div>

                {/* Bottom Section */}
                <div className="text-center mt-4 text-sm">
                    <p>
                        © {new Date().getFullYear()} <span className="font-bold">FoodLinker</span>. All rights reserved.
                    </p>
                    <p className="mt-1">
                        Designed with ❤️ by FoodLinker Enthusiasts.
                    </p>
                </div>
            </Container>

        </footer>
    )
}

export default Footer
