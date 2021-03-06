import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ref, deleteObject } from 'firebase/storage';
import { storageInstance } from '../../../config/firebase';
import CircleLoader from '../../../components/CircleLoader';
import {
  listSeller,
  listMobiles,
  deleteSeller,
} from '../../../actions/adminActions';
import User from '../../../components/User';
import {
  ADMIN_DELETE_SELLER_BEGIN,
  ADMIN_DELETE_SELLER_ERROR,
} from '../../../constants/adminConstants';
import { sendNotification } from '../../../actions/notificationActions';

const AdminDashboardSellersScreen = () => {
  const { mobiles, sellers, adminLoading } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSeller());

    dispatch(listMobiles());
  }, [dispatch]);

  const deleteSellerMobilePics = (sellerId, sellerEmail) => {
    const mobilesToDelete = mobiles.filter(
      (item) => item.sellerInfo.id === sellerId
    );

    let index = 0;

    mobilesToDelete.forEach((item) => {
      item.pictures.forEach(async (p) => {
        const userPicRef = ref(
          storageInstance,
          `mobileImages/${sellerEmail}/${p.fileName}`
        );

        try {
          await deleteObject(userPicRef);
        } catch (err) {
          dispatch({ type: ADMIN_DELETE_SELLER_ERROR });
          dispatch(sendNotification(err.code, true));
        }
      });

      if (mobilesToDelete.length - 1 === index) {
        dispatch(deleteSeller(sellerId));
      }

      index += 1;
    });
  };

  const deleteDp = async (sellerId, sellerEmail, fileName) => {
    const userPicRef = ref(
      storageInstance,
      `displayPictures/${sellerEmail}/${fileName}`
    );

    try {
      await deleteObject(userPicRef);

      deleteSellerMobilePics(sellerId, sellerEmail);
    } catch (err) {
      dispatch({ type: ADMIN_DELETE_SELLER_ERROR });

      dispatch(sendNotification(err.code, true));
    }
  };

  const handleDelete = (e) => {
    const { value } = e.target.dataset;

    const {
      displayPicture: { fileName, url },
      email,
    } = sellers.filter((item) => item._id === value)[0];

    deleteDp(value, email, fileName);

    if (url) {
      dispatch({ type: ADMIN_DELETE_SELLER_BEGIN });

      deleteDp(value, email, fileName);
    } else {
      dispatch({ type: ADMIN_DELETE_SELLER_BEGIN });

      deleteSellerMobilePics(value);
    }
  };

  if (adminLoading) {
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
    <Wrapper>
      {sellers.length !== 0 ? (
        <h2>All The seller in the system</h2>
      ) : (
        <div className="no_seller">
          <h2>Sorry There are no sellers registered</h2>
        </div>
      )}

      {sellers.length !== 0 &&
        sellers.map((i) => (
          <User
            key={i._id}
            i={i}
            handleDelete={handleDelete}
            mobiles={mobiles}
            isSeller="YES"
          />
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  h2 {
    color: var(--little-dark-color);
    padding: 8px 0 15px;
  }

  .no_seller {
    display: grid;
    place-items: center;
    text-align: center;
    height: 40vh;
    font-size: 1.2em;
    text-transform: capitalize;
  }
`;

export default AdminDashboardSellersScreen;
