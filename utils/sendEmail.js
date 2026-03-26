import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "satyamrathodi70@gmail.com" ||  process.env.EMAIL_USER,
      pass:  "lffi aepf nqdc dcgd" || process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: "satyamrathodi70@gmail.com" || process.env.EMAIL_USER,
    to,
    subject,
    text
  });
};

export default sendEmail;