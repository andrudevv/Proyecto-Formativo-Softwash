import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
const generateRecoveryToken = () => {
    return crypto.randomBytes(32).toString('hex');
  };
export function sendEmail(Email){

const recoveryToken = generateRecoveryToken();

// Envía un correo con el token
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: Email,
  subject: "Recuperación de contraseña",
  text: `Haga clic en este enlace para restablecer su contraseña: http://localhost:4000/api/users/reset-password/${recoveryToken}`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
    res.status(500).send("Error al enviar el correo de recuperación de contraseña.");
  } else {
    console.log("Correo de recuperación de contraseña enviado: " + info.response);
    res.status(200).send("Correo de recuperación de contraseña enviado.");
  }
});
}
  
