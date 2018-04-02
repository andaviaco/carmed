import React, { Component } from 'react';
import { Segment, Container, Button, Grid, Form, Sticky } from 'semantic-ui-react';

import { Hero,  Menu } from './components/layout';
import MedicalCard from './components/MedicalCard';
import KeyForm from './components/KeyForm';
import PatientFormModal from './components/PatientFormModal';

import MedicalCardFactoryContract from '../build/contracts/MedicalCardFactory.json';
import HealthContract from '../build/contracts/Health.json';
import getWeb3 from './utils/getWeb3';

import { ATTR_LANG_MAP } from './const';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      modalIsOpen: false,
      account: null,
      medicalCardFactory: null,
      medicalCardContract: null,
      cardData: {
        name: '',
        gender: '',
        weight: '',
        height: '',
      },
      editViewIsOpen: false,
      editValue: '',
      editFieldName: '',
      editFieldTitle: '',
      contextRef: null,
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      }, () => {
        this.instantiateContract()
      });
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    const contract = require('truffle-contract');
    const medicalCardFactory = contract(MedicalCardFactoryContract);
    const medicalCard = contract(HealthContract);

    medicalCardFactory.setProvider(this.state.web3.currentProvider);
    medicalCard.setProvider(this.state.web3.currentProvider);

    this.state.web3.eth.getAccounts(async (error, accounts) => {
      const instance = await medicalCardFactory.deployed();

      console.log('ACCOUNT', accounts[0]);
      return this.setState({
        medicalCardFactory: instance,
        account: accounts[0],
        medicalCardContract: medicalCard,
      });
    })
  }

  async createMedicalCard(data) {
    const { medicalCardFactory, account } = this.state;

    await medicalCardFactory.createCard(
      data.name,
      data.gender,
      data.height,
      data.weight,
      123,
      { from: account },
    );

  }

  async getCardContract(publicKey) {
    const { medicalCardFactory } = this.state;

    try {
      const contractAddress = await medicalCardFactory.getCardAddress.call(publicKey);

      return contractAddress;
    } catch (e) {
      throw e;
    }
  }

  async getCardContractInstance(contractAddress) {
    const { medicalCardContract } = this.state;

    return await medicalCardContract.at(contractAddress);
  }

  async loadContractData(instance) {
    const name = await instance.name.call();
    const gender = await instance.gender.call();
    const weight = (await instance.weight.call()).c[0];
    const height = (await instance.height.call()).c[0];

    this.setState({
      cardData: {
        name,
        gender,
        weight,
        height,
      },
    })
  }

  handleCardFormSubmit = (data) => {
    this.createMedicalCard(data);
    this.closeFormModal();
  }

  openFormModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeFormModal = () => {
    this.setState({ modalIsOpen: false });
  }

  searchCard = async ({ publicKey, privateKey }) => {
    try {
      const constractAddress = await this.getCardContract(publicKey);
      const instance = await this.getCardContractInstance(constractAddress);

      this.loadContractData(instance);

    } catch (e) {
      console.error(e);
    }
  }

  editField = (fieldName) => {
    this.setState({
      editFieldName: fieldName,
      editFieldTitle: ATTR_LANG_MAP[fieldName].toUpperCase(),
      editValue: this.state.cardData[fieldName],
      editViewIsOpen: true,
    });
  }

  saveEditField = (fieldName) => {
    this.setState((state) => ({
      editViewIsOpen: false,
      cardData: {
        ...state.cardData,
        [fieldName]: state.editValue,
      },
    }));
  }

  handleEditChange = ({ target }) => {
    this.setState({ editValue: target.value });
  }

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const {
      modalIsOpen,
      cardData,
      editViewIsOpen,
      editValue,
      editFieldName,
      editFieldTitle,
      contextRef,
    } = this.state;

    return (
      <main>
        <Segment
          inverted
          color='teal'
          textAlign='center'
          style={{ minHeight: 500, padding: '1em 0em' }}
          vertical
        >
          <Menu />
          <Hero>
            <Button
              primary
              size='huge'
              icon="plus"
              content="Crear Cartilla Médica"
              labelPosition='right'
              onClick={this.openFormModal}
            />
          </Hero>
        </Segment>

        <KeyForm onSubmit={this.searchCard}/>

          <Segment vertical>
            <Container>
              <div ref={this.handleContextRef}>
                <Grid columns={editViewIsOpen? 2 : 1} divided>
                  {cardData.name && (
                    <Grid.Column width={editViewIsOpen? 12 : 16}>
                      <MedicalCard
                        {...cardData}
                        gender={ATTR_LANG_MAP[cardData.gender]}
                        onEdit={this.editField}
                      />
                    </Grid.Column>
                  )}
                  { editViewIsOpen &&
                    <Grid.Column width={4}>
                        <Sticky context={contextRef}>
                          <Form onSubmit={this.saveEditField.bind(this, editFieldName)}>
                            <Form.Field>
                              <label>Cambiar {editFieldTitle}</label>
                              <input placeholder={editFieldTitle} name="kaka" value={editValue} onChange={this.handleEditChange}/>
                            </Form.Field>
                            <Form.Button color="blue">Guardar</Form.Button>
                          </Form>
                        </Sticky>
                    </Grid.Column>
                  }
                </Grid>
              </div>
            </Container>
          </Segment>

        <PatientFormModal
          open={modalIsOpen}
          onClose={this.closeFormModal}
          onSubmit={this.handleCardFormSubmit}
        />
      </main>
    );
  }
}

export default App
