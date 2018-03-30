import React from 'react';


function Hero() {
  return (
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
  );
}

export default Hero;
