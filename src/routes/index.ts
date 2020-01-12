import { Router } from 'express';

const route = Router();

route.get('/', (req, res) => {
  return res.render('home.twig');
});

export default route;
