import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ImportPopup from "../components/ImportPopup";
import { useAppSelector } from "../hooks/redux";

const PageHeader = styled.div`
  padding: 50px 0;
  display: flex;
  width: 100%;
  justify-content: end;
`;

const ImportBtn = styled.button`
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.cardBg};
  padding: 15px;
  border-radius: 12px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const TableTitle = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  padding: 5px 20px;
  margin-bottom: 30px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  align-item: center;
  margin: 15px 0;
  padding: 15px;
`;

const TableRowcard = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  margin: 15px 0;
  padding: 25px 15px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.cardBg};
`;

const CellItem = styled.div`
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
`;

const Wallet: React.FC = () => {
  const [openImportPopup, setOpenImportPopup] = useState(false);

  const [total, setTotal] = useState(0)
  const wallets = useAppSelector((state) => state.wallets);

  useEffect(() => {
    if (!wallets.syncing) {
      let _total = 0;
      Object.values(wallets.wallets).forEach(x => {
        _total += x.total || 0
      })
      setTotal(_total)
    }
  }, [wallets.syncing])

  return (
    <>
      <div>
        <PageHeader>
          <ImportBtn onClick={() => setOpenImportPopup(true)}>
            <img src="icons/add.png" />
            IMPORT WALLET
          </ImportBtn>
        </PageHeader>
        <TableTitle>Total Coins - {total}</TableTitle>
        <TableRow>
          <div>Coin</div>
          <div>Name</div>
          <div>Holding</div>
          <div>Action</div>
        </TableRow>

        {Object.values(wallets.wallets).map((w) => (
          <TableRowcard>
            <CellItem>
              <img src="icons/bitcoin.svg" /> {w.transactions[0]?.asset}
            </CellItem>
            <CellItem>{w.name}</CellItem>
            <CellItem>{w.total}</CellItem>
            <CellItem>
              <img src="icons/trash.png" />
            </CellItem>
          </TableRowcard>
        ))}

        {/* {JSON.stringify(wallets)} */}
      </div>
      <ImportPopup isOpen={openImportPopup} setIsOpen={setOpenImportPopup} />
    </>
  );
};

export default Wallet;
