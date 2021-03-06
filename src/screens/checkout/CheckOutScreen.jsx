import React from 'react';
import styled from 'styled-components';
import CartPriceDetais from '../cart/CartPriceDetails';
import Button from '../../components/Button';
import CircleLoader from '../../components/CircleLoader';
import CheckOutScreenLogic from './logic/CheckOutScreenLogic';

const CheckOutScreen = () => {
  const {
    userLoading,
    paymentLoading,
    handleDeliveryAddress,
    handlePay,
    userInfo,
    deliveryAddress,
    saveDeliveryAddress,
    pinCodeValidationMessageRef,
    stateValidationMessageRef,
    cityValidationMessageRef,
    addressValidationMessageRef,
  } = CheckOutScreenLogic();

  if (userLoading || paymentLoading) {
    return (
      <CircleLoader
        bgColor="var(--secondary-color)"
        wrapperH="80vh"
        spW="90px"
        spH="90px"
        cirW="90px"
        cirH="90px"
      />
    );
  }

  const { state, city, pincode, address } = deliveryAddress;

  return (
    <Wrapper className="w-960 flex">
      <div className="user_info">
        <div className="row flex">
          <h3>Name:</h3>
          <span>{`${userInfo.firstName} ${userInfo.lastName}`}</span>
        </div>

        <div className="row flex">
          <h3>Email:</h3>
          <span>{userInfo.email}</span>
        </div>

        <div className="row flex">
          <h3>Pincode:</h3>
          <div className="right">
            <input
              type="number"
              name="pincode"
              onChange={handleDeliveryAddress}
              value={pincode}
            />
            <p className="message" ref={pinCodeValidationMessageRef} />
          </div>
        </div>

        <div className="row flex">
          <h3>State</h3>
          <div className="right">
            <select name="state" onChange={handleDeliveryAddress} value={state}>
              <option>--Select State--</option>
              <option value="Andaman &amp; Nicobar Islands">
                Andaman &amp; Nicobar Islands
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Dadra &amp; Nagar Haveli &amp; Daman &amp; Diu">
                Dadra &amp; Nagar Haveli &amp; Daman &amp; Diu
              </option>
              <option value="Delhi">Delhi</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu &amp; Kashmir">Jammu &amp; Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
            </select>
            <p ref={stateValidationMessageRef} className="message" />
          </div>
        </div>

        <div className="row flex">
          <h3>City/ District/ Town:</h3>
          <div className="right">
            <input
              type="text"
              name="city"
              value={city}
              onChange={handleDeliveryAddress}
            />
            <p ref={cityValidationMessageRef} className="message" />
          </div>
        </div>

        <div className="row flex">
          <h3>Address(Area and Street)</h3>
          <div className="right">
            <textarea
              name="address"
              rows="7"
              cols="29"
              value={address}
              onChange={handleDeliveryAddress}
            />
            <p ref={addressValidationMessageRef} className="message" />
          </div>
        </div>

        <div className="row buy-now">
          <Button
            pt="10px"
            pb="10px"
            pl="30px"
            pr="30px"
            fs="1em"
            width="100%"
            bSh=""
            bgColor="var( --success-color)"
            handleClick={saveDeliveryAddress}
          >
            Save Delivery Address
          </Button>

          <Button
            pt="10px"
            pb="10px"
            pl="30px"
            pr="30px"
            fs="1em"
            width="100%"
            mt="15px"
            bSh=""
            handleClick={handlePay}
          >
            Buy Now
          </Button>
        </div>
      </div>

      <CartPriceDetais height="310px" width="30%" />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px 5px;
  align-items: flex-start;
  justify-content: space-between;

  .user_info {
    width: 65%;
    padding: 15px 15px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

    .row {
      justify-content: space-between;
      padding: 0px 0 25px;
      align-items: flex-start;

      h3 {
        font-size: 1.2em;
        color: var(--little-dark-color);
        letter-spacing: 2px;
      }

      span {
        font-size: 1em;
        color: #333;
        letter-spacing: 1px;
        display: block;
        justify-self: flex-start;
        width: 45%;
      }

      .right {
        width: 45%;

        input {
          justify-self: flex-start;
          border: 1px dashed var(--little-light-color);
          padding: 6px 5px;
          color: var(--little-dark-color);
          width: 100%;
          font-size: 1em;
        }

        select {
          padding: 6px 5px;
          justify-self: flex-start;
          border: 1px dashed var(--little-light-color);
          font-size: 1em;
          width: 100%;
        }

        textarea {
          font-size: 1.1em;
          border: 1px dashed var(--little-light-color);
          padding: 4px 5px;
          color: var(--little-dark-color);
          resize: none;
          width: 100%;
        }

        .message {
          font-size: 1em;
          display: none;
        }

        .message.error {
          display: block;
          color: var(--danger-color);
        }
      }

      textarea:focus {
        border: 0;
      }
    }
    .buy-now {
      margin: 0 auto;
      width: 100%;
    }
  }

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;

    .price_details_div,
    .user_info {
      width: 100% !important;
      margin-bottom: 20px;
    }

    .price_details_div {
      position: static;
    }
  }

  @media screen and (max-width: 578px) {
    .user_info {
      padding: 15px 2px;

      .row {
        flex-direction: column;
        align-items: flex-start;
        padding: 0px 10px 25px;

        h3 {
          font-size: 1.2em;
          margin-bottom: 8px;
        }

        span {
          font-size: 1em;
          width: 100%;
        }

        .right {
          width: 100%;

          input {
            justify-self: flex-start;
            border: 1px dashed var(--little-light-color);
            padding: 6px 5px;
            color: var(--little-dark-color);
            width: 100%;
            font-size: 1em;
          }

          select {
            padding: 6px 5px;
            font-size: 1em;
            width: 100%;
          }

          textarea {
            font-size: 1.1em;
            padding: 4px 5px;
            width: 100%;
          }

          .message {
            font-size: 1em;
            display: none;
          }

          .message.error {
            display: block;
            color: var(--danger-color);
          }
        }

        textarea:focus {
          border: 0;
        }
      }

      .buy-now {
        margin: 0 auto;
        width: 100%;

        button {
          padding: 8px 0 !important;
        }
      }
    }
  }

  @media screen and (max-width: 430px) {
    .user_info {
      padding: 15px 2px;

      .row {
        flex-direction: column;
        align-items: flex-start;
        padding: 0px 10px 25px;

        h3 {
          font-size: 1.1em;
          margin-bottom: 6px;
        }

        span {
          font-size: 1em;
          width: 100%;
        }

        .right {
          width: 100%;

          input {
            justify-self: flex-start;
            padding: 4px 5px;
            font-size: 1em;
          }

          select {
            padding: 4px 5px;
            font-size: 1em;
            width: 100%;
          }

          textarea {
            font-size: 1em;
            padding: 4px 5px;
          }
        }
      }

      .buy-now {
        padding: 0 5px;
        button {
          padding: 5px 0 !important;
        }
      }
    }
  }
`;

export default CheckOutScreen;
