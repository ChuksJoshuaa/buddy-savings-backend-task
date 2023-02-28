"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buddyTransformer = void 0;
const buddyTransformer = (data) => {
    return {
        id: data.id,
        title: data.title,
        buddies: data.buddies,
        creator: data.creator,
        buddiesJoined: data.buddiesJoined,
        buddiesTarget: data.buddiesTarget,
        savingMethod: data.savingMethod,
        savingFrequency: data.savingFrequency,
        savingAmount: data.savingAmount,
        startSaving: data.startSaving,
        endSaving: data.endSaving,
        savingDuration: data.savingDuration,
        buddiesRelationship: data.buddiesRelationship,
    };
};
exports.buddyTransformer = buddyTransformer;
//# sourceMappingURL=buddy.js.map