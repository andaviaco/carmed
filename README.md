# CARMED

_**Nota**: projecto desarrollado para el Reto: Blockchain de la UdeG en Talent Land 2018_

##### Tabla de contenidos
- [Requerimientos](#requirements)  
- [Instalación](#install)  
- [Desarrollo](#emphasis)
- [Deployment de los contractos](#contractdeployment)
- [Dev server](#devserver)
- [Interfaz Web](#ui)
- [Smart Contracts](#smartcontracts)
  - [Health](#health)
  - [MedicalCardFactory](#medicalcardfactory)
  - [Deployment](#deployment)
- [Red de Nodos](#nodes)
- [Interacción del sistema](#system)


<a name="requirements"/>
## Requerimientos

- Nodejs

<a name="development"/>
### Desarrollo
- Ganache

<a name="install"/>
## Instalación

```
$ npm install

$ npm install -g truffe
```

<a name="contractdeployment"/>
## Deployment de los contractos
```
$ truffe compile

$ truffe migrate
```

<a name="devserver"/>
## Dev server
```
$ npm start
```


<a name="ui"/>
## Interfaz Web
Se contruyó usando **Semantic-UI** y **ReactJS** como framework, consta de diversos componentes que interactuan en una _SPA_. Internamente usamos **web3** y truffle-contract para interactuar con nuestros contratos a través de un proveedor (ejemplo: MetaMask).

![Header Screenshot](/../screenshots/header-screenshot.png?raw=true "Header Screenshot")

El objetivo principal del diseño de la interfaz es ser una herramienta simple que cualquier persona pueda utilizar sin complicadas interacciones. Tambien pretendemos que sea un intefas incluyente que cumpla con los estandares HTML de inclusión.

Procuramos brindar una experiencia fluída para el usuario, esto lo logramos en parte usando _optimistic rendering_ para que el usuario no note el tiempo que las transaction tardan en validarse,


<a name="smartcontracts"/>
## Smart Contracts
Tenemos dos contractos, uno que centra la información que necesitamos almacenar y otro que permite la administración de multiples contratos usando un patró de diseño _Factory_.


<a name="health"/>
### Health
Este contrato mantiene la información completa la cartilla médica y mantiene una interfaz donde se procura mostrar solo los datos permitidos. Este contrato define los datos que pueden ser consultados públicamente y datos que solo se pueden ver usando una contraseña privada que solo el dueño conoce.


<a name="medicalcardfactory"/>
### MedicalCardFactory
Permite la creación y el almacenamiento de contratos en el blockchain.

![Card Screenshot](/../screenshots/card-screenshot.png?raw=true "Card Screenshot")

<a name="deployment"/>
### Deployment
Los contratos son compilados y desplegados a la blockchain usando **Truffle**, su método de migración de contratos otras de sus herramientas. Durante el desarrollo usamos **Ganache** para simular una red local.


<a name="nodes"/>
## Red de Nodos


<a name="system"/>
## Interacción del sistema
Nuestra aplicación interactúan directamente con la blockchain una vez desplegados los contratos.

![System Diagram](/../screenshots/system-diagram.png?raw=true "System Diagram")
