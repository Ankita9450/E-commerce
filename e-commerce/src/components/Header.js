import React from 'react'
import LoGo from "./image/images.png"
import "./Header.css";
import { Box, Flex,Heading, Stack ,Input, Button,Text, Spacer,Tag} from '@chakra-ui/react'
const Header = () => {
  return (
    <header > 
        
       <div >
      <img className="header__logo" src={LoGo} alt="" />
      
      </div>
    
    </header>
  );
};

export default Header
