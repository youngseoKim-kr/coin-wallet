import styled from 'styled-components';

function DepositWithdrawCard(props) {
  const ValuationAmount = (props.price * props.quantity)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    .substr(0, 15);

  const holdingQuantity = props.quantity
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    .substr(0, 15);

  return (
    <List>
      <li className="division">{props.division}</li>
      <li className="quantity">{holdingQuantity}</li>
      <li className="price">₩ {ValuationAmount}</li>
      <div className="statusSection">
        <li className="status">{props.status}</li>
        {props.status === '진행' || props.status === '대기' ? (
          <button>취소</button>
        ) : (
          ''
        )}
      </div>
      <div className="address">
        <li className="create">{props.create}</li>
        <li className="addressInput">{props.address}</li>
      </div>
    </List>
  );
}
const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid black;
  .division {
    width: 40px;
    padding-left: 10px;
  }
  .quantity {
    width: 120px;
    font-size: 14px;
    text-align: center;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  .price {
    width: 150px;
    font-size: 14px;
    text-align: center;
  }
  .statusSection {
    width: 50px;
    display: flex;
    justify-content: center;
    padding-left: 5px;
    button {
      width: 30px;
      border: none;
      margin: 20px 0 0 0;
      color: white;
      background-color: red;
      font-size: 9px;
      cursor: pointer;
    }
  }
  .address {
    padding-left: 20px;
    width: 200px;
    text-align: left;
    word-break: break-all;
    .create {
      border-bottom: 1px solid black;
    }
    li {
      padding: 5px;
    }
    .addressInput {
      width: 200px;
      height: 35px;
      overflow: scroll;
    }
  }
`;

export default DepositWithdrawCard;
