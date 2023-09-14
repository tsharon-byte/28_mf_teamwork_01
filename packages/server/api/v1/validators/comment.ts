import Validator from '../core/validator'
import type { ICommentData } from '../types/comment'

class CommentValidator extends Validator<ICommentData> {
  constructor(data: ICommentData, partial: boolean) {
    super(data, partial)
  }

  override async validate() {
    this.authorIdValidate()
    this.topicIdValidate()
    this.textValidate()
    this.parentIdValidate()
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

  topicIdValidate() {
    if (!this._partial || typeof this.data.topicId !== 'undefined') {
      if (typeof this.data.topicId === 'undefined') {
        throw new Error('topicId is required field')
      }
      if (this.data.topicId === null) {
        throw new Error('topicId shoud not be null')
      }
      if (typeof this.data.topicId !== 'number') {
        throw new Error('topicId should be number')
      }
    }
  }

  textValidate() {
    if (!this._partial || typeof this.data.text !== 'undefined') {
      if (typeof this.data.text === 'undefined') {
        throw new Error('text is required field')
      }
      if (this.data.text === null) {
        throw new Error('text shoud not be null')
      }
      if (typeof this.data.text !== 'string') {
        throw new Error('text should be string')
      }
      if (!this.data.text.trim()) {
        throw new Error('text should not be empty string')
      }
      if (this.data.text.length > 2047) {
        throw new Error('text lenth should be less than 2047')
      }
    }
  }

  parentIdValidate() {
    if (
      this.data.parentId &&
      (typeof this.data.parentId !== 'number' ||
        typeof this.data.parentId !== null)
    ) {
      throw new Error('parentId should be number or null')
    }
  }
}

export default CommentValidator
