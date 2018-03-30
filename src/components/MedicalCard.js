import React, { Component } from 'react';
import {
  Card,
  List,
  Header,
  Button,
  Label,
} from 'semantic-ui-react';

class MedicalCard extends Component {
  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <Header as='h2'>Juan Perez Rodriguez</Header>
          </Card.Header>

          <Card.Meta>Ultima modificación: <em>05/Febrero/2018</em></Card.Meta>

          <Card.Description>
            <Label color='green' ribbon>Información Básica</Label>

            <List celled size="large">
              <List.Item>
                <List.Header>Edad</List.Header>
                46
              </List.Item>
              <List.Item>
                <List.Header>Sexo</List.Header>
                Masculino
              </List.Item>
              <List.Item>
                <List.Header>
                  Peso <Button basic compact size="mini" icon='edit' />
                </List.Header>
                76 kg
              </List.Item>
              <List.Item>
                <List.Header>
                  Estatura <Button basic compact size="mini" icon='edit' />
                </List.Header>
                <span>179 cm</span>
              </List.Item>
            </List>

            <Label color='blue' ribbon>Información Médica</Label>

            <List celled size="large">
              <List.Item>
                <List.Header>
                  Alergias <Button basic compact size="mini" icon='edit' />
                </List.Header>
                <ul>
                  <li>Penicilina</li>
                  <li>Sulfamidas</li>
                </ul>
              </List.Item>
              <List.Item>
                <List.Header>
                  Padecimientos <Button basic compact size="mini" icon='edit' />
                </List.Header>
                <ul>
                  <li>Miopía</li>
                  <li>Diabetes</li>
                </ul>
              </List.Item>
              <List.Item>
                <List.Header>
                  Cirugías <Button basic compact size="mini" icon='edit' />
                </List.Header>
                <ul>
                  <li>Arstrocopia de rodilla</li>
                  <li>Extirpación de apendice</li>
                </ul>
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}


export default MedicalCard;
