import { Router } from 'express'

const routes = Router()
/*Get All*/
routes.get('/', (req, res) =>
    res.render('index', { title: 'Constructo1' }))
/*Get One*/
routes.get('/About', (req, res) =>
    res.render('About', { numero: 30 }))
/*Create*/
routes.post('/', async (req, res) =>
    res.render('index', { title: 'Constructo' }))
/*Update One*/
routes.put('/About', (req, res) =>
    res.render('About', { numero: 30 }))
/*delete One*/
routes.delete('/About', (req, res) =>
    res.render('About', { numero: 30 }))

export default routes