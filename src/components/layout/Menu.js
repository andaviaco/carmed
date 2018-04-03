import React from 'react';
import {
  Menu,
  Container,
} from 'semantic-ui-react'

function Hero() {
  return (
    <Menu
      inverted={true}
      pointing={true}
      secondary={true}
      size='large'
    >
      <Container>
        <Menu.Item as='a' active>Home</Menu.Item>
        <Menu.Item as='a'>About</Menu.Item>
      </Container>
    </Menu>
  );
}

export default Hero;
