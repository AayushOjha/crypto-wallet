import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  min-width: 200px;
  max-width: 400px;
  width: 28vw;
  padding: 20px;
`;

const SidebarMain = styled.div`
  height: 100%;
  background: ${(props) => props.theme.colors.cardBg};
  padding-top: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SidebarBottom = styled.div`
  width: 100%;
  padding: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  border-radius: 0 0 12px 12px;
  background: ${(props) => props.theme.colors.secondary};
  align-self: end;
  cursor: pointer;
`;

const SidebarItemContainer = styled.div`
  padding: 0 20px;
  margin: 15px 0;
`;
// TODO: highlight item on page
// border-left: 5px solid ${(props) => props.theme.colors.primary};

const SidebarItem = styled(Link)`
  display: block;
  color: white;
  padding: 15px 0;
  text-decoration: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarMain>
        <div>
          <SidebarItemContainer>
            <SidebarItem to="/wallet">
              <img src="icons/wallet.png" />
              Wallet
            </SidebarItem>
          </SidebarItemContainer>
          <SidebarItemContainer>
            <SidebarItem to="/transactions">
              <img src="icons/transcantion.png" />
              Transactions
            </SidebarItem>
          </SidebarItemContainer>
        </div>
        <SidebarBottom
          onClick={() => {
            alert("contact us at: support@abc.com");
          }}
        >
          Support
        </SidebarBottom>
      </SidebarMain>
    </SidebarContainer>
  );
};

export default Sidebar;
