import styled from 'styled-components';

function MainCoinCard(props) {
  const ValuationAmount = (props.price * props.quantity)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    .substr(0, 16);

  return (
    <tr>
      <td className="td1">{props.name}</td>
      <td className="td2">{props.type}</td>
      <td className="td3">{props.quantity}</td>
      <td className="td4">₩ {ValuationAmount}</td>
    </tr>
  );
}

export default MainCoinCard;
