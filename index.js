#!/usr/bin/env node

const shelljs = require('shelljs');
const inquire = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');



const iniciar = () => {
    console.log(
        chalk.green(
            figlet.textSync('HERMES CLI', {
                font: 'Larry 3D',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    )
}

const preguntasExecute = () => {
    const preguntas = [
        {
            name: 'LUGAR',
            type: 'input',
            message: '¿Como se llama tu archivo?'
        }, 
        {
            name: 'EXTENCION',
            type: 'list',
            message: '¿Que extencion es tu archivo?',
            choices: ['.js','.ts','.html','.css'],
            filter: (value) => {
                return value.split('.')[1];
            }
        }
    ]

    return inquire.prompt(preguntas);
}

const crearArchivo = (nombreFichero,extencion) => {
    const pathFichero = `${process.cwd()}/${nombreFichero}.${extencion}`;
    shelljs.touch(pathFichero)
    return pathFichero;
}

const finaleMessage  = filename => console.log(chalk.white.bgGreen.bold(`tu arvivo se guardo en ${filename}`));

const ejecutar = async() => {
    //titulo se utilza figlet
    iniciar()
    //Preguntas necesarias para crear los archivos nombres y extencion o template
    const respuestas = await preguntasExecute();
    const {LUGAR, EXTENCION} = respuestas;
    //console.log(LUGAR)
    // crear archivivo
    const pathFichero = crearArchivo(LUGAR,EXTENCION)
    // mensaje de creacion
    finaleMessage(pathFichero)
}

ejecutar();