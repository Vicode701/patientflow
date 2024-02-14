import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { FeedbackContent } from '@/types/feedback';
import { htmlToText } from "html-to-text";
import { FeedbackHTMLTemplate, PasswordResetHTMLTemplate } from '../app/const';
//import pug from 'pug';
//import { fromString } from 'html-to-text';

// Define a User type (modify it as per your actual User structure)
interface User {
  email: string;
  name: string;
}

class EmailSender {
  private to: string;
  private firstName: string;
  private url: string;
  private from: string;

  constructor(user: User, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = ` <${process.env.EMAIL_FROM}>`;
  }


  private static newTransport() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(fileName: string, subject: string) {
    // 1) Render HTML based on a pug template
    // const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
    //   firstName: this.firstName,
    //   url: this.url,
    //   subject
    // });
    const templatePath = path.resolve(__dirname, fileName);
    const template = fs.readFileSync(templatePath, 'utf-8');
    //const htmlContent = template.replace('{{firstName}}', firstName).replace('{{url}}', url);
    const url = "";
    const htmlContent = template.replace('{{url}}', url);

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: htmlContent
    };

    // 3) Create a transport and send email
    await EmailSender.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome!');
  }

  static async sendPasswordReset(email: string, resetLink: string) {
    const subject = "Reset your password";
    const sender = `PatientFlowHQ Support <${process.env.EMAIL_FROM}>`
    const htmlContent = PasswordResetHTMLTemplate.replace('{{resetlink}}', resetLink);
    const mailOptions = {
      from: sender,
      to: email,
      subject,
      html: htmlContent,
      text: htmlToText(htmlContent)
    };

    // 3) Create a transport and send email
    await EmailSender.newTransport().sendMail(mailOptions);
  }

  static async sendFeedbackToSelf(feedbackResponse: FeedbackContent) {
    const subject = "Hey! You got user feedback";
    const sender = `PatientFlowHQ User Feedback <${process.env.EMAIL_FROM}>`
    const recipient = `${process.env.EMAIL_FEEDBACK_TO}`

    const htmlContent = FeedbackHTMLTemplate.replace('{{satisfactoryResponse}}', feedbackResponse.satisfactoryResponse)
                        .replace('{{timeToSignedNotes}}', feedbackResponse.timeToSignedNotes)
                        .replace('{{totalDuration}}', feedbackResponse.totalDuration)
                        .replace('{{responseAccuracy}}', feedbackResponse.responseAccuracy)
                        .replace('{{decreaseInStress}}', feedbackResponse.decreaseInStress)
                        .replace('{{overallExperience}}', feedbackResponse.overallExperience)
                        .replace('{{userId}}', feedbackResponse.userId!)
                        .replace('{{caseId}}', feedbackResponse.caseId!)

    const mailOptions = {
      from: sender,
      to: recipient,
      subject,
      html: htmlContent,
      text: htmlToText(htmlContent)
    };

    // 3) Create a transport and send email
    await EmailSender.newTransport().sendMail(mailOptions);
  }
}

export default EmailSender;
