import { BuddyAttributes } from "../types";

export const buddyTransformer = (data: BuddyAttributes) => {
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
