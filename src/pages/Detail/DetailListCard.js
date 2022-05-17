import styled from 'styled-components';

function DetailListCard(props) {
  return (
    <TableList>
      <td>{props.division}</td>
      <td>{props.name}</td>
      <td>{props.type}</td>
      <td>{props.quantity}</td>
      <td>₩ {props.price}</td>
      <td>{props.status}</td>
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
  }
  .address {
    word-wrap: break-word;
    word-break: break-all;
    text-align: start;
  }
`;

export default DetailListCard;
