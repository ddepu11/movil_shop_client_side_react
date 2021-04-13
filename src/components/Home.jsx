import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HeroImg from "../assests/home_hero_img.jpg";
import { Product, Services } from "./";

const Home = () => {
  return (
    <Wrapper>
      <div className="hero">
        <section className="flex w-960">
          <aside>
            <h2>MovilShop Number#1 Trusted Mobile Website.</h2>
            <p>Comming soon in your door with huge discount</p>

            <Link className="btn" to="/products">
              Shop Now
            </Link>
          </aside>
          <img src={HeroImg} alt="" />
        </section>
      </div>

      <div className="recent-products">
        <h2>Recent Products</h2>
        <div className="r_p_div flex">
          <Product />
          <Product />
          <Product />
        </div>
        <Link to="/" className="btn">
          All Products
        </Link>
      </div>
      <Services />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .hero {
    width: 1200px;
    margin: 0 auto;
    background-color: #db7979;
    padding: 20px;
    transform: translateY(-35px);
    .flex {
      justify-content: space-between;
      aside {
        align-self: center;
        color: white;
        h2 {
          font-size: 2.2em;
          letter-spacing: 4px;
          line-height: 1.4;
          text-transform: uppercase;
        }
        p {
          font-size: 0.9em;
          margin-top: 20px;
          text-transform: capitalize;
        }
        a {
          margin-top: 30px;
        }
      }
      img {
        width: 50%;
        height: 100%;
      }
    }
  }
  .recent-products {
    background-color: #c7c7c7;
    padding: 20px;
    text-align: center;
    h2 {
      margin-bottom: 50px;
      font-size: 1.8em;
      letter-spacing: 2px;
    }
    .r_p_div > * {
      margin-right: 25px;
    }
    .btn {
      margin-top: 30px;
    }
  }
`;

export default Home;