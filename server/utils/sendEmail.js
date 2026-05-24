// import nodeMailer from 'nodemailer'
// export const sendEmail=async(options)=>{
//     const transporter=nodeMailer.createTransport({
//         service:process.env.SMTP_SERVICE,
//         auth:{
//             user:process.env.SMTP_MAIL,
//             pass:process.env.SMTP_PASSWORD
//         }
//     })
//     const mailOptions={
//         from:process.env.SMTP_MAIL,
//         to:options.email,
//         subject:options.subject,
//         text:options.message
//     }
//     await transporter.sendMail(mailOptions);
// }


import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || undefined, // optional if using service
      port: process.env.SMTP_PORT || undefined,
      service: process.env.SMTP_SERVICE, // e.g., "gmail"
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Mail options
    const mailOptions = {
      from: `"NeuroMarth" <${process.env.SMTP_MAIL}>`, // sender
      to: options.email, // receiver
      subject: options.subject,
      text: options.message, // plain text
      html: options.html || undefined, // optional HTML content
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Email could not be sent. Please try again later.");
  }
};

