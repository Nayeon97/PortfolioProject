import { Company } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { CompanyModel } from '../db/schemas/company';

class companyService {
  static async addCompany({
    name,
    companyName,
    email,
    password,
    filePath,
    position,
    contact,
  }) {
    // 이메일 중복 확인
    const company = await Company.findByEmail({ email });
    if (company) {
      const errorMessage =
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.';
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newCompany = {
      id,
      name,
      companyName,
      email,
      password: hashedPassword,
      filePath,
      position,
      contact,
      visited: 0,
    };

    // db에 저장
    const createdNewCompany = await Company.create({ newCompany });
    createdNewCompany.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewCompany;
  }

  static async getCompany({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const company = await Company.findByEmail({ email });
    if (!company) {
      const errorMessage =
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
    const token = jwt.sign({ userId: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = company.id;
    const companyName = company.companyName;
    const description = company.description;

    const loginCompany = {
      token,
      id,
      email,
      companyName,
      description,
      errorMessage: null,
    };

    return loginCompany;
  }

  static async getCompanies() {
    const company = await Company.findAll();
    return company;
  }

  static async setCompany({ companyId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let company = await Company.findById({ companyId });
    let email = toUpdate.email;
    let check = await Company.findByEmail({ email });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!company) {
      const errorMessage = '가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (company.email != email && check) {
      const errorMessage = '이미 존재하는 이메일 입니다.';
      console.log(errorMessage);
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.companyName) {
      const fieldToUpdate = 'companyName';
      const newValue = toUpdate.companyName;
      company = await Company.update({ companyId, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      const fieldToUpdate = 'email';
      const newValue = toUpdate.email;
      company = await Company.update({ companyId, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = 'password';
      const newValue = toUpdate.password;
      company = await Company.update({ companyId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = 'description';
      const newValue = toUpdate.description;
      company = await Company.update({ companyId, fieldToUpdate, newValue });
    }

    return company;
  }

  static async getCompanyInfo({ companyId }) {
    const company = await Company.findById({ companyId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!company) {
      const errorMessage =
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return company;
  }

  // 회원탈퇴
  static async deleteCompany({ companyId }) {
    const isDataDeleted = await Company.delete({ companyId });

    await CompanyModel.deleteOne({ companyId });
    if (!isDataDeleted) {
      const errorMessage =
        '해당 id를 가진 사용자는 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return { status: 'ok' };
  }
}

export { companyService };
