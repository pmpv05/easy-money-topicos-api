const users = require('./users');
const divisas = require('./divisas');
const voluntades = require('./voluntades');
const propuestas = require('./propuestas');
const sessions = require('./sessions');
const transacciones = require('./transacciones');
const notificaciones = require('./notificaciones');

const resourceRoutes = [
  voluntades,
  propuestas,
  transacciones,
  sessions,
  divisas,
  users,
  notificaciones,
];

module.exports = router => {
  resourceRoutes.forEach(routes => routes(router));
  return router;
};
