const loadClient = require('../config/db')

class UserService {
  constructor() {
    this.mongo = loadClient()
    this.db = 'chat-api'
    this.client = null
    this.connection = null
  }

  async connect() {
    this.client = await this.mongo.connect()
    this.connection = this.client.db('chat-api').collection('users')
    return true
  }

  async addUser(id, name, room) {
    if (!this.connection) await this.connect()
    const isExisted = await this.connection.findOne({
      name,
      room
    })
    if (isExisted) {
      await this.client.close()
      return {
        error: `User with name ${name} already existed in room ${room}`
      }
    }
    const { insertedId } = await this.connection.insertOne({
      socketId: id,
      name,
      room
    })
    await this.client.close()
    return {
      user: {
        _id: insertedId,
        socketId: id,
        name,
        room
      }
    }
  }

  async getUser(id) {
    if (!this.connection) await this.connect()
    const user = await this.connection.findOne({
      socketId: id
    })
    this.client.close()
    return { user }
  }

  async deleteUser(id) {
    if (!this.connection) await this.connect()
    const user = await this.connection.findOne({
      socketId: id
    })
    await this.connection.deleteOne({
      socketId: id
    })
    this.client.close()
    return {
      user
    }
  }
}

module.exports = UserService