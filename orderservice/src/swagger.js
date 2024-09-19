const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, './data/order_service_openapi.yaml'));

module.exports = (app) => {
  app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
