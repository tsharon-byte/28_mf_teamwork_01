import Filterset from '../core/filterset'
import CommentModel from '../models/comment'

class CommentFilterset extends Filterset {
  constructor() {
    super(
      CommentModel,
      {
        topicId: 'exact',
        parentId: 'exact',
      },
      'text'
    )
  }
}

export default new CommentFilterset()
