import React, { Component } from 'react';

class KeyForm extends Component {
  render() {
    return (
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
    );
  }
}


export default KeyForm;
