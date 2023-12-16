const jwt = require('jsonwebtoken');
const secret = process.env.secret || 'fede'; // Se utiliza la variable de entorno o una clave por defecto

// Función para generar el token JWT
function generarToken(usuario) {
  const payload = {
    usuario: {
      id: usuario.idusuario,
      username: usuario.username,
    },
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: '10m',
    algorithm:'HS256'
  });

  return token;
}

module.exports = generarToken;

