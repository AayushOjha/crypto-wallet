import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../hooks/redux";

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

interface ITrx {
  coin: string | null;
  wallet: string;
  amount: number | null;
}

const Transactions: React.FC = () => {
  const [trxs, setTrxs] = useState<ITrx[]>([]);

  const wallets = useAppSelector((state) => state.wallets);

  useEffect(() => {
    if (!wallets.syncing) {
      let _tnxs: ITrx[] = [];
      Object.values(wallets.wallets).forEach((_wallet) => {
        _wallet.transactions.forEach((tnx) => {
          _tnxs.push({
            coin: tnx.asset,
            wallet: _wallet.name,
            amount: tnx.value,
          });
        });
      });

      setTrxs(_tnxs);
    }
  }, [wallets.syncing]);

  return (
    <div>
      <PageHeader>Transactions</PageHeader>
      <TableTitle>Total Transactions - {trxs.length}</TableTitle>
      <TableRow>
        <div>Coin</div>
        <div>Wallet</div>
        <div>Amount</div>
        <div>Result</div>
        <div>Status</div>
      </TableRow>

      {trxs.map((tnx) => (
        <TableRowcard>
          <CellItem>
            <img src="icons/bitcoin.svg" />
            <div>{tnx.coin}</div>
            {/* <div style={{fontSize: '14px', fontWeight: 'bold'}}>12/11/2022</div>
          <div style={{fontSize: '12px'}} >10:31:20 AM</div> */}
          </CellItem>
          <CellItem>{tnx.wallet}</CellItem>
          <CellItem>{tnx.amount}</CellItem>
          <CellItem highlight>RECIVED</CellItem>
          <CellItem highlight>SUCCESS</CellItem>
        </TableRowcard>
      ))}
    </div>
  );
};

export default Transactions;
