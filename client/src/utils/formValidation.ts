import { ISignUpFormData, ILoginFormData } from "../interfaces/forms";
import { formType } from "../types/forms";

export const validateFormsInput = (
  formData: ISignUpFormData | ILoginFormData,
  type: formType
): Partial<ISignUpFormData | ILoginFormData> => {
  const errors: Partial<ISignUpFormData | ILoginFormData> = {};

  // Validate Email
  if (!formData.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid.";
  }

  // Validate Password
  const password = formData.password;
  if (!password) {
    errors.password = "Password is required.";
  } else {
    if (!/[a-z]/.test(password)) {
      errors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/\d/.test(password)) {
      errors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*]/.test(password)) {
      errors.password = "Password must contain at least one special character (!@#$%^&*).";
    }else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters long.";
    }
  }

  //sign-up form, validate additional fields
  if (type === "signup") {
    const data = formData as ISignUpFormData;

    // Validate Full Name
    if (!data.fullName) {
      (errors as ISignUpFormData).fullName = "Full Name is required.";
    }

    // Validate Confirm Password
    if (data.cpassword !== data.password) {
        (errors as ISignUpFormData).cpassword = "Passwords do not match.";
    }
  }

  return errors;
};
