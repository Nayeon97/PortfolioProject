import { Schema, model } from "mongoose";

const CompanySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    visited : {
      type: Number,
      required: false,
      default: 0,
    },
    loginMethod: {
      type: String,
      required: false,
      default: 'email'
  },
    filePath:{
        type : String,
        required: true,
    }

  },
  {
    timestamps: true,
  }
);

const CompanyModel = model("Company", CompanySchema);

export { CompanyModel };
