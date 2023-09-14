import Validator from '../core/validator'
import type { ITopicData } from '../types/topic'
import TopicModel from '../models/topic'

class TopicValidator extends Validator<ITopicData> {
    constructor(data: ITopicData, partial: boolean) {
        super(data, partial)
    }

    override async validate() {
        this.authorIdValidate()
        await this.nameValidate()
        this.descriptionValidate()
    }

    authorIdValidate() {
        if (!this._partial || typeof this.data.authorId !== 'undefined') {
            if (typeof this.data.authorId === 'undefined') {
                throw new Error('authorId is required field')
            }
            if (this.data.authorId === null) {
                throw new Error('authorId shoud not be null')
            }
            if (typeof this.data.authorId !== 'number') {
                throw new Error('authorId should be number')
            }
        }
    }

    async nameValidate() {
        if (!this._partial || typeof this.data.name !== 'undefined') {
            if (typeof this.data.name === 'undefined') {
                throw new Error('name is required field')
            }
            if (this.data.name === null) {
                throw new Error('name shoud not be null')
            }
            if (typeof this.data.name !== 'string') {
                throw new Error('name should be string')
            }
            if (!this.data.name.trim()) {
                throw new Error('name should not be empty string')
            }
            if (this.data.name.length > 50) {
                throw new Error('name lenth should be less than 50')
            }
            const topic = await TopicModel.findOne({ where: { name: this.data.name } })
            if (topic) {
                throw new Error(`topic with name ${this.data.name} already exist`)
            }
        }
    }
    
    descriptionValidate() {
        if (this.data.description) {
            if (typeof this.data.description !== 'string') {
                throw new Error('description should be string')
            }
            if (this.data.description.length > 2047) {
                throw new Error('description lenth should be less than 2047')
            }
        }
    }
}

export default TopicValidator
