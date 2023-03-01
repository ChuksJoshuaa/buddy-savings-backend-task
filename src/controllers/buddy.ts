import { Request, Response } from "express";
import { BuddyAttributes, MessageProps, UserProps } from "../types";
import HttpException from "../exceptions/HttpExceptions";
import BuddyModel from "../models/buddy";
import UserModel from "../models/user";
import { buddyTransformer } from "../transformers/buddy";
import sgMail from "@sendgrid/mail";

//Create a new Buddy Saving
export const createBuddy = async (
  req: Request | any,
  res: Response
): Promise<Response | void> => {
  const buddy = req.body;

  const {
    title,
    buddies,
    buddiesTarget,
    savingMethod,
    savingFrequency,
    savingAmount,
    startSaving,
    endSaving,
    savingDuration,
    buddiesRelationship,
  } = buddy;

  try {
    if (
      title === "" ||
      buddies === "" ||
      buddiesTarget === "" ||
      savingMethod === "" ||
      savingFrequency === "" ||
      savingAmount === "" ||
      startSaving === "" ||
      endSaving === "" ||
      savingDuration === "" ||
      buddiesRelationship === ""
    ) {
      return res.status(404).json({ msg: "All fields are required" });
    } else {
      let newId = req.user.userId;

      await BuddyModel.create({
        ...buddy,
        creator: newId,
      })
        .then((data: BuddyAttributes) => {
          res.status(201).json({ data: buddyTransformer(data) });
        })
        .catch((err: HttpException) => {
          res.status(409).json({ msg: err.message });
        });
    }
  } catch (error) {
    res.status(409).json({ msg: error.msg });
  }
};

//Get All Buddies Saving made by all users in the platform
export const getAllBuddies = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    await BuddyModel.findAll()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err: HttpException) => {
        res.status(404).json({ msg: err.message });
      });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

//Get All Buddies Savings made by a single user
export const getBuddySavingBySingleUser = async (
  req: Request | any,
  res: Response
): Promise<Response | void> => {
  try {
    let userId = req.user.userId;
    await BuddyModel.findAll({
      where: {
        creator: userId,
      },
    })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err: HttpException) => {
        res.status(404).json({ msg: err.message });
      });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

//Get Single Buddy Saving
export const getSingleBuddySaving = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;
  try {
    await BuddyModel.findOne({
      where: {
        id: id,
      },
    })
      .then((data) => {
        res
          .status(200)
          .json({ data: buddyTransformer(data as BuddyAttributes) });
      })
      .catch((err: HttpException) => {
        res.status(404).json({ msg: err.message });
      });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

//Update posts
export const updateBuddySaving = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;
  const buddy = req.body;
  const {
    title,
    buddies,
    buddiesTarget,
    savingMethod,
    savingFrequency,
    savingAmount,
    startSaving,
    endSaving,
    savingDuration,
    buddiesRelationship,
  } = buddy;

  if (
    title === "" ||
    buddies === "" ||
    buddiesTarget === "" ||
    savingMethod === "" ||
    savingFrequency === "" ||
    savingAmount === "" ||
    startSaving === "" ||
    endSaving === "" ||
    savingDuration === "" ||
    buddiesRelationship === ""
  ) {
    return res.status(404).json({ msg: "All fields are required" });
  }

  try {
    await BuddyModel.update(
      {
        title,
        buddies,
        buddiesTarget,
        savingMethod,
        savingFrequency,
        savingAmount,
        startSaving,
        endSaving,
        savingDuration,
        buddiesRelationship,
      },
      { where: { id: id } }
    )
      .then(() => {
        return BuddyModel.findOne({ where: { id: id } });
      })
      .then((data) => {
        res
          .status(200)
          .json({ data: buddyTransformer(data as BuddyAttributes) });
      })
      .catch((err: HttpException) => {
        res.status(404).json({ msg: err.message });
      });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

//Delete Single Buddy Saving
export const deleteSingleBuddySaving = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;
  try {
    await BuddyModel.destroy({
      where: {
        id: id,
      },
    })
      .then(() => {
        res.status(200).send("Buddy Saving was deleted Successfully");
      })
      .catch((err: HttpException) => {
        res.status(404).json({ msg: err.message });
      });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

//Sending Invite using Send Grid Email
export const sendGridEmail = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { sender, receiver } = req.body;
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    //I can get the email from the registered user. it depends on the functionality of the platform and for testing purposes
    const msg = {
      to: receiver,
      from: sender,
      subject: "Buddy Saving Invite",
      text: "Do you want to join my buddy saving plan",
      html: '<div>Click this invite link <a href="/accept-invite">Here</a></div>',
    };
    sgMail
      .send(msg as any)
      .then(() => {
        res.status(200).json(msg);
      })
      .catch((error: HttpException) => {
        res
          .status(404)
          .json({ error: `${error} associated with Send Grid email` });
      });
  } catch (error) {
    res.status(404).json({ error: `${error} associated with Send Grid email` });
  }
};

//Accept invite into a Buddy Saving Plan
export const AcceptInviteToBuddySaving = async (
  req: Request | any,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;

  const buddy = await BuddyModel.findOne({ where: { id: id } });
  if (!buddy) {
    return res.status(404).json({ msg: "Cannot find buddy saving plan" });
  } else {
    try {
      let userId = req.user.userId;

      const buddyJoined = buddy.buddiesJoined;

      const User = await UserModel.findOne({ where: { id: userId } });

      let newArray = Object.assign([], buddyJoined);

      const myInterestingData = {
        id: User?.id,
        username: User?.username,
        email: User?.email,
      };

      const findValue = buddyJoined.find(
        (item) => item.id === myInterestingData.id
      );

      if (findValue) {
        return res.status(404).json({ msg: "User is already invited" });
      }

      newArray.push(myInterestingData as UserProps);

      await buddy
        .update({
          buddiesJoined: newArray,
        })
        .then(() => {
          return BuddyModel.findOne({ where: { id: id } });
        })
        .then((data) => {
          res
            .status(200)
            .json({ data: buddyTransformer(data as BuddyAttributes) });
        })
        .catch((err: HttpException) => {
          res.status(404).json({ msg: err.message });
        });
    } catch (error) {
      res.status(404).json({ msg: error.msg });
    }
  }
};
