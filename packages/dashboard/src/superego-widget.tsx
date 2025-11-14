import React from 'react'

const SuperegoWidget = () => {
  return (
    <div className="h-full p-6 bg-light-0">
      <h3 className="font-light font-bold leading-tight tracking-tight text-large">Superego </h3>
      <p>
        Store Torv 1, 2. <br /> 7500 Holstebro
        <br />
        <a
          className="underline text-superego-green"
          href="https://superego.nu/kontakt/holstebro"
          target="_blank"
        >
          Superego.nu
        </a>
      </p>
      <br />
      <p>
        Tlf:{' '}
        <a href="tel:+4570707886" className="underline text-superego-green">
          +45 70 70 78 86
        </a>
        <br /> Mail:{' '}
        <a href="mailto:holstebro@superego.nu" className="underline text-superego-green">
          holstebro@superego.nu
        </a>
      </p>
      <p>Åbent alle hverdage fra kl. 08.00-16.00</p>
    </div>
  )
}

export default SuperegoWidget
