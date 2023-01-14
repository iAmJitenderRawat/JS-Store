import * as Yup from "yup";

export const SignUpSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Too short")
    .max(25, "Too long")
    .required("Please enter your first name."),
  lastName: Yup.string().min(2, "Too short").max(25, "Too long"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email."),
  password: Yup.string()
    .min(8, "Too short")
    .required("Please enter your password.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),
});
