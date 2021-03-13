function isAdminRole(req, res, next) {
  console.log('isAdmin auth ran---user:', req.user)
  if (req.user) {
    if (req.user.role === 'admin') {
      return next()
    }
  }
  console.log('not enough permissions-show error')
  res.send('please go back. Only administrators beyond this point')
}

// isUser() --> Verify user is correct
function isAdminUser(req, res, next) {
  if (req.user.email === 'rescueapp.no.reply@gmail.com') {
    return next()
  }
  res.send('Only administrators are allowed to do this')
}
module.exports = {isAdminUser, isAdminRole}
