import { CommentModel } from "../schemas/comment"

class Comment {
    // 입력 받은 수상 정보 생성
    static async create({ newComment }) {
      const createdNewComment = await CommentModel.create(newComment);
      createdNewComment.writerId = createdNewComment.writerId._id
      return createdNewComment;
    }
    
    // 수상이력의 고유한 id로 수상이력 검색(수정 할 때 사용)
    static async findById({ _id }) {
      const comment = await CommentModel.findOne({ _id: _id }).populate('writerId', '-password');
      return comment;
  }


    // 입력받은 userId의 모든 수상이력 검색
    static async findByUserId({ userId }) {
      const comments = await CommentModel.find({ userId });
      return comments;
    }

    
    // 입력받은 값들로 수상이력 업데이트(수정)
    static async update({ commentId, fieldToUpdate, newValue}) {
      const filter = { id: commentId };
      const update = { [fieldToUpdate] : newValue};
      const option = { returnOriginal: false };
  
      const updatedComment = await CommentModel.findOneAndUpdate(
        filter,
        update,
        option
      );
      return updatedComment;
    }
  
    static async delete({ commentId }) {
      const deleteResult = await CommentModel.deleteOne({ _id: commentId });
      const isDataDeleted = deleteResult.deletedCount === 1;
      return isDataDeleted;
    }

  }
  
  export { Comment };