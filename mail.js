import nodemailer from "nodemailer"
import { google } from "googleapis"
const OAuth2 = google.auth.OAuth2

async function collectorStoped() {
  const oauth2Client = new OAuth2(
    "663726316823-qdrljilejerm2kv3tk7e7jg00f08hm5f.apps.googleusercontent.com", //Client ID
    "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", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  )
  oauth2Client.setCredentials({
    refresh_token:
      "1//04EEi9zbTjqi8CgYIARAAGAQSNwF-L9IrMAzSxefGTWFl2JWPAgoxVZ9z49BXiMPUk79PWS8gKPpqsTmuThb-lEw8DhAE6L2SJMo",
  })
  const accessToken = oauth2Client.getAccessToken()

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "usama.zeeyou@gmail.com",
      clientId:
        "663726316823-qdrljilejerm2kv3tk7e7jg00f08hm5f.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04EEi9zbTjqi8CgYIARAAGAQSNwF-L9IrMAzSxefGTWFl2JWPAgoxVZ9z49BXiMPUk79PWS8gKPpqsTmuThb-lEw8DhAE6L2SJMo",
      accessToken: accessToken,
    },
  })

  const mailOptions = {
    from: "usama.zeeyou@gmail.com",
    to: "usama.zeeyou@gmail.com, zeeshanyousaf94@gmail.com, uzairajmal47@gmail.com",
    subject: `Collector Stoped`,
    html: `<h3>Hey Boss, this is your Bot.</h3>  <p> <h3>Collector just sotoped wokring, kindly restart the collector to sync the data with the chian </h3></p>`,
  }

  smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log("Collector Stoped, Email Sent :)")
    smtpTransport.close()
  })
}

collectorStoped()

