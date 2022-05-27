import styled from 'styled-components';
import notaionConversion from '../../../utils/ notationConversion';

function DepositWithdrawCard({
  price,
  quantity,
  division,
  status,
  create,
  address,
}) {
  const ValuationAmount = notaionConversion(price * quantity);
  const holdingQuantity = notaionConversion(quantity);

  return (
    <List>
      <li className="division">{division}</li>
      <li className="quantity">{holdingQuantity}</li>
      <li className="price">₩ {ValuationAmount}</li>
      <div className="statusSection">
        <li className="status">{status}</li>
        {status === '진행' || status === '대기' ? <button>취소</button> : ''}
      </div>
      <div className="address">
        <li className="create">{create}</li>
        <li className="addressInput">{address}</li>
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
      margin: 20px 0 0 0;
      border: none;
      color: white;
      background-color: red;
      font-size: 9px;
      cursor: pointer;
    }
  }
  .address {
    width: 200px;
    padding-left: 20px;
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
