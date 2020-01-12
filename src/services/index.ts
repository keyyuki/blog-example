import PostMapper from '../mappers/Post.mapper';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function factory() {
  const postMapper = new PostMapper();
  return {
    PostMapper: postMapper,
  };
}
const serviceManager = factory();
export default serviceManager;
