const connect = require('../db/conexao');
const { hash } = require('bcrypt');
const UsuariosSchema = require('../db/Schemas/UsuarioSchema');
class UsuariosServices {
  constructor() {
    this.conexao = connect;
    this.usuarios = UsuariosSchema;
  }

  async createService(req, res) {
    const { nome, email, senha } = req.body;
    try {
      await this.conexao();
      const senhaHash = await hash(senha, 11)
      const usuario = await this.usuarios.create({
        nome,
        email,
        senha: senhaHash
      })
      const { senha: senhaUsuariosCriado, ...resto } = usuario._doc;
      return res.status(201).json({ usuario: resto });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = UsuariosServices;