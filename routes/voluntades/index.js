const handlers = require('./handlers');
const validators = require('./validators');
//const authorization = require('../../middlewares/authorization');

module.exports = router => {
  router.post('/voluntades', validators.create, handlers.create);
  router.get('/voluntades', validators.find, handlers.find);
  router.get('/voluntades/:id', validators.findOne, handlers.findOne);
  router.get(
    '/voluntades/usuario/:usuario',
    validators.buscarPorUsuario,
    handlers.buscarPorUsuario,
  );
  router.get(
    '/voluntades/divisa/:divisa',
    validators.buscarPorDivisa,
    handlers.buscarPorDivisa,
  );

  router.delete('/voluntades/:id', validators.uncreate, handlers.uncreate);
  router.patch('/voluntades/:id', validators.update, handlers.update);
  router.patch('/voluntades/inactivate/:id', handlers.inactivate);

  return router;
};
