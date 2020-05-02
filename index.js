'use strict';

const Hapi = require('@hapi/hapi'),
fs = require('fs'),
path = require('path'),
controllerDir = path.join(__dirname , 'controller')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    console.log("-------------------------ContRouters 1.0.0 -------------------------------------")
    fs.readdir(controllerDir , (err , dir) => { 
        dir.forEach(dirss => { 
            fs.readdir(path.join(controllerDir , dirss) , (err , jsFile) => {
                jsFile.forEach(cont => {
                    console.log('/' + cont.replace('.js',''))
                    server.route({
                        method : 'GET' , 
                        path : '/'+cont.replace('.js',''),
                        handler : (req,res) => {return "J"}
                    })
                })
        })
    })
    })

    await server.start();
    console.log("--------------------------------------------------------------------------------")
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();