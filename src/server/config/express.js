/**
 * express配置
 */
import express from 'express';
import glob from 'glob';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compress from 'compression';
import session from 'express-session';
import ConnectMongo from 'connect-mongo';
import methodOverride from 'method-override';

const mongoStore = new ConnectMongo(session);
export default  function (app, config) {

    const env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';
    //favicon图标

    // app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(compress());
    app.use(express.static(config.root + '/public'));
    app.use(methodOverride());
    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: config.cookieSecret,
        store:new mongoStore({
            db:config.db,
            secret: config.cookieSecret,
        })
    }));
};
