const fs = require('fs')

const archivo = (nombreArchivo, delimitador) => {
    const contenido = fs.readFileSync(nombreArchivo).toString()
    return contenido.split(delimitador);
}

const equipoA = archivo('./basket/equipo-A.txt','\n');
const equipoB = archivo('./basket/equipo-B.txt','\n');
const partido = archivo('./basket/partido.log','\n')

// console.log(equipoA);
// console.log(equipoB);
// console.log(partido);

const puntos = (partido, equipo) => {

    const regitroEquipo = partido.filter((anotacion) => {

        let apellido = anotacion.split(',')[0]        
        let apellidos = equipo.map(nombreCompleto => nombreCompleto.split(" ")[1])              
        return apellidos.includes(apellido)
    })

    const tantos = {}
    let total = 0
    let max = 0
    let goleador
    const distrubucionPuntos = {
        dobles : 0,
        triples: 0
    }

    regitroEquipo.forEach(anotacion => { 
        const apellido = anotacion.split(',')[0]
        let tanto    = anotacion.split(',')[1]
        
        if (tanto === 'DOBLE') {
            distrubucionPuntos.dobles++
            tanto = 2

        } else 
        {
            distrubucionPuntos.triples++
            tanto = 3
        }

        tantos[apellido] = tantos[apellido] || 0
        tantos[apellido] += tanto
        total += tanto

        if (tantos[apellido] > max) {
            max = tantos[apellido]
            goleador = apellido
        }
        
    })

    return {
        total,
        tantos,
        goleador,
        max,
        distrubucionPuntos
    }
}

const goleadorDelPartido =() => {

    const goleadorTotal = {}

if (puntosEquipoA.max > puntosEquipoB.max) {
    goleadorTotal.nombre = puntosEquipoA.goleador
    goleadorTotal.goles  = puntosEquipoA.max 
} else{ 
    goleadorTotal.nombre = puntosEquipoB.goleador
    goleadorTotal.goles  = puntosEquipoB.max 

}

    return goleadorTotal
 }


 const obtenerGanador = (puntosEquipoA, puntosEquipoB) => {

    const equipoGanador = {}        
    

    if (puntosEquipoA.total > puntosEquipoB.total) {
        equipoGanador.nombre = 'Equipo A'
        equipoGanador.total = puntosEquipoA.total
        
    }
        else{
            equipoGanador.nombre = 'Equipo B'
            equipoGanador.total = puntosEquipoB.total
        }
        
        return equipoGanador
    }


   


//MAIN

const puntosEquipoA = puntos(partido, equipoA);
const puntosEquipoB = puntos(partido, equipoB);
console.log(puntosEquipoA)
console.log(puntosEquipoB)

const goleadorMax = goleadorDelPartido()
const ganadorDelPartido = obtenerGanador(puntosEquipoA, puntosEquipoB)


console.log(' -------- RESUMEN GENERAL-------------')
console.log('*** Equipo Ganador del partido ***')
console.log(ganadorDelPartido)
console.log('*** Datos del goleador del partido ***')
console.log(goleadorMax)
console.log('*** Distribucion de puntos por equipo ***')
console.log('Equipo A')
console.log(puntosEquipoA.distrubucionPuntos)
console.log('Equipo B')
console.log(puntosEquipoB.distrubucionPuntos)