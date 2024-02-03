let usersOnline = {}

// add user
function addUser(email, socketId) {
  usersOnline = {
    ...usersOnline,
    [socketId]: email,
  }
}

// remove user
function removeUser(socketId) {
  delete onlineUsers?.[socketId]
}

//get user
function getUser(email) {
  const socketId = Object.keys(usersOnline).find((key) => usersOnline[key] === email)
  if (!socketId) return null
  return { socketId, email: onlineUsers.socketId }
}

module.exports = { addUser, removeUser, getUser }
