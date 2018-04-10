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


## Requerimientos <a name="requirements"/>

- Nodejs

### Desarrollo <a name="development"/>
- Ganache


## Instalación <a name="install"/>

```
$ npm install

$ npm install -g truffe
```

## Deployment de los contractos <a name="contractdeployment"/>
```
$ truffe compile

$ truffe migrate
```

## Dev server <a name="devserver"/>
```
$ npm start
```


## Interfaz Web <a name="ui"/>
Se contruyó usando **Semantic-UI** y **ReactJS** como framework, consta de diversos componentes que interactuan en una _SPA_. Internamente usamos **web3** y truffle-contract para interactuar con nuestros contratos a través de un proveedor (ejemplo: MetaMask).

![Header Screenshot](/../screenshots/header-screenshot.png?raw=true "Header Screenshot")

El objetivo principal del diseño de la interfaz es ser una herramienta simple que cualquier persona pueda utilizar sin complicadas interacciones. Tambien pretendemos que sea un intefas incluyente que cumpla con los estandares HTML de inclusión.

Procuramos brindar una experiencia fluída para el usuario, esto lo logramos en parte usando _optimistic rendering_ para que el usuario no note el tiempo que las transaction tardan en validarse,


## Smart Contracts <a name="smartcontracts"/>
Tenemos dos contractos, uno que centra la información que necesitamos almacenar y otro que permite la administración de multiples contratos usando un patró de diseño _Factory_.


### Health <a name="health"/>
Este contrato mantiene la información completa la cartilla médica y mantiene una interfaz donde se procura mostrar solo los datos permitidos. Este contrato define los datos que pueden ser consultados públicamente y datos que solo se pueden ver usando una contraseña privada que solo el dueño conoce.


### MedicalCardFactory <a name="medicalcardfactory"/>
Permite la creación y el almacenamiento de contratos en el blockchain.

![Card Screenshot](/../screenshots/card-screenshot.png?raw=true "Card Screenshot")


### Deployment <a name="deployment"/>
Los contratos son compilados y desplegados a la blockchain usando **Truffle**, su método de migración de contratos otras de sus herramientas. Durante el desarrollo usamos **Ganache** para simular una red local.


## Red de Nodos <a name="nodes"/>


## Interacción del sistema <a name="system"/>
Nuestra aplicación interactúan directamente con la blockchain una vez desplegados los contratos.

![System Diagram](/../screenshots/system-diagram.png?raw=true "System Diagram")
