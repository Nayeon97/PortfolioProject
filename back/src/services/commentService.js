import { Comment } from "../db";

class CommentService {
    //신규 댓글 추가
    static async addComment({ userId, writerId, comment }) {
        const newComment = {userId, writerId, comment}
        const createdNewComment = await Comment.create({ newComment })
        return createdNewComment
    }

    static async getComment({ _id }) {

        const comment = await Comment.findById({ _id })
        if (!comment) {
            const errorMessage =
                "해당 댓글이 존재하지 않습니다.";
            return { errorMessage };
        }

        return comment;
    }

    //특정 쿼리의 댓글 내역 반환용
    static async getComments(query) {
        const comments = await Comment.findByQuery(query)
        if (!comments) {
            const errorMessage =
                "해당 유저의 댓글이 존재하지 않습니다.";
            return { errorMessage };
        }

        return comments;
    }

    //특정 1개의 댓글 수정
    static async setComments({ filedtoUpdate, commentId, currentUserId }) {
        let comment = await Comment.findById({ _id: commentId })
        if (comment.writerId !== currentUserId) {
            const errorMessage = "자신의 댓글이 아닌 댓글은 수정할 수 없습니다."
            return { errorMessage }
        }
        else {
            comment = await Comment.update({ commentId, filedtoUpdate })
            return comment
        }
    }

    //특정 1개의 댓글 삭제
    static async deleteComment({ commentId, currentUserId }) {
        let comment = await Comment.findById({ _id: commentId })

        if (!comment) {
            const errorMessage =
                "해당 댓글이 존재하지 않습니다.";
            return { errorMessage };
        }

        if (comment.writerId !== currentUserId) {
            const errorMessage = "자신의 댓글이 아닌 댓글은 삭제할 수 없습니다."
            return { errorMessage }
        }
        comment = await Comment.delete({ commentId })

        return comment;
    }
}

export { CommentService }
