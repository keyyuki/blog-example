import adapter from '../db';
import Post from '../interfaces/Post';
import tableNames from './TableNames.constance';
import * as get from 'get-value';

interface Paginator {
  icpp: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
interface ResultSet {
  rows: Array<Post>;
  paginator: Paginator;
}
export default class PostMapper {
  TABLE_NAME = 'posts';

  async search(filter: object, options: object): Promise<ResultSet> {
    let query = adapter<Post>(`${tableNames.POST} as p`);
    if (get(filter, 'q')) {
      query = query.where('title', 'like', `%${get(filter, 'q')}%`);
    }

    const totalQuery = query.clone();
    if (get(options, 'page')) {
      query = query.offset(get(options, 'page'));
    }

    const rows = await query;
    const total = await totalQuery.count();

    const paginator = this.buildPaginator(
      +total[0]['count'],
      get(options, 'page', { default: 1 }),
      20,
    );
    return {
      rows,
      paginator,
    };
  }

  buildPaginator(totalItems: number, page: number, icpp: number): Paginator {
    return {
      icpp: icpp,
      totalItems,
      currentPage: page,
      totalPages: totalItems ? Math.ceil(totalItems / icpp) : 0,
    };
  }
}
