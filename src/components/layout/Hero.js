import React from 'react';
import {
  Button,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react'

function Hero() {
  return (
    <Container text>
      <Header
        as='h1'
        content='CARMED'
        inverted
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '3em',
        }}
      />
      <Header
        as='h2'
        content='Tu Cartilla Médica distribuída.'
        inverted
        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
      <Button primary size='huge'>
        Crear Cartilla Médica
        <Icon name='right plus' />
      </Button>
    </Container>
  );
}

export default Hero;
