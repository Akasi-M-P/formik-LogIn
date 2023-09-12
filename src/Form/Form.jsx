import { useFormik } from "formik";
import "./Form.css"
import { useState } from "react";

const validate = (values) => {

  const errors = {};

  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|\\]).{8,32}$/;


  if (!values.userName) {
    errors.userName = "Required";
  } else if (values.userName.length > 15) {
    errors.userName = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }


if (!values.password) {
  errors.password = "Required";
} else if (!passwordRegex.test(values.password)) {
  errors.password =
    "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and a length between 8 and 32 characters";
} 


  return errors;
};

const Form = (values) => {

    const [isLogInSuccessful, setIsLogInSuccessful] = useState(false)
    const [loggedInUserName, setLoggedInUserName] = useState("")




  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
        setIsLogInSuccessful(true)
        setLoggedInUserName(values.userName)
    }
  });
  return (
    <>
      {isLogInSuccessful ? (
        <>
          <h1 className="welcome__message">Welcome, {loggedInUserName}</h1>
          <img className="welcome__Img" src="/assets/welcome.jpg" alt="" />
        </>
      ) : (
        <main className="main__Container">
          <form onSubmit={formik.handleSubmit} className="form__Container">
            <h1 className="form__Header">Log In</h1>
            <label htmlFor="userName">Username</label>
            <input
              id="userName"
              name="userName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div className="errors">{formik.errors.userName}</div>
            ) : null}

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="errors">{formik.errors.email}</div>
            ) : null}

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="errors">{formik.errors.password}</div>
            ) : null}

            <button className="submit__Btn" type="submit">
              Submit
            </button>
          </form>
          <img className="logIn__Img" src="/assets/login.jpg" alt="login" />
        </main>
      )}
    </>
  );
};

export default Form;