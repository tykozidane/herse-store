const winston = require('winston');
const expressWinston = require('express-winston');
const uuid = require('uuid');
const moment = require('moment');
require('winston-daily-rotate-file');

module.exports = {
    request: expressWinston.logger({
        meta: true,
        transports: [
            new winston.transports.DailyRotateFile({
                filename: "./logs/%DATE%.log",
                datePattern: "YYYY/MM/DD",
                zippedArchive: true,
                frequency: '24h',
                maxFiles: '5d'
            }),
        ],
        format: winston.format.printf((info) => {
            var arr = [];
            var x = (info.meta.req.url).split('/').length;
            var url = '/'+(info.meta.req.url).split('/')[x-2]+(info.meta.req.url).split('/')[x-1];
            arr.push(moment().format('YYYY-MM-DD HH:mm:ss.SSS'));
            arr.push(info.meta.req.headers.idReq);
            arr.push('REQ');
            arr.push(info.meta.req.method);
            arr.push(url);
            arr.push(info.meta.req.ip);
            arr.push(JSON.stringify(info.meta.req.headers));
            arr.push(JSON.stringify(info.meta.req.body));

            return (arr).join(' | ');
        }),
        requestWhitelist: ['body', 'url', 'headers', 'method', 'ip', 'idReq'],
        responseWhitelist: ['body'],
    }),
    response: expressWinston.logger({
        meta: true,
        transports: [
            new winston.transports.DailyRotateFile({
                filename: "./logs/%DATE%.log",
                datePattern: "YYYY/MM/DD",
                zippedArchive: true,
                frequency: '24h',
                maxFiles: '5d'
            }),
        ],
        format: winston.format.printf((info) => {
            var arr = [];
            var x = (info.meta.req.url).split('/').length;
            var url = '/' + (info.meta.req.url).split('/')[x - 2] + '/' + (info.meta.req.url).split('/')[x - 1];
            var resTime = info.meta.responseTime + ' ms';
            arr.push(moment().format('YYYY-MM-DD HH:mm:ss.SSS')); //! Timestamp
            arr.push(info.meta.req.headers.idReq); //! ID
            arr.push('RES'); //! Name
            arr.push(info.meta.req.method); //! Method
            arr.push(url); //! Url
            arr.push(info.meta.req.ip); //! Remote Address
            arr.push(resTime); //! Response Time
            arr.push(JSON.stringify(info.meta.res.body)); //! Headers
            
            return (arr).join(' | ')
        }),
        requestWhitelist: ['body', 'url', 'headers', 'method', 'ip'],
        responseWhitelist: ['body'],
    }),
}