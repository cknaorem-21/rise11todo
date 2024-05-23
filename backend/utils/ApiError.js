class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        data = null
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        this.success = false;

        // Captur the stack trace, excluding the constructor call from it
        Error.captureStackTrace(this, this.constructor);
    }
}

export { ApiError };
