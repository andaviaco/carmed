import React, { Component } from 'react';

import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import getWeb3 from './utils/getWeb3';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      // this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    return (
      <div>
        <section className="hero is-primary is-medium">
          <div className="hero-head">
            <nav className="navbar">
              <div className="container">
                <div className="navbar-brand">
                  <a className="navbar-item">
                    CARMED
                  </a>
                  <span className="navbar-burger burger">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
                <div className="navbar-menu">
                  <div className="navbar-end">
                    <a className="navbar-item is-active">
                      Home
                    </a>
                    <a className="navbar-item">
                      About
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                Cartilla Médica
              </h1>
              <h2 className="subtitle">
                Tu cartilla médica distribuida
              </h2>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="columns">
            <div className="column">
              <h4 className="title is-4">Llave Pública</h4>

              <div className="field">
                <div className="control">
                  <textarea className="textarea is-primary" type="text" placeholder="Ejemplo: 0xC2D7CF95645D33006175B78989035C7c9061d3F9"></textarea>
                </div>
              </div>

              <div className="control">
                <button className="button is-primary">Submit</button>
              </div>
            </div>

            <div className="column">
              <h4 className="title is-4">Llave Privada</h4>

              <div className="field">
                <div className="control">
                  <textarea className="textarea" type="text" placeholder="Ejemplo: 3a1076bf45ab87712ad64ccb3b10217737f7faacbf2872e88fdd9a537d8fe266"></textarea>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="tile box">
            <div className="content container">

              <h2 className="title is-2">Juan Perez Rodriguez</h2>
              <h3 className="subtitle is-6">Ultima modificación: <em>05/Febrero/2018</em></h3>

              <div className="is-pulled-right">
                <div className="buttons has-addons">
                  <button className="button">
                    <span className="icon">
                      <i className="fas fa-print"></i>
                    </span>
                  </button>
                </div>
              </div>

              <table className="table is-hoverable">
                <tbody>
                  <tr>
                    <th className="has-text-centered" colSpan="3">
                      Información Básica
                    </th>
                  </tr>

                  <tr>
                    <th className="has-text-right">
                      Edad
                    </th>
                    <td>
                      46
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <th className="has-text-right">
                      Sexo
                    </th>
                    <td>
                      Masculino
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <th className="has-text-right">
                      Peso
                    </th>
                    <td>
                      76 kg
                    </td>
                    <td>
                      <button className="button is-small">
                        <span className="icon is-small">
                          <i className="fas fa-edit"></i>
                        </span>
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <th className="has-text-right">
                      Estatura
                    </th>
                    <td>
                      179 cm
                    </td>
                    <td>
                      <button className="button is-small">
                        <span className="icon is-small">
                          <i className="fas fa-edit"></i>
                        </span>
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <th className="has-text-centered" colSpan="3">
                      Información Médica
                    </th>
                  </tr>

                  <tr>
                    <th className="has-text-right">
                      Alergias
                    </th>
                    <td>
                      <ul>
                        <li>Penicilina</li>
                        <li>Sulfamidas</li>
                      </ul>
                    </td>
                    <td>
                      <button className="button is-small">
                        <span className="icon is-small">
                          <i className="fas fa-edit"></i>
                        </span>
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <th className="has-text-right">
                      Padecimientos
                    </th>
                    <td>
                      <ul>
                        <li>Miopía</li>
                        <li>Diabetes</li>
                      </ul>
                    </td>
                    <td>
                      <button className="button is-small">
                        <span className="icon is-small">
                          <i className="fas fa-edit"></i>
                        </span>
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <th className="has-text-right">
                      Cirugías
                    </th>
                    <td>
                      <ul>
                        <li>Arstrocopia de rodilla</li>
                        <li>Extirpación de apendice</li>
                      </ul>
                    </td>
                    <td>
                      <button className="button is-small">
                        <span className="icon is-small">
                          <i className="fas fa-edit"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App
