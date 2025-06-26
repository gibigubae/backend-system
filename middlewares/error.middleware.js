const errorMiddleware = async (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;


    if (err.name === 'CastError') {
      const message = 'Resource not found. Invalid ID.';
      error = new Error(message);
      error.statusCode = 404;
    }

    if (err.code === 11000) {
      const message = 'Duplicate field value entered.';
      error = new Error(message);
      error.statusCode = 400;
    }



    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      error = new Error(messages.join(', '));
      error.statusCode = 400;
    }

    if (err.name === 'JsonWebTokenError') {
      error = new Error('Invalid token. Please log in again.');
      error.statusCode = 401;
    }

    if (err.name === 'TokenExpiredError') {
      error = new Error('Your token has expired. Please log in again.');
      error.statusCode = 401;
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      error = new Error('Invalid JSON payload.');
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Server Error',
    });

  } catch (error) {
    console.error('Error in errorMiddleware:', error);
    next(error);
  }
};

export default errorMiddleware;
