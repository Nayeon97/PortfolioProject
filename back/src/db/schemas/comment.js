import { Schema, model } from "mongoose";


const commentSchema = new Schema(
  {
    // 포트폴리오 주인 id
    userId: {
        type: String,
        required: true,
    },
    // 댓글 작성자 id
    writerId:{
        type: String,
        required: true,
    },
    writerName:{
        type: String,
        required: true,
    },

    comment:{
        type: String,
        required: true
    },

  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", commentSchema);

export { CommentModel };
