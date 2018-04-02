import React, { Component } from 'react';
import { Segment, Container, Button } from 'semantic-ui-react';

import {
  Hero,  Menu } from './components/layout';
import MedicalCard from './components/MedicalCard';
import KeyForm from './components/KeyForm';
import PatientFormModal from './components/PatientFormModal';

import MedicalCardFactoryContract from '../build/contracts/MedicalCardFactory.json';
import HealthContract from '../build/contracts/Health.json';
import getWeb3 from './utils/getWeb3';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      modalIsOpen: false,
      account: null,
      medicalCardFactory: null,
      medicalCardContract: null,
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
    const { medicalCardFactory, account } = this.state;

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
    const { account } = this.state;
    const name = await instance.getName.call();
    this.setState({ cardName: name })
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

  render() {
    const { modalIsOpen, cardName } = this.state;
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

        {cardName && (
          <Segment vertical>
            <Container>
              <MedicalCard name={cardName}/>
            </Container>
          </Segment>
        )}

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
