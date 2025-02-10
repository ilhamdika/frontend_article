import React from 'react'
import { Link } from 'react-router-dom'

export const Card = ({className, thumbnail, title, description, href, target}) => {
  return (
    <div className={`mr-3 ml-3 mobile:h-96 mobile:w-full mobile:my-8` + className }>
      <Link to={href} target={target}>
        <img src={thumbnail} alt="Gambar" className="w-full p-5 laptop:p-10 mb-4 justify-center mobile:h-58 mobile:w-72 mobile:mx-auto transition-transform duration-300 ease-in-out transform hover:scale-110" data-aos="fade-down" 
     data-aos-easing="linear"
     data-aos-duration="1000" />
      </Link>
      <div data-aos="fade-up"
     data-aos-duration="1000">
        <Link to={href} target={target}>
          <h3 className="text-3xl mb-2 dark:text-white font-normal text-center transition duration-300 ease-in-out hover:text-blue-500">
              {title}
          </h3>
        </Link>
          <p className="dark:text-white font-light text-center">
              {description}
          </p>
      </div>
    </div>
  )
}

export default Card