import React, { memo, useState } from "react";
import styled from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';
import Image1 from '../../assets/ieee-2.png';

const HeaderContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.95);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #f9a826;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ContactButton = styled.a`
  padding: 0.5rem 1rem;
  border: 2px solid #f9a826;
  border-radius: 20px;
  color: #f9a826;
  background-color: transparent;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: #f9a826;
    color: #000;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
  }
`;

/* Mobile-specific styles for the menu */
const MobileMenuIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    font-size: 2rem;
    cursor: pointer;
  }
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 20;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
`;

/* Adding a Close Button inside the Side Menu */
const SideMenuCloseButton = styled.div`
  align-self: flex-end;
  cursor: pointer;
  font-size: 2rem;
  color: white;
`;

const SideNavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #f9a826;
  }
`;

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <HeaderContainer>
            <Logo>
                <img src={Image1} alt="Ieee-cs" style={{ height: '40px' }} />
            </Logo>
            <Nav>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/team">Team</NavLink>
                <NavLink href="/events">Events</NavLink>
                <ContactButton href="./login">Login</ContactButton>
            </Nav>
            <MobileMenuIcon onClick={toggleMenu}>
                {menuOpen ? <FiX /> : <FiMenu />}
            </MobileMenuIcon>
            <SideMenu isOpen={menuOpen}>
                <SideMenuCloseButton onClick={toggleMenu}>
                    <FiX />
                </SideMenuCloseButton>
                <SideNavLink href="#about" onClick={toggleMenu}>About</SideNavLink>
                <SideNavLink href="#team" onClick={toggleMenu}>Team</SideNavLink>
                <SideNavLink href="#events" onClick={toggleMenu}>Events</SideNavLink>
                <ContactButton href="./login" onClick={toggleMenu}>Login</ContactButton>
            </SideMenu>
        </HeaderContainer>
    );
};

export default memo(Header);
