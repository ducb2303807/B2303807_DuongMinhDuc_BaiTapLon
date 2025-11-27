const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const ReaderService = require("../services/reader.service");
const jwt = require("jsonwebtoken");
const config = require("../config/index.js");

exports.create = async (req, res, next) => {
  if (!req.body?.Username || !req.body?.Password) {
    return next(new ApiError(400, "MaDocGia and Password can't be empty"));
  }
  try {
    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the reader")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const readerService = new ReaderService(MongoDB.client);
    const { Username } = req.query;
    if (Username) {
      documents = await readerService.findByName(Username);
    } else {
      documents = await readerService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving readers")
    );
  }
  return res.send(documents);
};

exports.login = async (req, res, next) => {
  const { Username, Password } = req.body;
  try {
    const readerService = new ReaderService(MongoDB.client);
    const reader = await readerService.findUsername(Username);

    if (!reader || reader.Password !== Password) {
      return next(new ApiError(401, "Invalid username or password"));
    }

    const token = jwt.sign(
      { id: reader._id, username: reader.Username },
      config.jwt.secret,
      { expiresIn: "24h" }
    );

    return res.send({
      token: token,
      user: {
        id: reader._id,
        Ten: reader.Ten,
        Username: reader.Username,
        role: "reader",
      },
    });
  } catch (error) {
    return next(new ApiError(500, "An error occurred while logging in"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Reader not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving reader with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Reader not found"));
    }
    return res.send({ message: "Reader was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating reader with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Reader not found"));
    }
    return res.send({ message: "Reader was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete reader with id=${req.params.id}`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.deleteAll();
    return res.send({
      message: `${document.deletedCount} readers were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while removing all readers")
    );
  }
};
