function errorHandling(app) {

  app.use((req, res) => {
    res.status(404).json({ errorMessage: "Te has perdido, esta ruta no existe" })
  })

  app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({errorMessage: "Problemas de servidor"})
  })

}
module.exports = errorHandling