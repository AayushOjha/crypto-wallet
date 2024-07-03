import React from "react";
import styled from "styled-components";

const PageHeader = styled.h1`
  padding: 50px 0;
  color: ${(props) => props.theme.colors.primary};
`;

const TableTitle = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  padding: 5px 20px;
  margin-bottom: 30px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 1fr;
  grid-gap: 10px;
  grid-template-rows: 1fr;
  align-item: center;
  margin: 15px 0;
  padding: 15px;
`;

const TableRowcard = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  margin: 15px 0;
  padding: 25px 15px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.cardBg};
`;

const CellItem = styled.div<{ highlight?: boolean }>`
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  color: ${(props) =>
    props.highlight
      ? props.theme.colors.textContrast
      : props.theme.colors.text};
`;

const Transactions: React.FC = () => {
  return (
    <div>
      <PageHeader>Transactions</PageHeader>
      <TableTitle>Total Transactions - 03</TableTitle>
      <TableRow>
        <div>Coin</div>
        <div>Wallet</div>
        <div>Amount</div>
        <div>Result</div>
        <div>Status</div>
      </TableRow>

      <TableRowcard>
        <CellItem>
          <img src="icons/bitcoin.svg" />
          <div>
            <div style={{fontSize: '14px', fontWeight: 'bold'}}>12/11/2022</div>
            <div style={{fontSize: '12px'}} >10:31:20 AM</div>
          </div>
        </CellItem>
        <CellItem>Aru</CellItem>
        <CellItem>BTC 0.00256</CellItem>
        <CellItem highlight>RECIVED</CellItem>
        <CellItem highlight>SUCCESS</CellItem>
      </TableRowcard>
    </div>
  );
};

export default Transactions;
