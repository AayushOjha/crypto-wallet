import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 200px;
  background: ${(props) => props.theme.colors.cardBg};
  padding: 20px;
  height: 100vh;
`;

const SidebarItem = styled(Link)`
  display: block;
  color: white;
  margin-bottom: 10px;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarItem to="/wallet">Wallet</SidebarItem>
      <SidebarItem to="/transactions">Transactions</SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
