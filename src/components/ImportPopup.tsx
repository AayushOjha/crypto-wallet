import { useState } from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import { fetchWalletData } from "../store/walletSlice";
import { useAppDispatch } from "../hooks/redux";
import { ethers } from "ethers";
interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ContentBox = styled.div`
  background-color: ${(props) => props.theme.colors.cardBg};
  padding: 20px;
  border-radius: 12px;
  min-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.4);
  position: relative;
`;

const Title = styled.h2`
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

const InputContainer = styled.div<{ marginTop?: string }>`
  margin-top: ${(props) => props.marginTop || "30px"};
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 14px;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  cursor: pointer;
`;

const Input = styled.input`
  background-color: inherit;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 8px;
  color: ${(props) => props.theme.colors.text};
`;

const InputArea = styled.textarea`
  background-color: inherit;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 8px;
  color: ${(props) => props.theme.colors.text};
`;

const Submit = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px 30px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 12px;
  margin: 30px auto 20px auto;
  display: block;
`;

const ImportPopup = ({ isOpen, setIsOpen }: IProps) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleClose = () => {
    setName("");
    setPrivateKey("");
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (!name || !privateKey) {
      return alert("Please enter proper values");
    }

    try {
      const wallet = new ethers.Wallet(privateKey);
      console.log("Address: " + wallet.address);

      dispatch(fetchWalletData({address: wallet.address, name}));
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  return (
    <Popup open={isOpen} onClose={handleClose}>
      <ContentBox>
        <Title> Import Wallet </Title>

        <InputContainer>
          <span>Enter your Wallet name</span>
          <Input
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
        </InputContainer>

        <InputContainer>
          <span>Enter your Private Key</span>
          <InputArea
            rows={6}
            value={privateKey}
            onChange={({ target }) => {
              setPrivateKey(target.value);
            }}
          />
        </InputContainer>

        <Submit onClick={handleSubmit}>Submit</Submit>

        <CloseBtn onClick={handleClose}>
          <img src="icons/cross.png" />
        </CloseBtn>
      </ContentBox>
    </Popup>
  );
};

export default ImportPopup;
