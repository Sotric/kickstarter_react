import Express = from 'express';
import http = from 'http';
import compression from 'compression';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bootstrapReactAppOnServer from './bootstrapReactAppOnServer';

export default function bootstrapHttpServer(app, server, config) {
  // create server
  var app = new Express();
  var server = new http.Server(app);

  // proxy middleware
  config.proxies.forEach((proxy) => {
    // split proxy path and config
    const { proxyPath, ...proxyConfig } = proxy;

    app.use(proxyPath, createProxy(proxyConfig, server));
  });

  // compression middleware
  if (config.compression) {
    app.use(compression());
  }

  // favicon middleware
  if (config.favicon) {
    app.use(favicon(config.favicon));
  }

  // cookies middleware
  if (config.cookies) {
    app.use(cookieParser());
  }

  // static directory middleware
  app.use(Express.static(config.static));

  // initialize app middleware
  app.use(bootstrapReactAppOnServer(config.app));

  // start server
  if (config.port && config.host) {
    server.listen(config.port, config.host, function(err) {
      if (err) {
        console.error(err);
      }
      console.info('----\n==> ✅  Node server is running, talking to API server.');
      console.info('==> 💻  Open http://localhost:%s in a browser to view the app.', config.port);
    });
  } else {
    console.error('==>     ERROR: No PORT or HOST config variable has been specified');
  }
};
