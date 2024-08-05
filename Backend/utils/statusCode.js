
const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const INTERNAL_SERVER_ERROR = 500;

const sendSuccess = (res, message, data = {}) => {
  return res.status(OK).json({
    status: 'success',
    message,
    data,
  });
};

const sendError = (res, message, statusCode = BAD_REQUEST) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
  });
};

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  sendSuccess,
  sendError,
};
