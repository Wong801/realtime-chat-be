const UserService = require('./user')

const socketHandler = (io) => {
  io.on("connection", function (socket) {
    
    socket.on('login', async ({ name, room }, callback) => {
      const service = new UserService()
      const { user, error } = await service.addUser(socket.id, name, room)
      if (error) return callback(error)
      socket.join(user.room)
      socket.in(room).emit('notification', { type: 'notification', description: `${user.name} just entered the room` })
      callback()
    })

    socket.on('sendMessage', async (message) => {
      const service = new UserService()
      const { user } = await service.getUser(socket.id)
      io.in(user.room).emit('message', { type: 'message', id: socket.id, user: user.name, text: message });
    })

    socket.on("disconnect", async () => {
      const service = new UserService()
      const { user } = service.deleteUser(socket.id)
      if (user) {
        io.in(user.room).emit('notification', { type: 'notification', description: `${user.name} just left the room` })
      }
    })
  
  });
}

module.exports = socketHandler
