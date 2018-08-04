'use strict';
const request = require('request');
const config = require('./config');
const pg = require('pg');
const moment = require('moment'); // Get date
const tipoPrograma = require('./other_functions/other_functions');
pg.defaults.ssl = true;

module.exports = {

    //
    update_user_estudiante: function(callback, setting, userId) {
        var pool = new pg.Pool(config.PG_CONFIG);
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }

            client
                .query(
                    'UPDATE procedimiento_ad_pre SET newsletter=$1 WHERE fb_id=$2', [setting, userId],
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            callback(false);
                        } else {
                            callback(true);
                        };
                        done();
                    });

        });
        //pool.end();
    },

    //Read

    read_user_estudiante: function(callback, nombreRequisito) {
        var pool = new pg.Pool(config.PG_CONFIG);
        console.log('Se entro a requisitosTramites.js');
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            client
                .query(
                    'SELECT requisito,costo FROM public.procedimiento_ad_pre WHERE nombre=$1', [nombreRequisito],
                    function(err, result) {
                        //
                        if (err) {
                            console.log(err);
                            callback('');
                        }
                        console.log('Se esta enviando: ', result.rows);
                        if (result.rows.length > 0) {
                            callback(result.rows);

                        } else {
                            callback('INDEFINIDO');
                        }

                        done();

                    });
            // assert(client.release === release)

        });

    },

    list_user_estudiante: function(callback) {
        var pool = new pg.Pool(config.PG_CONFIG);
        console.log('Se entro a listadoTramites');
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }

            client
                .query(
                    'SELECT * FROM procedimiento_ad_pre ORDER BY NOMBRE ASC',
                    function(err, result) {
                        //
                        if (err) {
                            console.log(err);
                            callback([]);
                        }
                        console.log('Se esta enviando: ', result.rows);
                        callback(result.rows);
                        done();

                    });
            // assert(client.release === release)

        });

    },

    //Update
    insert_user_estudiante: function(callback, datosRegistroEstudiantes) {
        var pool = new pg.Pool(config.PG_CONFIG);
        console.log('Datos enviados a insertarTramite: ', datosRegistroEstudiantes);
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            var date = moment().format();
            var getTipoPrograma = tipoPrograma.getTipoProgramaEstudiante(datosRegistroEstudiantes[0]);
            client
                .query(
                    'INSERT INTO user_estudiante (cod_estudiante,nombres,apellidos,dni,email,tipo_programa,nombre_escuela,fec_registro,fb_i)' +
                    'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [
                        datosRegistroEstudiantes[1],
                        datosRegistroEstudiantes[2],
                        datosRegistroEstudiantes[3],
                        datosRegistroEstudiantes[4],
                        datosRegistroEstudiantes[5],
                        getTipoPrograma,
                        datosRegistroEstudiantes[0],
                        date,
                        datosRegistroEstudiantes[6],
                    ],
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            callback([]);
                        } else {
                            callback([]);
                        };
                        done();
                    });

        });
        //pool.end();
    }

}