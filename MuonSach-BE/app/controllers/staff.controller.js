const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const StaffService = require("../services/staff.service");
const jwt = require("jsonwebtoken");
const config = require("../config/index.js");

exports.create = async (req, res, next) => {
  if (!req.body?.Username || !req.body?.Password) {
    return next(new ApiError(400, "Username and Password can't be empty"));
  }
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the staff")
    );
  }
};

exports.findUsername = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);

    const { Username } = req.query;

    if (!Username) {
      return next(new ApiError(400, "Username is required"));
    }
    const document = await staffService.findUsername(Username);

    return res.send({ exists: !!document });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while checking username"));
  }
};

exports.login = async (req, res, next) => {
  const { Username, Password } = req.body;
  try {
    const staffService = new StaffService(MongoDB.client);
    const staff = await staffService.findUsername(Username);

    if (!staff || staff.Password !== Password) {
      return next(new ApiError(401, "Invalid username or password"));
    }

    const token = jwt.sign(
      { id: staff._id, username: staff.Username },
      config.jwt.secret,
      { expiresIn: "24h" }
    );

    return res.send({
      token: token,
      user: {
        _id: staff._id,
        Ten: staff.HoTenNV,
        Username: staff.Username,
        role: "staff",
      },
    });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while logging in"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const staffService = new StaffService(MongoDB.client);
    documents = await staffService.find({});
  } catch (error) {
    return next(new ApiError(500, "An error occurred while retrieving staff"));
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Staff not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving staff with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).lenght === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Staff not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error updating staff with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Staff not found"));
    }
    return res.send({ message: "Staff was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete staff with id=${req.params.id}`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.deleteAll();
    return res.send({
      message: `${document.deletedCount} staffs were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while removing all staffs")
    );
  }
};
