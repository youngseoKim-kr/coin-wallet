import { useEffect, useState } from 'react';
import styled from 'styled-components';

function MainCoinCard(props) {
  const [isChangeColor, setIsChangeColor] = useState(false);
  const [trColor, setTrColor] = useState('');
  const ValuationAmount = (props.price * props.quantity)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    .substr(0, 15);

  const holdingQuantity = props.quantity
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    .substr(0, 15);
  const nameSub = props.name.split(' ');

  //보유화폐만 보기 , 검색 시 클릭 된 값 변경
  useEffect(() => {
    props.firstClick === props.id
      ? setIsChangeColor(true)
      : setIsChangeColor(false);
  }, [props.firstClick, props.isCheck, props.isSearch]);

  useEffect(() => {
    isChangeColor === true ? setTrColor('skyblue') : setTrColor('');
  }, [isChangeColor]);

  return (
    <TableList
      onClick={() => {
        props.CardClick(props.id);
      }}
      style={{ backgroundColor: trColor }}
    >
      <td className="td1">
        {nameSub[0]}
        <p>{nameSub[1]}</p>
      </td>
      <td className="td2">{props.type}</td>
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
    text-align: center;
    vertical-align: middle;
    height: 50px;
    border-top: 2px dotted ${props => props.theme.gray};
  }
  td:first-child {
    padding-left: 5px;
  }
  td:last-child {
    padding-right: 10px;
  }
`;

export default MainCoinCard;
