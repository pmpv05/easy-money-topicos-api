const handlers = require('./handlers');
const validators = require('./validators');
//const authorization = require('../../middlewares/authorization');

module.exports = router => {
  router.post(
    '/transacciones',
    //authorization,
    validators.create,
    handlers.create,
  );
  router.get('/transacciones', validators.find, handlers.find);
  router.get('/transacciones/:id', validators.findOne, handlers.findOne);
  router.get(
    '/transacciones/voluntad/:voluntad',
    validators.buscarPorVoluntad,
    handlers.buscarPorVoluntad,
  );
  router.get(
    '/transacciones/propuesta/:propuesta',
    validators.buscarPorPropuesta,
    handlers.buscarPorPropuesta,
  );

  router.delete(
    '/transacciones/:id',
    //authorization,
    validators.uncreate,
    handlers.uncreate,
  );
  router.patch(
    '/transacciones/:id',
    //authorization,
    validators.update,
    handlers.update,
  );

  return router;
};
