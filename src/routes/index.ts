import { Router } from 'express';
import ServiceManage from '../services';

const route = Router();

route.get('/', async (req, res) => {
  const resultSet = await ServiceManage.PostMapper.search(
    {},
    { icpp: 20, page: 0 },
  );
  return res.render('home.twig', {
    post: resultSet.rows,
    paginator: resultSet.paginator,
  });
});

export default route;
