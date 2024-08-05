import passport from 'passport'

function getForm (req, res) {
  res.render('login', { message: false })
}
const autenticate = passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login'
})

export const Login = { getForm, autenticate }
