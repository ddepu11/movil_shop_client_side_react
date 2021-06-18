import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { IoTrashBin } from 'react-icons/io5';
import { AiOutlineFileAdd } from 'react-icons/ai';
import Button from '../../components/Button';
import FormControl from '../../components/FormControl';

const AddMobileScreen = () => {
  const [mobileInfo, setMobileInfo] = useState({
    title: '',
    price: '',
    brand: '',
    internalMemory: '',
    ram: '',
    os: '',
    battery: '',
    processor: '',
    camera: '',
    colors: '',
    previews: [],
    files: null,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setMobileInfo({ ...mobileInfo, [name]: value });
  };

  const titleMessageRefTag = useRef(null);
  const priceMessageRefTag = useRef(null);
  const brandMessageRefTag = useRef(null);
  const internalMemoryMessageRefTag = useRef(null);
  const ramMessageRefTag = useRef(null);
  const osMessageRefTag = useRef(null);
  const batteryMessageRefTag = useRef(null);
  const processorMessageRefTag = useRef(null);
  const cameraMessageRefTag = useRef(null);
  const imageUploadValidationMessageTag = useRef(null);
  // const colorsMessageRefTag = useRef(null);

  const handleMobileImages = (e) => {
    const { files } = e.target;
    const pics = Array.from(files);

    mobileInfo.previews.length = 0;

    pics.forEach((el) => {
      const fileSRC = URL.createObjectURL(el);
      mobileInfo.previews.push(fileSRC);
    });

    setMobileInfo({ ...mobileInfo, pics });
  };

  const handleSubmit = () => {};

  return (
    <Wrapper>
      <h1>Add a new mobile</h1>
      <div className="form">
        <div className="row flex">
          <FormControl
            inputValue={mobileInfo.title}
            type="text"
            id="title"
            handleInput={handleInput}
            placeholder="Name of mobile"
            name="title"
            label="Title"
            refObj={titleMessageRefTag}
          />

          <FormControl
            inputValue={mobileInfo.price}
            type="text"
            id="price"
            handleInput={handleInput}
            placeholder="Price of mobile"
            name="price"
            label="Price"
            refObj={priceMessageRefTag}
          />
        </div>

        <div className="row flex">
          <FormControl
            inputValue={mobileInfo.brand}
            type="text"
            id="brand"
            handleInput={handleInput}
            placeholder="Brand of mobile"
            name="brand"
            label="Brand"
            refObj={brandMessageRefTag}
          />
          <FormControl
            inputValue={mobileInfo.internalMemory}
            type="text"
            id="internalMemory"
            handleInput={handleInput}
            placeholder="Internal memory of mobile"
            name="internalMemory"
            label="Internal Memory"
            refObj={internalMemoryMessageRefTag}
          />
        </div>
        <div className="row flex">
          <FormControl
            inputValue={mobileInfo.os}
            type="string"
            id="os"
            handleInput={handleInput}
            placeholder="OS of mobile"
            name="os"
            label="os"
            refObj={osMessageRefTag}
          />
          <FormControl
            inputValue={mobileInfo.ram}
            type="string"
            id="ram"
            handleInput={handleInput}
            placeholder="Ram of mobile"
            name="ram"
            label="Ram"
            refObj={ramMessageRefTag}
          />
        </div>
        <div className="row flex">
          <FormControl
            inputValue={mobileInfo.processor}
            type="string"
            id="processor"
            handleInput={handleInput}
            placeholder="Processor of mobile"
            name="processor"
            label="Processor"
            refObj={processorMessageRefTag}
          />
          <FormControl
            inputValue={mobileInfo.camera}
            type="string"
            id="camera"
            handleInput={handleInput}
            placeholder="Camera of mobile"
            name="camera"
            label="camera"
            refObj={cameraMessageRefTag}
          />
        </div>

        <div className="row flex">
          <FormControl
            inputValue={mobileInfo.battery}
            type="string"
            id="battery"
            handleInput={handleInput}
            placeholder="Battery of mobile"
            name="battery"
            label="Battery"
            refObj={batteryMessageRefTag}
          />

          <div className="form-control">
            <div className="upload_images flex">
              <div className="header flex">
                <p>Upload Images</p>{' '}
                <span
                  style={{
                    color: 'red',
                    fontSize: '1.25em',
                    marginLeft: '10px',
                  }}
                >
                  *
                </span>
              </div>

              <div className="footer flex">
                <label htmlFor="mobile_image">
                  Choose files...<span className="browse_btn">Browse</span>
                </label>
                <input
                  type="file"
                  id="mobile_image"
                  onChange={handleMobileImages}
                  multiple
                />
                <p ref={imageUploadValidationMessageTag} className="message" />
              </div>
            </div>
          </div>
        </div>

        {mobileInfo.previews.length !== 0 ? (
          <div className="row flex images_preview">
            {mobileInfo.previews.map((e) => (
              <div className="img" key={e.length}>
                <img src={e} alt={e} />
                <IoTrashBin className="remove_img" />
              </div>
            ))}
            <div className="add_btn">
              <AiOutlineFileAdd className="plus" />
            </div>
          </div>
        ) : (
          ''
        )}

        <div className="row flex">
          <div className="form-control">
            <Button
              pt="10px"
              pb="10px"
              pl="20px"
              pr="20px"
              borderRadius="5px"
              bgColor="rgb(32, 145, 60)"
              color="white"
              width="40%"
              handleClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  h1 {
    text-align: center;
    font-size: 1.5em;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    padding: 6px 0 18px;
  }
  .form {
    .row {
      justify-content: space-between;

      .form-control {
        /* border: 1px solid red; */
        .upload_images {
          flex-direction: column;
          align-items: flex-start;
          transform: translateY(-11px);

          .header {
            padding: 8px 0 10px;
            width: 80%;
            justify-content: flex-start;
            p {
              font-size: 1.3em;
              color: #222;
            }
          }

          .footer {
            width: 80%;

            label {
              width: 100%;
              padding: 11px 0px 11px 3px;
              border: 1px solid #a7a7a7;
              font-size: 0.8em;
              position: relative;
              color: #808080;
              background: #fff;
              border-radius: 0.25rem;
              box-shadow: inset 0 0.2rem 0.4rem #cacaca;
              .browse_btn {
                background: #a8aaaa;
                color: #111;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                display: grid;
                place-items: center;
                padding: 0 15px;
                font-size: 1.2em;
                /* font-weight: bold; */
                letter-spacing: 0.1px;
              }
            }

            label:hover {
              box-shadow: inset 0 0.2rem 0.4rem #b4b4b4;

              .browse_btn {
                color: #c9c3c3;
                background: #303030;
              }
            }

            input {
              display: none;
            }
          }
        }
        padding: 0 0px 0 100px;
        width: 80%;

        input,
        .fc_top {
          width: 80%;
        }
      }
    }
    .images_preview {
      padding: 20px 00px;
      margin-top: 15px;
      flex-wrap: wrap;
      gap: 1.2rem 20px;
      justify-content: center;
      box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
        rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;

      .img {
        width: 200px;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
            rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
            rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
        }
        position: relative;
      }

      .remove_img {
        color: #eb4d0f;
        position: absolute;
        top: 4px;
        right: 2px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        cursor: pointer;
      }
      .add_btn {
        width: 200px;
        height: 200px;
        display: grid;
        place-items: center;
        font-size: 4em;
        cursor: pointer;
        color: #0066ff;
        .plus {
          transition: transform 0.4s cubic-bezier(0.65, 0.05, 0.36, 1);
        }
        .plus:hover {
          transform: scale(1.8);
        }
      }
    }
  }
`;

export default AddMobileScreen;
