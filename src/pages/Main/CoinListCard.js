import { useEffect, useState } from 'react';
import styled from 'styled-components';
import notaionConversion from '../../utils/ notationConversion';

function CoinListCard({
  id,
  price,
  quantity,
  name,
  firstClick,
  isCheck,
  isSearch,
  CardClick,
  type,
}) {
  const [isChangeColor, setIsChangeColor] = useState(false);
  const [trColor, setTrColor] = useState('');
  const ValuationAmount = notaionConversion(price * quantity);
  const holdingQuantity = notaionConversion(quantity);
  const nameSub = name.split(' ');

  //보유화폐만 보기 , 검색 시 클릭 된 값 변경
  useEffect(() => {
    firstClick === id ? setIsChangeColor(true) : setIsChangeColor(false);
  }, [firstClick, isCheck, isSearch, id]);

  useEffect(() => {
    isChangeColor === true ? setTrColor('skyblue') : setTrColor('');
  }, [isChangeColor]);

  return (
    <TableList
      onClick={() => {
        CardClick(id);
      }}
      style={{ backgroundColor: trColor }}
    >
      <td className="td1">
        {nameSub[0]}
        <p>{nameSub[1]}</p>
      </td>
      <td className="td2">{type}</td>
      <td className="td3">{holdingQuantity}</td>
      <td className="td4">₩ {ValuationAmount}</td>
    </TableList>
  );
}

const TableList = styled.tr`
  .td3 {
    text-align: right;
  }
  .td4 {
    text-align: right;
  }
  td {
    height: 50px;
    border-top: 2px dotted ${props => props.theme.gray};
    text-align: center;
    vertical-align: middle;
  }
  td:first-child {
    padding-left: 5px;
  }
  td:last-child {
    padding-right: 10px;
  }
`;

export default CoinListCard;
