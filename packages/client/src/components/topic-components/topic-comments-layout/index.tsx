import React, { memo, FC, useRef, useEffect } from 'react'
import { TopicCommentsLayoutType } from './types'
import styles from './styles.module.css'
import { ContentLayout } from '../../../layouts'
import { TopicCommentItem } from '../topic-comment-item'

export const TopicCommentstLayout: FC<TopicCommentsLayoutType> = memo(
  ({ comments, header, footer }) => {
    const endCommentRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      if (endCommentRef.current) {
        endCommentRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, [comments])
    return (
      <ContentLayout
        mainClassName={styles.main}
        headerClassName={styles.header}
        footerClassName={styles.footer}
        header={header}
        footer={footer}>
        {comments &&
          comments.map((comment, index) => {
            const { id, text, author, date } = comment
            return (
              <TopicCommentItem
                ref={index === comments.length - 1 ? endCommentRef : null}
                key={id}
                text={text}
                author={author}
                date={date}
              />
            )
          })}
      </ContentLayout>
    )
  }
)
