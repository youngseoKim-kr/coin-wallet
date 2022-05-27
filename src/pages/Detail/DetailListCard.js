import styled from 'styled-components';
import notaionConversion from '../../utils/ notationConversion';

function DetailListCard({
  division,
  name,
  type,
  status,
  create,
  address,
  price,
  quantity,
}) {
  const ValuationAmount = notaionConversion(price * quantity);
  const holdingQuantity = notaionConversion(quantity);

  return (
    <TableList>
      <td>{division}</td>
      <td>{name}</td>
      <td>{type}</td>
      <td>{holdingQuantity}</td>
      <td>₩ {ValuationAmount}</td>
      <td>
        {status} <br />
        {status === '진행' || status === '대기' ? <button>취소</button> : ''}
      </td>
      <td className="address">{address}</td>
      <td>{create}</td>
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
