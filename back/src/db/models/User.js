import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

   // 이메일 중복확인!
   static async findByEmails({ email }) {
    const user = await UserModel.find({ email });
    return user;
  }


  static async findById({ userId }) {
    const user = await UserModel.findOne({ id: userId });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async findByLoginMethod({ loginMethod }) {
    const user = await UserModel.findOne({ loginMethod });
    return user;
}

  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async delete({ userId }) {
    const deleteResult = await UserModel.deleteOne({ id: userId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { User };
