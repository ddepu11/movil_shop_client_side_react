import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/Button';
import CircleLoader from '../../components/CircleLoader';
import formatePrice from '../../utils/formatePrice';

const OrdersScreen = () => {
  const { userInfo, userLoading } = useSelector((state) => state.user);

  if (userLoading) {
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

  return (
    <Wrapper className="w-960">
      {Object.keys(userInfo).length !== 0 && userInfo.orders.length !== 0 ? (
        <h1>Your Orders</h1>
      ) : (
        <h1 className="no_order_heading">
          Your Have not ordered anything yet!!!
        </h1>
      )}

      <div className="orders">
        {Object.keys(userInfo).length !== 0 &&
          userInfo.orders.length !== 0 &&
          userInfo.orders.map((m) => {
            const {
              title,
              _id,
              picture,
              sellerName,
              price,
              deliveredDate,
              color,
            } = m;

            return (
              <div key={_id} className="order flex">
                <div className="pic">
                  <img src={picture} alt={title} />
                </div>

                <div className="details flex">
                  <div className="info">
                    <h2>{title}</h2>
                    <span>
                      Color:{' '}
                      <Button
                        width="25px"
                        height="25px"
                        ml="10px"
                        bgColor={color}
                        mb="10px"
                        mt="5px"
                        bSh="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                        borderRadius="50%"
                      >
                        &nbsp;
                      </Button>
                    </span>
                    <p>Seller: {sellerName}</p>
                  </div>

                  <h3 className="price">{formatePrice(price)}</h3>

                  <h4>
                    Delivered On: {new Date(deliveredDate).toDateString()}
                  </h4>
                </div>
              </div>
            );
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px 10px;

  h1 {
    color: var(--little-dark-color);
    font-size: 2em;
    letter-spacing: 1px;
    text-align: center;
    padding: 15px 0;
  }

  .no_order_heading {
    padding: 150px 0 0 0;
    letter-spacing: 2px;
    height: 50vh;
    font-size: 2.2em;
  }

  .orders {
    padding: 15px 0;

    .order {
      box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
        rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 18px 5px;
      margin-bottom: 20px;

      .pic {
        width: 180px;
        height: 180px;
        margin-right: 20px;

        img {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
      }

      .details {
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        color: var(--little-dark-color);

        .info {
          h2 {
            margin-bottom: 15px;
            letter-spacing: 1px;
          }

          p {
            margin-top: 10px;
          }
        }

        .price {
          letter-spacing: 1px;
        }
      }
    }
  }

  @media screen and (max-width: 830px) {
    padding: 10px 10px;

    h1 {
      font-size: 2em;
      padding: 4px 0;
    }

    .orders {
      padding: 8px 0;

      .order {
        .pic {
          width: 100px;
          height: 160px;
          padding: 10px 0;
        }

        .details {
          .info {
            h2 {
              font-size: 1.2em;
            }
          }

          .price {
            font-size: 1.1em;
          }

          h4 {
            font-size: 0.9em;
          }
        }
      }
    }
  }

  @media screen and (max-width: 645px) {
    h1 {
      font-size: 1.8em;
    }

    .no_order_heading {
      padding: 80px 0 0 0;
      letter-spacing: 1px;
      height: 50vh;
      font-size: 1.7em;
    }

    .orders {
      padding: 8px 0;

      .order {
        padding: 8px 5px;
        flex-direction: column-reverse;
        align-items: center;

        .pic {
          width: 100px;
          height: 160px;
        }

        .details {
          align-items: center;
          flex-direction: column;
          text-align: center;

          .info {
            padding: 5px 0 10px;

            h2 {
              font-size: 1.3em;
              margin-bottom: 5px;
            }

            p {
              margin-top: 0px;
              padding: 0px 0;
            }
          }

          .price {
            font-size: 1.1em;
            padding: 6px 0 6px;
          }

          h4 {
            font-size: 0.9em;
          }
        }
      }
    }
  }
`;

export default OrdersScreen;
