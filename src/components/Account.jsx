import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getAccountInfo } from "../actions/user_actions";
import { useHistory } from "react-router-dom";

const Account = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { hasUserError, hasUserLoggedIn, userInfo } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getAccountInfo());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {hasUserError ||
      (!hasUserLoggedIn && Object.keys(userInfo).length === 0) ? (
        history.push("/log-in")
      ) : (
        <Wrapper className="w-960">Hello</Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.main``;

export default Account;
