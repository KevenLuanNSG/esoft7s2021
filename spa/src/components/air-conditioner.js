import React, { useState } from 'react';

function AirConditioner() {
    const [temperature, alterTemperature] = useState(25);
    const [on, alterStatus] = useState(false)

    const tempMax = 27
    const tempMin = 16

    const up = () => {
        if(temperature >= tempMax || !on){
            if(on){
                alert('Temperatura máxima atingida!')
            } else {
                alert('Ar Condicionado desligado!')
            }
        } else {
            alterTemperature(temperature+1);
        }
    }

    const down = () => {
        if(temperature <= tempMin || !on){
            if(on){
                alert('Temperatura miníma atingida!')
            } else {
                alert('Ar Condicionado desligado!')
            }
        } else {
            alterTemperature(temperature-1);
        }      
    }

    const turnOnturnOff = () => {
        alterStatus(!on)
    }

    return (
        <div><center>
            Ar Condicionado <br></br>
            Temperatura: {temperature}ºC  <br></br>
            <button onClick={up}>+</button>
            <button onClick={down}>-</button> <br></br>
            Status: {on ? 'Ligado' : 'Desligado'} <br></br>
            <button onClick={turnOnturnOff}>{on ? 'Desligar' : 'Ligar'}</button>
        </center></div>
    );
}

export default AirConditioner;

