import React from 'react';


interface ILabelProps {
    htmlfor : string, 
    content : string
}

const Label  : React.FC<ILabelProps> = ({htmlfor, content}) => {
    return(<label htmlFor={htmlfor} className="block text-sm font-medium leading-6 text-gray-900">{content}</label>)
} 

export default Label;
