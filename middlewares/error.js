export function errorHandler (err, req, res, next) {
  const details = req.app.get('env') === 'development' ? `: ${err.message}` : '...'
  console.error(err)
  res.status(err.status || 500)
  res.json({error: details})
}
