"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = (0, express_1.default)();
mongoose_1.default.connect('mongodb+srv://filpetrenko2000:admin@cluster0.e8frd27.mongodb.net/oauth?retryWrites=true&w=majority', {}, function () {
    console.log('mongo success');
});
app.get('/', function (req, res) {
    res.send("hello world");
});
app.listen(4000, function () {
    console.log('server started');
});
//# sourceMappingURL=index.js.map