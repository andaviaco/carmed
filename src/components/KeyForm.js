import React, { Component } from 'react';
import {
  Segment,
  Grid,
  Header,
  Container,
  Form,
} from 'semantic-ui-react';


class KeyForm extends Component {
  render() {
    return (
      <Segment style={{ padding: '1em 0em' }} vertical>
        <Container>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Form.Input fluid label='Llave Pública' placeholder='0xC2D7CF95...' />
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Form.Input fluid label='Llave Privada' type='password' placeholder='***********' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      </Segment>
    );
  }
}


export default KeyForm;
