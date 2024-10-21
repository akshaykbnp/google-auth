import React, { ChangeEventHandler, FocusEventHandler } from 'react';

type HTMLInputTypeAttribute =
        | "button"
        | "checkbox"
        | "color"
        | "date"
        | "datetime-local"
        | "email"
        | "file"
        | "hidden"
        | "image"
        | "month"
        | "number"
        | "password"
        | "radio"
        | "range"
        | "reset"
        | "search"
        | "submit"
        | "tel"
        | "text"
        | "time"
        | "url"
        | "week"
        | (string & {});
        

interface IInputProps{
    id : string, 
    name : string, 
    type : HTMLInputTypeAttribute,
    required? : boolean, 
    onChange : ChangeEventHandler<HTMLInputElement>, 
    onBlur? : FocusEventHandler
    className ?: string, 
}

const Input :  React.FC<IInputProps> = ({id, name, type, onChange, required=false,  onBlur, className=""}) => {
    return(<input
        id={id}
        name={name}
        type={type}
        required={required}
        onBlur={onBlur}
        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
        onChange={onChange}
    />)
}

export default Input;