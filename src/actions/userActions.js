import {
  USER_INFO_BEGIN,
  USER_INFO_SUCCESS,
  USER_INFO_ERROR,
  USER_CLEAR_SIGNUP_STATUS,
  USER_REGISTER_CHECK_BEGIN,
  USER_REGISTER_CHECK_SUCCESS,
  USER_REGISTER_CHECK_ERROR,
  USER_SIGN_IN_BEGIN,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_ERROR,
  USER_LOG_OUT_BEGIN,
  USER_LOG_OUT_ERROR,
  USER_LOG_OUT_SUCCESS,
  USER_SIGN_UP_BEGIN,
  USER_SIGN_UP_ERROR,
  USER_SIGN_UP_SUCCESS,
  USER_AUTHENTICATION_SUCCESS,
  USER_AUTHENTICATION_FAIL,
  USER_UPDATE_BEGIN,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  USER_CHANGE_DP_BEGIN,
  USER_CHANGE_DP_ERROR,
  USER_CHANGE_DP_SUCCESS,
} from '../constants/userConstants';

import * as user from '../api/userApi';
import { sendNotification } from './notificationActions';

// Authenticate User
const authenticateUser = () => async (dispatch) => {
  try {
    const { data } = await user.authenticate();

    const { firstName, lastName, role } = data.user;
    dispatch({
      type: USER_AUTHENTICATION_SUCCESS,
      payload: role,
    });
    dispatch(
      sendNotification(`Welcome back ${firstName} ${lastName} :)`, false)
    );
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({ type: USER_AUTHENTICATION_FAIL, payload: msg });
    dispatch(sendNotification(msg, true));
  }
};

//  check if given email is registered while loggijng in using google??
const isUserRegisteredWithThisEmail = (email) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_CHECK_BEGIN });

  try {
    const { data } = await user.checkIsEmailRegistered(email);

    dispatch({
      type: USER_REGISTER_CHECK_SUCCESS,
      payload: { user: data.user, msg: 'User Logged In Successfully!!!' },
    });
    dispatch(sendNotification('User Logged In Successfully!!!', false));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_CHECK_ERROR,
      payload: 'User was not registered!!!',
    });
    dispatch(sendNotification('User was not registered!!!', true));
  }
};

// Custom User Login
const customUserSignIn = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGN_IN_BEGIN });

  try {
    const { data } = await user.logIn(email, password);

    // Handle this
    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
    dispatch(sendNotification(data.msg, false));
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({ type: USER_SIGN_IN_ERROR, payload: msg });
    dispatch(sendNotification(msg, true));
  }
};

// Sign Up Action
const signUpUser = (userCredentials) => async (dispatch) => {
  dispatch({ type: USER_SIGN_UP_BEGIN });

  try {
    const { data } = await user.signUp(userCredentials);

    if (data) {
      dispatch({
        type: USER_SIGN_UP_SUCCESS,
        payload: data.msg,
      });
      dispatch(sendNotification(data.msg, false));
    }
  } catch (err) {
    const { msg } = err.response.data;

    dispatch({ type: USER_SIGN_UP_ERROR, payload: msg });
    dispatch(sendNotification(msg, true));
  }
};

// assigns false to hasUseSignedUp flag
const clearUserSignUpSuccess = () => (dispatch) => {
  dispatch({ type: USER_CLEAR_SIGNUP_STATUS });
};

const getAccountInfo = () => async (dispatch) => {
  dispatch({ type: USER_INFO_BEGIN });

  try {
    const { data } = await user.accountInfo();

    dispatch({ type: USER_INFO_SUCCESS, payload: data });
    dispatch(sendNotification(data.msg, false));
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({
      type: USER_INFO_ERROR,
      payload: msg,
    });
    dispatch(sendNotification(msg, true));
  }
};

const logOutUser = () => async (dispatch) => {
  dispatch({ type: USER_LOG_OUT_BEGIN });

  try {
    await user.logOut();

    dispatch({
      type: USER_LOG_OUT_SUCCESS,
      payload: 'User logged out successfully!!!',
    });
    dispatch(sendNotification('User logged out successfully!!!', false));
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({ type: USER_LOG_OUT_ERROR, payload: msg });
    dispatch(sendNotification(msg, true));
  }
};

const updateUser = (userInfo) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_BEGIN });

  try {
    const { data } = await user.update(userInfo);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: { user: data.user, msg: 'User updated Successfully!!!' },
    });
    dispatch(sendNotification('User updated Successfully!!!', false));
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({ type: USER_UPDATE_ERROR, payload: msg });
    dispatch(sendNotification(msg, true));
  }
};

const changeDisplayPicture = (formData) => async (dispatch) => {
  dispatch({ type: USER_CHANGE_DP_BEGIN });

  try {
    const {
      data: { updatedUser },
    } = await user.changeDP(formData);

    dispatch({
      type: USER_CHANGE_DP_SUCCESS,
      payload: {
        user: updatedUser,
        msg: 'You have successfully changed your dp!!!',
      },
    });
    dispatch(
      sendNotification('You have successfully changed your dp!!!', false)
    );
  } catch (err) {
    const msg = err.message.response;
    dispatch({ type: USER_CHANGE_DP_ERROR, payload: msg });
    dispatch(sendNotification(msg, true));
  }
};

export {
  customUserSignIn,
  signUpUser,
  clearUserSignUpSuccess,
  getAccountInfo,
  logOutUser,
  isUserRegisteredWithThisEmail,
  authenticateUser,
  updateUser,
  changeDisplayPicture,
};
