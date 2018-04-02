import React, { Component } from 'react';
import {
  Segment,
  Grid,
  Container,
  Form,
  Button,
} from 'semantic-ui-react';


class KeyForm extends Component {
  state = {
    publicKey: '',
    privateKey: '',
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { publicKey, privateKey } = this.state;

    this.props.onSubmit({ publicKey, privateKey });
  }

  render() {
    const { publicKey, privateKey } = this.state;

    return (
      <Segment style={{ padding: '1em 0em' }} vertical>
        <Container>
          <Grid divided columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Form.Input
                  fluid
                  label='Llave Pública'
                  placeholder='0xC2D7CF95...'
                  name="publicKey"
                  value={publicKey}
                  onChange={this.handleChange}
                />
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Form.Input
                  fluid
                  label='Llave Privada'
                  type='password'
                  placeholder='***********'
                  name="privateKey"
                  value={privateKey}
                  onChange={this.handleChange}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '2em' }}>
                <Button
                  icon="search"
                  size="large"
                  color="green"
                  content='Buscar'
                  labelPosition='right'
                  onClick={this.handleSubmit}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}


export default KeyForm;
