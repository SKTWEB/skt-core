import React from 'react';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import { fetchComponentDataBeforeRender } from '../../common/api/fetchComponentDataBeforeRender';

import configureStore from '../../common/store/configureStore';
import { getUser } from '../../common/api/user';

import routes from '../../common/routes';
import packagejson from '../../../package.json';
import qs from 'query-string';
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';

//渲染页面
const renderPage = (html, initialState) => {
    return `
          <!doctype html>
          <html>
              <head>
                  <meta charset="utf-8">
                  <title>Isomorphic Redux Example</title>
                  <link rel="stylesheet" type="text/css" href="/css/index.css">
              </head>
              <body>
                  <div id="root">${html}</div>
                  <script>
                      window.__INITIAL_STATE__ = ${serialize(initialState)};
                  </script>
                  <script src="/bundle.js"></script>
              </body>
          </html>
  `;
}

export default function reactServerMiddleware(req,res,next){

    const { url } = req ;
    const location = createLocation(url);

    getUser(user => {
        if(!user) {
            return res.status(401).end('Not Authorised');
        }
        match({routes, location}, (error, redirectLocation, renderProps) => {

            if(error){
                console.error('ROUTER ERROR:', pretty.render(error));
                return res.status(500).end('Internal server error');
            }else if (!renderProps) {
                return res.status(404).end('Not found');
            } else {

                const store = configureStore({user : user, version : packagejson.version});
                const initialState = store.getState();
                const InitialView = (
                    <Provider store={store} >
                        <RoutingContext {...renderProps} />
                    </Provider>
                );
                fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
                  .then(html=>{

                      const componentHTML = renderToString(InitialView);

                      res.status(200).send(renderPage(componentHTML,initialState))
                  }).catch(err => res.send(err.message));
            }
        });
    });


}
