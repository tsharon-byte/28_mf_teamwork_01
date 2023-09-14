import type { Model } from 'sequelize-typescript'
import Controller from '../core/controller'
import TopicModel from '../models/topic'
import TopicValidator from '../validators/topic'
import type { ITopicData } from '../types/topic'
import topicFilterset from '../filtersets/topic'

class TopicController extends Controller<ITopicData> {
    constructor() {
        super(TopicModel, TopicValidator, topicFilterset)
    }

    override async create(data: ITopicData, user: number): Promise<Model> {
        return await super.create({
            ...data,
            authorId: user
        })
    }

    override async update(id: string, data: ITopicData, partial: boolean, user: number): Promise<Model> {
        return await super.update(id, {
            ...data,
            authorId: user
        }, partial)
    }
}

export default new TopicController()
