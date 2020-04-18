import { Router } from 'express'
import CepController from './controllers/CepController'

const routes = Router()

routes.get('/cep/:cep', CepController.findByCep)

export default routes