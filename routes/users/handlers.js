const Usuario = require('../../models/usuario');
const sendEmail = require('../../utils/email');
const random = require('../../utils/random');

const find = (req, res) => {
  Usuario.find((err, users) => {
    if (err) throw err;
    const filteredUsers = users.map(user => {
      const {
        _id,
        nombre,
        email,
        ubicacion,
        calificaciones,
        createdAt,
        updatedAt,
      } = user;
      return {
        _id,
        nombre,
        email,
        ubicacion,
        calificaciones,
        createdAt,
        updatedAt,
      };
    });
    res.json(filteredUsers);
  });
};

const findOne = (req, res) => {
  Usuario.findById(req.params.id, (err, user) => {
    if (user !== undefined && user !== null) {
      const {
        _id,
        nombre,
        email,
        ubicacion,
        calificaciones,
        createdAt,
        updatedAt,
      } = user;
      res.json({
        _id,
        nombre,
        email,
        ubicacion,
        calificaciones,
        createdAt,
        updatedAt,
      });
    } else {
      res.sendStatus(404);
    }
  });
};

const create = (req, res) => {
  const { nombre, email, password, ubicacion } = req.body;
  const user = new Usuario({
    nombre,
    email,
    password,
    ubicacion,
    calificaciones: [],
  });
  user.save(err => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).json({
        nombre,
        email,
      });
    }
  });
};

const uncreate = (req, res) => {
  Usuario.deleteOne(
    {
      _id: req.params.id,
    },
    err => {
      if (err) {
        res.sendStatus(404);
      }
      res.sendStatus(200);
    },
  );
};

const update = (req, res) => {
  Usuario.update(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    },
    err => {
      if (err) {
        res.status(400).json({ error: 'Error.' });
      } else {
        res.status(200).json({ mensaje: 'Usuario modificado' });
      }
    },
  );
};

const changePassword = (req, res) => {
  Usuario.findById(req.params.id, (err, u) => {
    if (u !== undefined && u !== null) {
      const user = u;
      user.password = req.body.newPassword;
      user.save(error => {
        if (error) {
          res.sendStatus(400);
        } else {
          res.json(user);
        }
      });
    }
  });
};

const forgotPassword = (req, res) => {
  Usuario.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) {
        res.sendStatus(400);
      }
      if (user) {
        const code = random(99999);
        const codeStr = `${code}`.padStart(5, '0');
        sendEmail(
          {
            recipient: user.email,
            subject: 'Nueva contraseña',
            text: `Hola!\n\nTu nueva contraseña es ${String(codeStr)}`,
          },
          error => {
            if (error) {
              res.sendStatus(500);
            }
            user.password = String(codeStr);
            user.save();
            res.sendStatus(200);
          },
        );
      } else {
        res.sendStatus(400);
      }
    },
  );
};

module.exports = {
  find,
  findOne,
  create,
  uncreate,
  update,
  changePassword,
  forgotPassword,
};
