const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");
const path = require("path")

module.exports = {
    webpack: {
        alias: {
            "@service": path.resolve(__dirname, "src/service/"),
            "@components": path.resolve(__dirname, "src/components"),
        }
    }
}