import React, {
  FormEvent,
  useState,
} from "react";
import Label from "../ui/label/Label";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import axios from "axios";
import { ISignUpFormData } from "../../interfaces/forms";
import { validateFormsInput } from "../../utils/formValidation";
import { useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_SIGNUP_API_URL;


const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState<ISignUpFormData>({
      fullName: "",
      email: "",
      password: "",
      cpassword: "",
    });
  
    const [errors, setErrors] = useState<Partial<ISignUpFormData>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof ISignUpFormData, boolean>>>({
      fullName: false,
      email: false,
      password: false,
      cpassword: false,
    });
  
    const checkInputErrors = (value: string, field: keyof ISignUpFormData) => {
      const err = validateFormsInput({ ...formData, [field]: value }, "signup");
      setErrors(err);
    };
  
    const setFormInputData = (value: string, field: keyof ISignUpFormData) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
  
      if (touched[field]) {
        checkInputErrors(value, field);
      }
    };
  
    const handleBlur = (field: keyof ISignUpFormData) => {
      setTouched((prev) => ({
        ...prev,
        [field]: true,
      }));
  
      checkInputErrors(formData[field], field);
    };
  
    const handleFormSubmit = async (e: FormEvent) => {
      e.preventDefault();
      const validationErrors = validateFormsInput(formData, "signup");
  
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
  
      try {
        const res = await axios.post(API_URL, formData);
        if (res.status === 202) {
          console.log("Sign Up successful");
        } else {
          console.log("Error occurred");
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <form action="#" method="POST" className="space-y-5" onSubmit={handleFormSubmit}>
        <div>
          <Label htmlFor="fullname" content="Full Name" />
          <div className="mt-2 relative">
            <Input
              id="fullname"
              name="name"
              type="text"
              required
              onChange={(e) => setFormInputData(e.target.value, "fullName")}
              onBlur={() => handleBlur("fullName")}
            />
            {touched.fullName && errors.fullName && <small className="text-red-500 absolute">{errors.fullName}</small>}
          </div>
        </div>
  
        <div>
          <Label htmlFor="email" content="Email address" />
          <div className="mt-2 relative">
            <Input
              id="email"
              name="email"
              type="email"
              required
              onChange={(e) => setFormInputData(e.target.value, "email")}
              onBlur={() => handleBlur("email")}
            />
            {touched.email && errors.email && <small className="text-red-500 absolute">{errors.email}</small>}
          </div>
        </div>
  
        <div>
          <Label htmlFor="password" content="Password" />
          <div className="mt-2 relative">
            <Input
              id="password"
              name="password"
              type="password"
              required
              onChange={(e) => setFormInputData(e.target.value, "password")}
              onBlur={() => handleBlur("password")}
            />
            {touched.password && errors.password && <small className="text-red-500 absolute">{errors.password}</small>}
          </div>
        </div>
  
        <div>
          <Label htmlFor="cpassword" content="Confirm Password" />
          <div className="mt-2 relative">
            <Input
              id="cpassword"
              name="cpassword"
              type="password"
              required
              onChange={(e) => setFormInputData(e.target.value, "cpassword")}
              onBlur={() => handleBlur("cpassword")}
            />
            {touched.cpassword && errors.cpassword && <small className="text-red-500 absolute">{errors.cpassword}</small>}
          </div>
        </div>
  
        <div>
          <Button type="submit" content="Sign Up" />
        </div>
      </form>
    );
  };
  

const SignUp: React.FC = () => {
    const navigate = useNavigate();

    const navigateToLoginPage = () => {
        navigate("/login")
    }

  return (
    <>
      <div className="h-screen w-screen bg-white">
        <div className="h-full">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <SignUpForm />
              <p className="mt-3 text-center text-sm text-gray-500">
                Already a member?{" "}
                <a
                  onClick={navigateToLoginPage}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
