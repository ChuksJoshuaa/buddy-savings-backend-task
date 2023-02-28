"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTransformer = void 0;
const userTransformer = (user) => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
    };
};
exports.userTransformer = userTransformer;
//# sourceMappingURL=user.js.map