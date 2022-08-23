import Joi from "joi-browser";

const createProductSchema = {
  name: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(10).max(1024).required(),
  category: Joi.string().min(2).max(1024).required(),
  price: Joi.string().min(0).max(256).required(),
  image: Joi.string().max(1024).allow(null, ""),
};

export default createProductSchema;
