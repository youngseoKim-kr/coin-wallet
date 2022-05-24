import styled from 'styled-components';
import notaionConversion from '../../utils/ notationConversion';

function DetailListCard(props) {
  const ValuationAmount = notaionConversion(props.price * props.quantity);
  const holdingQuantity = notaionConversion(props.quantity);

  return (
    <TableList>
      <td>{props.division}</td>
      <td>{props.name}</td>
      <td>{props.type}</td>
      <td>{holdingQuantity}</td>
      <td>₩ {ValuationAmount}</td>
      <td>
        {props.status} <br />
        {props.status === '진행' || props.status === '대기' ? (
          <button>취소</button>
        ) : (
          ''
        )}
      </td>
      <td className="address">{props.address}</td>
      <td>{props.create}</td>
    </TableList>
  );
}

const TableList = styled.tr`
  td {
    height: 50px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    text-align: center;
    vertical-align: middle;
    button {
      width: 30px;
      border: none;
      color: white;
      background-color: red;
      font-size: 9px;
      cursor: pointer;
    }
  }
  .address {
    word-wrap: break-word;
    word-break: break-all;
    text-align: start;
  }
`;

export default DetailListCard;
