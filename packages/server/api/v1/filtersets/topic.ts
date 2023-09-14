import Filterset from '../core/filterset'
import TopicModel from '../models/topic'

class TopicFilterset extends Filterset {
    constructor() {
        super(TopicModel, {}, 'name')
    }
}

export default new TopicFilterset()
