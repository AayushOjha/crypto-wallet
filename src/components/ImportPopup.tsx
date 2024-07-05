import { useState } from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import * as bitcoinjs from "bitcoinjs-lib";
// import * as ecc from 'tiny-secp256k1';
import ecc from '@bitcoinerlab/secp256k1';
import { ECPairFactory } from 'ecpair';
import { fetchWalletData } from "../store/walletSlice";
import { useAppDispatch } from "../hooks/redux";
// import { Buffer } from "buffer";

// window.Buffer = window.Buffer || Buffer;

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

const network = bitcoinjs.networks.testnet;
const ECPair = ECPairFactory(ecc);

const ImportPopup = ({ isOpen, setIsOpen }: IProps) => {

  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleSubmit = () => {
    if (!name || !privateKey) {
      return alert("Please enter proper values");
    }

    try {

      

      // logic

      // const x0x = "L5GNiUZC8g5CSGpTRYQoUH8QfXrQSLpmZtrtf2riVXzi1nk2Wzhk";
      // const x0x = "KzBJ2jLeuCpQ5entqin7u37EHdovBMj7yqYWCsXYZbb6JArcw3gW";
      const x0x = "Kyb3YJyNAhsHEE1tR5B7uEXWtWu2BStTtkiGHKAAVPvawPpF1xBw";
      // addr: tb1qjncu9msgxdungg7qqcrtpz5kd8z8ltd4wpyacl

      dispatch(fetchWalletData('msMgk6qaS5sso4CTao22VaUY8rbFPp3ThT'))

      // console.log(network)
      // const keyPair = ECPair.fromWIF(x0x, bitcoinjs.networks.testnet);
      // const { address } = bitcoinjs.payments.p2wpkh({
      //   pubkey: keyPair.publicKey,
      //   network: bitcoinjs.networks.testnet,
      // });
      
      // clean
      setName("");
      setPrivateKey("");
    } catch (error) {
      console.error(error);
    }
    // setIsOpen(false);
  };

  return (
    <Popup open={isOpen} onClose={() => setIsOpen(false)}>
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

        <CloseBtn>
          <img src="icons/cross.png" />
        </CloseBtn>
      </ContentBox>
    </Popup>
  );
};

export default ImportPopup;
