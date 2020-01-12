import { Router } from 'express';
import ServiceManage from '../services';

const route = Router();

route.get('/:postSlug-p:id', async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(); // pass to 404
  }
  const post = await ServiceManage.PostMapper.getOne(+id);
  if (!post) {
    return next(); // pass to 404
  }

  res.render('post', { post });
  return true;
});

export default route;
