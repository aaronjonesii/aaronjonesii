import { Config } from "./types";

const config: Config = {
  location: 'us-central1',
  smtpConnectionUri: process.env.SMTP_CONNECTION_URI,
  smtpPassword: process.env.SMTP_PASSWORD,
  defaultFrom: 'jonesaaron1996@gmail.com',
  defaultReplyTo: 'Aaron Jones II <jonesaaron1996@gmail.com>',
  templatesCollection: 'templates',
  testing: process.env.TESTING === "true",
};

export default config;
