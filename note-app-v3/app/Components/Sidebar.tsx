"use client"
import React from 'react';
import styled from 'styled-components';

import { useGlobalState } from '../Context/globalProvider';

const Sidebar = () => {
  const { theme, collapsed, collapseMenu } = useGlobalState();

  console.log(theme);

  return (
    <SidebarStyled theme={theme} collapsed={collapsed}>
      Sidebar
    </SidebarStyled>
  )
};

const SidebarStyled = styled.nav<{ collapsed: boolean }>`
  position: relative;
  width: ${props => props.theme.sidebarWidth};
  background-color: ${props => props.theme.colorBg2};
  border: 2px solid ${props => props.theme.borderColor2};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${props => props.theme.colorGrey3};

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;

    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${props =>
    props.collapsed ? "translateX(-107%)" : "translateX(0)"
  };

    .toggle-nav {
      display: block !important;
    }
  }
    
`;

export default Sidebar