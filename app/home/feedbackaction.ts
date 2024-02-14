'use server'

import startDb from "@/lib/db";
import FeedbackModel from "@/models/feedbackModel";
import { FeedbackContent } from "@/types/feedback";
import EmailSender from "@/utils/email/email";

export async function submitFeedback(formData: FeedbackContent) {
  //startDb();
  //const result = await FeedbackModel.create(formData)
  //return result;
  
  await EmailSender.sendFeedbackToSelf(formData);
}
