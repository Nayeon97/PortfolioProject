import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { CommentService } from "../services/commentService";

const commentRouter = Router();
// 로그인 체크 여부 확인(postman 사용할 때는 있으면 로그인이 필요합니다 뜸)
commentRouter.use(loginRequired);

commentRouter.post("/comment/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    
    const writerId = req.currentUserId;
    console.log(writerId);
    const {userId, comment} = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newComment = await CommentService.addComment({
      userId : userId,
      writerId : writerId,
      comment : comment,
    });
    
    if (newComment.errorMessage) {
      throw new Error(newComment.errorMessage);
  }
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

commentRouter.get("/comment/:id", async function (req, res, next) {
    try {
      // req (request) 에서 id 가져오기
      const commentId = req.params.id;
  
      // 위 id를 이용하여 db에서 데이터 찾기
      const comment = await CommentService.getComment({ commentId });
  
      if (comment.errorMessage) {
        throw new Error(comment.errorMessage);
      }
  
      res.status(200).send(comment);
    } catch (error) {
      next(error);
    }
  });

  commentRouter.get("/commentlist/:userId", async function (req, res, next) {
      try {
          const userId = req.params.userId;
          const commentList = await CommentService.getCommentList({ userId });
          res.status(200).send(commentList);
      } catch(error){
          next(error);
      }
  });

  commentRouter.put("/comment/:id", async function (req, res, next) {
      try{
          const commentId = req.params.id;

          const comment = req.body.comment ?? null; // ??는 왼쪽 피연산자가 null 또는 undefined일 때 오른쪽 피연산자 반환 그렇지 않으면 왼쪽 피연산자 반환

          const toUpdate = { comment };

          const currentUserId = req.currentUserId

          const updatedComment = await CommentService.setComments({ commentId, toUpdate, currentUserId });

          if (updatedComment.errorMessage) {
              throw new Error(updatedComment.errorMessage);
          }
          res.status(200).send(updatedComment);
      } catch(error) {
          next(error);
      }
  });

  commentRouter.delete("/comment/:id", async function (req, res, next) {
    try {
      // req (request) 에서 id 가져오기
      const commentId = req.params.id;

      const currentUserId = req.currentUserId
  
      // 위 id를 이용하여 db에서 데이터 삭제하기
      const deletedComment = await CommentService.deleteComment({ commentId, currentUserId });
  
      if (deletedComment.errorMessage) {
        throw new Error(deletedComment.errorMessage);
      }
  
      res.status(200).send(deletedComment);
    } catch (error) {
      next(error);
    }
  });


export { commentRouter }
