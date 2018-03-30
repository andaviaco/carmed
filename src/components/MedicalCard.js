import React, { Component } from 'react';

class MedicalCard extends Component {
  render() {
    return (
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
    );
  }
}


export default MedicalCard;
