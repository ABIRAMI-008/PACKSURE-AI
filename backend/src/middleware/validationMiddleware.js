const validate = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.safeParse(req.body);

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: result.error.issues.map((issue) => ({
                        field: issue.path.join("."),
                        message: issue.message
                    }))
                });
            }

            req.body = result.data;

            next();

        } catch (error) {
            console.error("Validation error:", error.message);

            return res.status(400).json({
                success: false,
                message: "Invalid request data"
            });
        }
    };
};

module.exports = validate;