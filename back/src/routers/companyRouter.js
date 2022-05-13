import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { companyService } from "../services/companyService";
import { Company } from "../db";

const companyRouter = Router();
const viewObj = new Object()

companyRouter.post("/company/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { name, companyName, email, password, filePath, contact, position } = req.body
    // 위 데이터를 유저 db에 추가하기
    const newCompany = await companyService.addCompany({
      name,
      companyName,
      email,
      password,
      filePath,
      contact,
      position,
    });

    if (newCompany.errorMessage) {
      // throw new Error(newUser.errorMessage);
      return res.status(400).json({
        status: 'error',
        error : newCompany.errorMessage,
      });
    }

    res.status(201).json(newCompany);
  } catch (error) {
    next(error);
  }
});

companyRouter.post("/company/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기

    const { email, password } = req.body;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const company = await companyService.getCompany({ email, password });

    if (company.errorMessage) {
      // throw new Error(company.errorMessage);
      return res.status(400).json({
        status: 'error',
        error : company.errorMessage,
      });
    }

    res.status(200).send(company);
  } catch (error) {
    next(error);
  }
});

companyRouter.get(
  "/companylist",
  //loginRequired, 삭제
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const company = await companyService.getCompanies();
      res.status(200).send(company);
    } catch (error) {
      next(error);
    }
  }
);

companyRouter.get(
  "/company/current",
  //loginRequired,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const companyId = req.currentCompanyId;
      const currentCompanyInfo = await companyService.getCompanyInfo({
        companyId,
      });

      if (currentCompanyInfo.errorMessage) {
        throw new Error(currentCompanyInfo.errorMessage);
      }

      res.status(200).send(currentCompanyInfo);
    } catch (error) {
      next(error);
    }
  }
);

companyRouter.put(
  "/company/:id",
  //loginRequired,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const companyId = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const companyName = req.body.companyName ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;

      const toUpdate = { companyName, email, password, description};
      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedCompany = await companyService.setCompany({ companyId, toUpdate });

      if (updatedCompany.errorMessage) {
        throw new Error(updatedCompany.errorMessage);
      }
      res.status(200).json(updatedCompany);
    } catch (error) {
      next(error);
    }
  }
);

companyRouter.get(
  "/company/:id",
  //loginRequired,
  async function (req, res, next) {
    try {
      const companyId = req.params.id;

      // 사용자마다 하루에 조회수 1씩
      const currentId = req.currentCompanyId

      const company = await Company.findById({ companyId });
      if (company){
        if (!viewObj[companyId]) {
               viewObj[companyId] = []
        }
        if (viewObj[companyId].indexOf(currentId) == -1){
          company.visited ++
          viewObj[companyId].push(currentId)
          setTimeout(() => {
            viewObj[companyId].splice(
              viewObj[companyId].indexOf(currentId),
              1
            )
          }, 86400000)
          for (let i in viewObj){
             if (i.length ==0){
               delete viewObj.i
             }
           }
        }
        await company.save()
      res.status(200).send(company);
      }
    } catch (error) {
      next(error);
    }
  }
);

// // jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
// userAuthRouter.get("/afterlogin", loginRequired, function (req, res, next) {
//   res
//     .status(200)
//     .send(
//       `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
//     );
// });

companyRouter.delete(
  "/company/:id", 
  //loginRequired, 
  async function (req, res, next) {
    try{
      const companyId = req.params.id;
      
      await companyService.deleteCompany({ companyId })

      res.send("status : success")
    } catch(error){
      next(error)
    }
});

export { companyRouter };
