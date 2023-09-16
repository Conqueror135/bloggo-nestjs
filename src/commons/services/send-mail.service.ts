import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

@Injectable()
export class MailService {
  private readonly oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_MAILER_CLIENT_ID,
    process.env.GOOGLE_MAILER_CLIENT_SECRET,
  );

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    this.oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
    });

    const { token } = await this.oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: token,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to,
      subject,
      html: text,
    };

    await transporter.sendMail(mailOptions);
  }
}
