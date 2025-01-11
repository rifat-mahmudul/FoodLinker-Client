import PropTypes from 'prop-types'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const Title = ({title, description}) => {

    useEffect(() => {
            AOS.init();
    }, []);

    return (
        <div data-aos="fade-up"  data-aos-duration="2000">
            <h1 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400">{title}</h1>
            <p className='text-center mt-2 mb-2'>{description}</p>
            <div className="border border-dotted border-blue-500 w-64 mx-auto"></div>
            <div className="border border-dotted border-blue-500 w-56 mx-auto mt-1"></div>
        </div>
    )
}

Title.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

export default Title
