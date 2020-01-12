import { Router } from 'express';
import ServiceManage from '../services';
import postRoute from './post.route';

const route = Router();
route.use(postRoute);
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
