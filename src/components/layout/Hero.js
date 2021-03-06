import React from 'react';
import {
  Container,
  Header,
} from 'semantic-ui-react'


function Hero({ children }) {
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

      { children }

    </Container>
  );
}

export default Hero;
