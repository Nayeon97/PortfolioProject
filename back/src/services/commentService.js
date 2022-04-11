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
    static async getCommentList({ userId }) {
        const comments = await Comment.findByUserId({ userId });
        return comments;
    }

    //특정 1개의 댓글 수정
    static async setComments({ toUpdate, commentId }) {
        let comment = await Comment.findById({ _id: commentId })
        if (!comment) {
            const errorMessage = "해당 id를 댓글은 없습니다. 다시 한 번 확인해주세요.";
            return { errorMessage }
        }

        if(toUpdate.comment){
            const fieldToUpdate = "comment";
            const newValue = toUpdate.comment;
            comment = await Comment.update({ commentId, fieldToUpdate, newValue });
        }
        return comment
    }

    //특정 1개의 댓글 삭제
    static async deleteComment({ commentId, currentUserId }) {
        let comment = await Comment.findById({ _id: commentId })
        console.log("comment", comment);
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