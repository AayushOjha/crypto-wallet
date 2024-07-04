import React, { useState } from "react";
import styled from "styled-components";
import ImportPopup from "../components/ImportPopup";

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
  grid-template-columns: 3fr 3fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  align-item: center;
  margin: 15px 0;
  padding: 15px;
`;

const TableRowcard = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 1fr;
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

  const [openImportPopup, setOpenImportPopup] = useState(false)

  return (
    <>
    <div>
      <PageHeader>
        <ImportBtn onClick={() => setOpenImportPopup(true)}>
          <img src="icons/add.png" />
          IMPORT WALLET
        </ImportBtn>
      </PageHeader>
      <TableTitle>Total Coins - 7</TableTitle>
      <TableRow>
        <div>Coin</div>
        <div>Holding</div>
        <div>Action</div>
      </TableRow>

      <TableRowcard>
        <CellItem>
          <img src="icons/bitcoin.svg" /> BITCOIN
        </CellItem>
        <CellItem>BTC 0.00256</CellItem>
        <CellItem>
          <img src="icons/trash.png" />
        </CellItem>
      </TableRowcard>
    </div>
    <ImportPopup isOpen={openImportPopup} setIsOpen={setOpenImportPopup} />
    </>
  );
};

export default Wallet;
