import React from 'react';
import styled from 'styled-components';
import CircleLoader from '../../../components/CircleLoader';
import Mobile from '../../../components/Mobile';
import AllMobilesScreenLogic from './logic/AllMobilesScreenLogic';

const DashboardAllMobilesScreen = () => {
  const { handleDeleteMobile, sellerLoading, userInfo, sellerMobiles } =
    AllMobilesScreenLogic();

  if (sellerLoading) {
    return (
      <CircleLoader
        bgColor="var(--little-light-color)"
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
      <h1 className="heading">All the mobiles you have added</h1>

      <section className="mobiles">
        {sellerMobiles.length !== 0 &&
          sellerMobiles.map((i) => (
            <Mobile
              key={i._id}
              pictures={i.pictures}
              ram={i.ram}
              camera={i.camera}
              title={i.title}
              price={i.price}
              os={i.os}
              processor={i.processor}
              battery={i.battery}
              internalMemory={i.internalMemory}
              userId={userInfo._id}
              brand={i.brand}
              colors={i.colors}
              mobileId={i._id}
              handleDeleteMobile={handleDeleteMobile}
              handlingUpdate={1}
              usedFor="SELLER"
            />
          ))}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .heading {
    font-size: 1.1em;
    color: #444;
    text-align: center;
    letter-spacing: 1.4px;
    padding: 2px 0 35px;
  }

  @media screen and (max-width: 370px) {
    .heading {
      font-size: 1em;
      padding: 2px 0 30px;
    }
  }
`;

export default DashboardAllMobilesScreen;
