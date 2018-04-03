import React, { Component } from 'react';
import { Segment, Container, Button, Grid, Form, Sticky } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';

import { Hero,  Menu } from './components/layout';
import MedicalCard from './components/MedicalCard';
import KeyForm from './components/KeyForm';
import PatientFormModal from './components/PatientFormModal';

import MedicalCardFactoryContract from '../build/contracts/MedicalCardFactory.json';
import HealthContract from '../build/contracts/Health.json';
import getWeb3 from './utils/getWeb3';

import { ATTR_LANG_MAP } from './const';


const contractSetterMap = {
  height: 'changeHeight',
  weight: 'changeWeight',
  allergies: 'addAllergies',
  diseases: 'addDisease',
};

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      modalIsOpen: false,
      account: null,
      medicalCardFactory: null,
      medicalCardContract: null,
      currentCardInstance: null,
      publicKey: '',
      privateKey: '',
      cardData: {
        name: '',
        gender: '',
        weight: '',
        height: '',
        allergies: '',
        diseases: '',
        lastModification: 0,
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

  async setCardContractInstance(contractAddress) {
    const { medicalCardContract } = this.state;

    const instance = await medicalCardContract.at(contractAddress);
    console.log('INSTANCE', instance);
    this.setState({ currentCardInstance: instance });

    return instance;
  }

  async loadContractData(instance) {
    const { privateKey, account } = this.state;

    const name = await instance.name.call();
    const gender = await instance.gender.call();
    const weight = (await instance.weight.call()).c[0];
    const height = (await instance.height.call()).c[0];
    const lastModification = (await instance.lastModification.call()).c[0];

    let allergies = '';
    let diseases = '';

    if (privateKey) {
      allergies = await instance.getAllergies();
      diseases = await instance.getDiseases();
    }

    this.setState({
      cardData: {
        name,
        gender,
        weight,
        height,
        allergies,
        diseases,
        lastModification,
      },
    })
  }

  async persistContractUpdate(fieldName, value) {
    const { currentCardInstance, privateKey, account } = this.state;
    const setter = contractSetterMap[fieldName];

    try {
      // estimate gas cost to know if the transaction will not fail (pass the requirement)
      await currentCardInstance[setter].estimateGas(privateKey, value, { from: account });
    } catch(e) {
      return Promise.reject('La llave privada es inválida.');
    }

    // send transaction
    return await currentCardInstance[setter](privateKey, value, { from: account });
  }

  saveEditField = async (fieldName) => {
    const oldState = this.state;

    this.setState((state) => ({
      editViewIsOpen: false,
      cardData: {
        ...state.cardData,
        [fieldName]: state.editValue,
      },
    }));

    try {
      await this.persistContractUpdate(fieldName, this.state.editValue);
    } catch (e) {
      toast.error(e, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // naive optimistic rendering
      this.setState(oldState);
    }
  }

  handleCardFormSubmit = (data) => {
    this.createMedicalCard(data);
    this.handleCloseModal();
  }

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  }

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  }

  handlePrivateKeyChange = (privateKey) => {
    this.setState({ privateKey });
  }

  handleSearchCard = async ({ publicKey, privateKey }) => {
    this.setState({ publicKey, privateKey });

    try {
      const constractAddress = await this.getCardContract(publicKey);
      const instance = await this.setCardContractInstance(constractAddress);

      this.loadContractData(instance);
    } catch (e) {
      console.error(e);
    }
  }

  handleEditField = (fieldName) => {
    this.setState({
      editFieldName: fieldName,
      editFieldTitle: ATTR_LANG_MAP[fieldName].toUpperCase(),
      editValue: this.state.cardData[fieldName],
      editViewIsOpen: true,
    });
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
              onClick={this.handleOpenModal}
            />
          </Hero>
        </Segment>

        <KeyForm
          onPrivateKeyChange={this.handlePrivateKeyChange}
          onSubmit={this.handleSearchCard}/>

          <Segment vertical>
            <Container>
              <div ref={this.handleContextRef}>
                <Grid columns={editViewIsOpen? 2 : 1} divided>
                  {cardData.name && (
                    <Grid.Column width={editViewIsOpen? 12 : 16}>
                      <MedicalCard
                        {...cardData}
                        gender={ATTR_LANG_MAP[cardData.gender]}
                        onEdit={this.handleEditField}
                      />
                    </Grid.Column>
                  )}
                  { editViewIsOpen &&
                    <Grid.Column width={4}>
                        <Sticky context={contextRef}>
                          <Form onSubmit={this.saveEditField.bind(this, editFieldName)}>
                            <Form.Field>
                              <label>Cambiar {editFieldTitle}</label>
                              <input
                                placeholder={editFieldTitle}
                                value={editValue}
                                onChange={this.handleEditChange}
                              />
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
          onClose={this.handleCloseModal}
          onSubmit={this.handleCardFormSubmit}
        />

        <ToastContainer />
      </main>
    );
  }
}

export default App
