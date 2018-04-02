import React, { Component } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
} from 'semantic-ui-react';

const genderOptions = [
  { key: 'm', text: 'Masculino', value: 'male' },
  { key: 'f', text: 'Femenino', value: 'female' },
]

class PatientFormModal extends Component {
  state = {
    name: '',
    gender: '',
    height: '',
    weight: '',
    open: false,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { name, gender, height, weight } = this.state;

    this.props.onSubmit({ name, gender, height, weight });
  }

  render() {
    const { open, onClose } = this.props;
    const { name, gender, height, weight } = this.state;
    return (
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          Crear nueva Cartillla
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              label='Nombre'
              name='name'
              value={name}
              onChange={this.handleChange}
            />
            <Form.Group widths='equal'>
              <Form.Select
                fluid
                label='Sexo'
                options={genderOptions}
                placeholder='Sexo'
                name='gender'
                value={gender}
                onChange={this.handleChange}
              />
              <Form.Field>
                <label>Estatura</label>
                <Input
                  label={{ basic: true, content: 'cm' }}
                  labelPosition='right'
                  placeholder='Estatura en centimetros'
                  name='height'
                  value={height}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Peso</label>
                <Input
                  label={{ basic: true, content: 'kg' }}
                  labelPosition='right'
                  placeholder='Peso en kilogramos'
                  name='weight'
                  value={weight}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form.Group>
            {/* <Form.Field>
              <label>Fecha de nacimiento</label>
              <Calendar />
            </Form.Field> */}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            content="Cancelar"
            onClick={onClose}
          />
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content='Crear'
            onClick={this.handleSubmit}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}


export default PatientFormModal;
