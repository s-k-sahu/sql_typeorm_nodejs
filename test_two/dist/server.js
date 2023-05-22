"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
dotenv_1.default.config();
const PORT = lodash_1.default.toNumber(process.env.PORT) || 5000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.status(200).json({
        message: "success",
    });
});
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
