export async function errorHandle(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  return res.status(status).json({
    status: status,
    message: message,
  });
}

export async function responseHandle(res, { status, message, result }) {
  return res.status(status).json({
    status: status,
    message: message,
    result: result,
  });
}
