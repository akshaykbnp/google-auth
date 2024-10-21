import React from 'react';


interface ILabelProps {
    htmlFor : string, 
    content : string, 
    className? : string
}

const Label  : React.FC<ILabelProps> = ({htmlFor, content, className = ""}) => {
    return(<label htmlFor={htmlFor} className={`block text-sm font-medium leading-6 text-gray-900 ${className}`}>{content}</label>)
} 

export default Label;
