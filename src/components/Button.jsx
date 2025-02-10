import React from 'react'

export const Button = ({className = '', disabled, children,  type, onClick}) => {
  return (
    <button
            
            className={
                `inline-flex justify-center items-center px-4 py-2 bg-blue-500 dark:bg-gray-800 border border-transparent rounded-2xl ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
  )
}

export default Button

