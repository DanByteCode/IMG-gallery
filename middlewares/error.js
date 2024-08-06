export function errorHandler (err, req, res, next) {
  const details = req.app.get('env') === 'development' ? `: ${err.message}` : 'Server error'
  console.error(err)
  res.status(err.status || 500)
  res.send(details)
}
