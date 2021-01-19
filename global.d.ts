import { Document, Model } from "mongoose";

declare global {
  // GLOBAL PACKAGES
  const express: typeof import("express");
  const app: ReturnType<typeof express>;
  const router: ReturnType<typeof express.Router>;
  const createError: typeof import("http-errors");
  const cookieParser: typeof import("cookie-parser");
  const logger: typeof import("morgan");
  const _: typeof import("lodash");
  const glob: typeof import("glob");
  const path: typeof import("path");
  const fs: typeof import("fs");
  const passport: typeof import("passport");
  const passportLocal: typeof import("passport-local");
  const passportJWT: typeof import("passport-jwt");
  const mongoose: typeof import("mongoose");
  const crypto: typeof import("crypto");
  const JWT: typeof import("jsonwebtoken");
  const bodyParser: typeof import("body-parser");
  const cors: typeof import("cors");
  const fs: typeof import("fs");
  const expressValidator: typeof import("express-validator");
  const sgMail: typeof import("@sendgrid/mail");
  const util: typeof import("util");
  const axios: typeof import("axios").default;

  // MODELS
  const models: {
    Users: typeof import("./src/modules/users/user.schema");
  };

  // MIDDLEWARES
  const middlewares: {
    id_validation: typeof import("./src/middlewares/id_validation.middleware");
    jwt: typeof import("./src/middlewares/jwt.middleware");
    local_passport: typeof import("./src/middlewares/local_passport.middleware");
    query_validation: typeof import("./src/middlewares/query_validation.middleware");
    validation: typeof import("./src/middlewares/validation.middleware");
  };
  // SERVICES
  const services: {
    AuthService: typeof import("./src/services/auth.service").AuthService;
    CrudService: typeof import("./src/services/crud.service").CrudService;
  };
  // UTILS
  const utils: {
    globalFile: typeof import("./src/utils/globalFile.util");
    hash: typeof import("./src/utils/hash.util");
    random: typeof import("./src/utils/random.util");
  };
  // LIBS
  const libs: {
    email_service: typeof import("./src/libs/email_service.lib");
  };
  // ACTIONS
  const actions: {
    users: {
      auth: typeof import("./src/modules/users/actions/user.auth.action").auth;
    };
  };
  // VALIDATORS
  const validators: {
    users: typeof import("./src/modules/users/user.validator.js");
  };

  const messages: typeof import("./config/messages");
  const dataConstraint: typeof import("./config/data_constraints");

  namespace Express {
    interface Request {
      roleModel: Model<Document>;
    }
  }
}
export {};
