import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { signUpUser } from '../actions/user_actions';
import clearAllSetTimeOut from '../utils/clearAllSetTimeOut';
import validateForm from '../utils/validateForm';

const SignUp = () => {
  const { userSignUpSuccess } = useSelector((state) => state.user);
  const setTimeOutId = useRef();

  const dispatch = useDispatch();

  useEffect(
    () =>
      // userSignUpSuccess && dispatch()
      // Clearing all the setTimeouts while unmounting the components
      () =>
        clearAllSetTimeOut(setTimeOutId)
  );

  const { userLoading } = useSelector((state) => state.user);

  // Referene for messages
  const firstNameValidationMessageTag = useRef(null);
  const lastNameValidationMessageTag = useRef(null);
  const passwordValidationMessageTag = useRef(null);
  const phoneNumberValidationMessageTag = useRef(null);
  const emailValidationMessageTag = useRef(null);
  const confirmPasswordValidationMessageTag = useRef(null);

  const dpValidationMessageTag = useRef(null);
  const genderValidationMessageTag = useRef(null);

  const [signUpCredentials, setSignUpCredentials] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    role: 'USER',
  });

  const [dp, setDP] = useState('');

  // let errorFlag = false;

  const handleInput = (e) => {
    const { value, name, checked } = e.target;
    if (name === 'role') {
      checked
        ? setSignUpCredentials({ ...signUpCredentials, [name]: 'SELLER' })
        : setSignUpCredentials({ ...signUpCredentials, [name]: 'USER' });
    } else {
      setSignUpCredentials({ ...signUpCredentials, [name]: value });
    }
  };

  const dbLabelRef = useRef();

  // Setting the img to the state
  const handleDP = (e) => {
    dbLabelRef.current.innerText = `${e.target.files[0].name}`;
    const span = document.createElement('span');
    span.classList.add('browse_btn');
    span.innerText = 'Browse';
    dbLabelRef.current.appendChild(span);

    setDP(e.target.files[0]);
  };

  const appendDataToFD = (fd) => {
    const k = Object.keys(signUpCredentials);
    const v = Object.values(signUpCredentials);

    for (let a = 0; a < k.length; a += 1) {
      fd.append(k[a].toString().trim(), v[a]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorFlag = validateForm(
      {
        firstName: signUpCredentials.firstName,
        lastName: signUpCredentials.lastName,
        email: signUpCredentials.email,
        phoneNumber: signUpCredentials.phoneNumber,
        password: signUpCredentials.password,
        confirmPassword: signUpCredentials.confirmPassword,
        gender: signUpCredentials.gender,
        dp,
      },
      setTimeOutId,
      {
        firstNameValidationMessageTag,
        lastNameValidationMessageTag,
        passwordValidationMessageTag,
        phoneNumberValidationMessageTag,
        emailValidationMessageTag,
        confirmPasswordValidationMessageTag,
        genderValidationMessageTag,
        dpValidationMessageTag,
      }
    );

    const formData = new FormData();

    dp !== '' && formData.append('dp', dp);

    if (!errorFlag) {
      appendDataToFD(formData);

      dispatch(signUpUser(formData));
    }
  };

  if (userLoading) {
    return <Loading />;
  }

  if (userSignUpSuccess) {
    return <Redirect to="/log-in" />;
  }

  return (
    <Wrapper className="w-960">
      <h1>Get your free MovilShop account now</h1>

      <form onSubmit={handleSubmit}>
        <div className="row flex">
          <div className="form-control ">
            <div className="fc_top">
              <label htmlFor="first_name">First Name</label>
              <span className="must"> *</span>
            </div>
            <input
              value={signUpCredentials.firstName}
              onChange={handleInput}
              type="text"
              id="first_name"
              name="firstName"
              placeholder="Enter your first name."
            />
            <p ref={firstNameValidationMessageTag} className="message" />
          </div>

          <div className="form-control">
            <div className="fc_top">
              <label htmlFor="last_name">Last Name</label>
              <span className="must"> *</span>
            </div>
            <input
              value={signUpCredentials.lastName}
              onChange={handleInput}
              type="text"
              id="last_name"
              name="lastName"
              placeholder="Enter your last name."
            />
            <p ref={lastNameValidationMessageTag} className="message" />
          </div>

          {/* Gender */}
          <div className="form-control">
            <h2 className="gender_heading">
              Gender <span style={{ color: 'red', fontSize: '1.1em' }}> *</span>
            </h2>

            <dir className="gender">
              <div className="flex">
                <label htmlFor="male">Male</label>
                <input
                  value="male"
                  onChange={handleInput}
                  type="radio"
                  id="male"
                  name="gender"
                  placeholder="Enter your last name."
                />
              </div>

              <div className="flex">
                <label htmlFor="female">Female</label>
                <input
                  value="female"
                  onChange={handleInput}
                  type="radio"
                  id="female"
                  name="gender"
                  placeholder="Enter your last name."
                />
              </div>
            </dir>

            <p ref={genderValidationMessageTag} className="message" />
          </div>
          {/* Gender Ends */}
        </div>

        <div className="row flex">
          <div className="form-control">
            <div className="fc_top">
              <label htmlFor="phone_number">Phone Number</label>
              <span className="must"> *</span>
            </div>
            <input
              value={signUpCredentials.phoneNumber}
              onChange={handleInput}
              type="text"
              id="phone_number"
              name="phoneNumber"
              placeholder="Enter your phone number."
            />
            <p ref={phoneNumberValidationMessageTag} className="message" />
          </div>

          <div className="form-control">
            <div className="fc_top">
              <label htmlFor="email">Email Address</label>
              <span className="must"> *</span>
            </div>
            <input
              value={signUpCredentials.email}
              onChange={handleInput}
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email address."
            />
            <p ref={emailValidationMessageTag} className="message" />
          </div>
        </div>

        <div className="row flex">
          <div className="form-control">
            <div className="fc_top">
              <label htmlFor="password">Password</label>
              <span className="must"> *</span>
            </div>
            <input
              value={signUpCredentials.password}
              onChange={handleInput}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password."
            />
            <p ref={passwordValidationMessageTag} className="message" />
          </div>

          <div className="form-control">
            <div className="fc_top">
              <label htmlFor="confirm_password">Confirm Password</label>
              <span className="must"> *</span>
            </div>
            <input
              value={signUpCredentials.confirmPassword}
              onChange={handleInput}
              type="password"
              id="confirm_password"
              name="confirmPassword"
              placeholder="Confirm your password."
            />
            <p ref={confirmPasswordValidationMessageTag} className="message" />
          </div>
        </div>

        {/* File Upload  */}
        <div className="row flex">
          <div className="form-control">
            <p>Upload your display picture</p>
            <label htmlFor="dp" className="dp-label" ref={dbLabelRef}>
              Choose file...
              <span className="browse_btn">Browse</span>
            </label>

            <input
              type="file"
              name="dp"
              id="dp"
              className="dp"
              onChange={handleDP}
              accept=".jpg, .png, .jpeg"
            />
            <p ref={dpValidationMessageTag} className="message" />
          </div>

          <div className="form-control role-div">
            <p>Do you want to be a seller?</p>

            <div className="role_inputs flex">
              <input
                type="checkbox"
                placeholder="Wanna be seller??"
                id="role"
                name="role"
                onChange={handleInput}
              />
              <label htmlFor="role">Yes</label>
            </div>
          </div>
        </div>

        <button type="submit" className="sign-up-btn">
          Create Account
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 40px 0;
  h1 {
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #333;
    font-size: 2em;
  }

  form {
    .row {
      justify-content: space-between;
      margin: 20px 0;

      .form-control {
        display: flex;
        flex-direction: column;
        width: 100%;

        .gender_heading {
          font-size: 1.3em;
          color: #222;
          font-weight: 400;
          margin-bottom: 8px;
        }
        .gender {
          width: 60%;
          div {
            justify-content: space-between;
            padding-bottom: 2px;
            label {
              padding: 0px 0;
              font-size: 1.2em;
            }
          }
        }
        p {
          font-size: 1.3em;
          padding: 0px 0px 10px;
          color: #222;
        }
        .fc_top {
          padding: 8px 0;
          .must {
            color: red;
            font-size: 1.2em;
          }
          label {
            font-size: 1.3em;
            color: #222;
          }
        }

        input {
          background: #e2dcdc;
          padding: 10px 5px;
          border-radius: 5px;
          font-size: 1.1em;
          width: 65%;
        }

        .dp-label {
          width: 70%;
          padding: 12px 0px 12px 3px;
          border: 1px solid #a7a7a7;
          font-size: 0.8em;
          position: relative;
          color: #535353;
          background: #fff;
          border-radius: 0.25rem;
          box-shadow: inset 0 0.2rem 0.4rem #cacaca;
          .browse_btn {
            background: #c9c3c3;
            color: #303030;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            display: grid;
            place-items: center;
            padding: 0 20px;
          }
        }
        .dp-label:hover {
          box-shadow: inset 0 0.2rem 0.4rem #b4b4b4;

          .browse_btn {
            color: #c9c3c3;
            background: #303030;
          }
        }
        .dp {
          display: none;
        }

        .message.error {
          color: red;
          font-size: 1.2em;
        }

        .message.success {
          color: green;
          font-size: 1.2em;
        }
      }

      .role-div {
        transform: translateY(-15px);
        .role_inputs {
          cursor: pointer;
          justify-content: space-between;
          width: 30%;
          position: relative;
          padding: 10px 0 0 0px;

          label {
            font-size: 1.2em;
            padding: 0px 0;
            color: #222;
            position: absolute;
            left: 30px;
          }

          input {
            background: #e2dcdc;
            padding: 0px 0px;
            border-radius: 0px;
            font-size: 0em;
            width: 10%;
            position: absolute;
            left: 0px;
          }
        }
      }
    }

    .sign-up-btn {
      padding: 8px 10px;
      font-size: 1.2em;
      background-color: #2a5be2;
      color: white;
      margin-top: 12px;
      width: 30%;
    }
  }
`;

export default SignUp;
