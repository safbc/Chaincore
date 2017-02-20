'use strict';

var app = require('connect')();
var cors = require('cors');
var http = require('http');
var swaggerTools = require('swagger-tools');

var jsyaml = require('js-yaml');
var fs = require('fs');
var serverPort = 3000;
app.use(cors());

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());

  var options = {
    swaggerUi: '/swagger.json',
    controllers: './controllers',
    // useStubs: process.env.NODE_ENV === 'development' ? true : false
  };

  app.use(middleware.swaggerRouter(options));
  app.use(middleware.swaggerUi());
  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });
});
