import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAllWalletData } from "../store/walletSlice";

const HeaderContainer = styled.div`
  width: 100%;
  padding: 15px 50px;
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  display: flex;
  justify-content: end;
`;

const SyncBtn = styled.button`
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 16px;
`;

const Header: React.FC = () => {
  const wallets = useAppSelector((state) => state.wallets);
  const dispatch = useAppDispatch()

  return (
    <HeaderContainer>
      <SyncBtn 
      onClick={() => {
        const payload = Object.keys(wallets.wallets).map(address => ({address, name: wallets.wallets[address].name}))
         dispatch(fetchAllWalletData(payload))
      }}
      >
        <img src="icons/sync.png" />
        {wallets.syncing ? "Syncing ..." : "Synced"}
      </SyncBtn>
    </HeaderContainer>
  );
};

export default Header;
