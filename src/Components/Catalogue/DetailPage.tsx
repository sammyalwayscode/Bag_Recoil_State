import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { detail } from "../Global/Global";
import { cartState } from "../Global/Global";
import { iData } from "../Global/Interface";

const DetailPage = () => {
  const [myCart, setMyCart] = useRecoilState(cartState);
  const [myData, setMyData] = useRecoilState(detail);
  const viewData = useRecoilValue(detail);
  const { id } = useParams();

  const viewDetail = async () => {
    const data = await axios.get(
      `https://bag-server.vercel.app/api/detail/${id}`
    );
    const newData = data.data.data.productDetail[0] as iData;
    setMyData(newData);
    console.log(newData);
  };

  const addToCart = (product: iData) => {
    setMyCart((el: any) => {
      const check = el.find((props: any) => props._id === product._id);

      if (check) {
        return el.map((item: any) =>
          item._id === product._id ? { ...product, QTY: item.QTY! + 1 } : item
        );
      } else {
        return [...el, { ...product, QTY: 1 }];
      }
    });
  };

  console.log(myCart);

  React.useEffect(() => {
    viewDetail();
  }, []);

  return (
    <Container>
      <Wrapper>
        <ImageDiv>
          <img src={viewData.descAvatar} alt="" />
        </ImageDiv>
        <TextDiv>
          <small> {viewData.brandName} </small>
          <BagName> {viewData.productName} </BagName>
          <BagPropHold>
            <Price>
              {" "}
              Price: <strong>$ {viewData.price} </strong>{" "}
            </Price>
            <Price>
              {" "}
              Bag Type: <strong> {viewData.bagType} </strong>{" "}
            </Price>
            <Price>
              {" "}
              Color:{" "}
              <strong>
                {viewData.bagColor}{" "}
                <ColBox style={{ backgroundColor: `${viewData.bagColor}` }} />{" "}
              </strong>{" "}
            </Price>
          </BagPropHold>
          <Description1>{viewData.productDesription1}</Description1>
          <Description2>{viewData.productDesription2}</Description2>
          <AddCart>
            <button
              onClick={() => {
                addToCart(viewData);
                console.log("Added to Cart", viewData);
              }}
            >
              Add to Cart
            </button>
          </AddCart>
        </TextDiv>
      </Wrapper>
    </Container>
  );
};

export default DetailPage;

const ColBox = styled.div`
  height: 12px;
  width: 12px;
  margin-left: 3px;
`;

const BagPropHold = styled.div`
  display: flex;
  font-family: poppins;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: montserrat;
`;
const Wrapper = styled.div`
  width: 85%;
  display: flex;
  flex-wrap: wrap;
  min-height: 88vh;
  height: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    width: 100%;
    justify-content: center;
  }
`;
const ImageDiv = styled.div`
  width: 500px;
  height: 80vh;
  background-color: #fbf9fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 7px;

  @media (max-width: 500px) {
    width: 100%;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
const TextDiv = styled.div`
  width: 500px;

  small {
    font-weight: 700;
    font-family: poppins;
    letter-spacing: 8px;
    color: darkorange;
  }
  @media (max-width: 500px) {
    width: 90%;
    text-align: center;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const BagName = styled.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    font-size: 20px;
  }
`;
const Price = styled.div`
  font-size: 15px;
  margin: 5px 5px;
  text-align: center;
  strong {
    font-weight: 800;
    display: flex;
    align-items: center;
    text-transform: capitalize;
  }
`;
const Description1 = styled.p`
  font-size: 15px;
`;
const Description2 = styled.p`
  font-size: 15px;
`;
const AddCart = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 90%;
    height: 35px;
    background-color: darkorange;
    border: none;
    outline: none;
    font-family: montserrat;
    color: #fff;
    font-weight: 800;
    cursor: pointer;
  }
`;
