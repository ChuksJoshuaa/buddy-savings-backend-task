import { Model, BuildOptions } from "sequelize";

export type UserStatic = typeof Model & { associate: (models: any) => void } & {
  new (values?: Record<string, unknown>, options?: BuildOptions): any;
};

export type UserAttributes = {
  id: number;
  email: string;
  username: string;
  password: string;
};

export interface UserProps {
  id: number;
  email: string;
  username: string;
}

export type BuddyAttributes = {
  id: number;
  title: string;
  buddies: number;
  creator: number;
  buddiesJoined: UserProps[];
  buddiesTarget: string;
  savingMethod: string;
  savingFrequency: string;
  savingAmount: number | string;
  startSaving: Date;
  endSaving: Date;
  savingDuration: string;
  buddiesRelationship: string;
};

export interface MessageProps {
  to: string | undefined;
  from: string | undefined;
  subject: string;
  text: string;
  html: string;
}
