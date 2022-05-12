import { CompanyModel } from "../schemas/company";

class Company {
  static async create({ newCompany }) {
    const createdNewCompany = await CompanyModel.create(newCompany);
    return createdNewCompany;
  }

  static async findByEmail({ email }) {
    const company = await CompanyModel.findOne({ email });
    return company;
  }

   // 이메일 중복확인!
   static async findByEmails({ email }) {
    const company = await CompanyModel.find({ email });
    return company;
  }


  static async findById({ companyId }) {
    const company = await CompanyModel.findOne({ id: companyId });
    return company;
  }

  static async findAll() {
    const companys = await CompanyModel.find({});
    return companys;
  }

  static async findByLoginMethod({ loginMethod }) {
    const company = await CompanyModel.findOne({ loginMethod });
    return company;
}

  static async update({ companyId, fieldToUpdate, newValue }) {
    const filter = { id: companyId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCompany = await CompanyModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCompany;
  }

  static async delete({ companyId }) {
    const deleteResult = await CompanyModel.deleteOne({ id: companyId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Company };
