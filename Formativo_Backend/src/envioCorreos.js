import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateRecoveryToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
export function sendEmail(Email) {
  const recoveryToken = generateRecoveryToken();

  // Envía un correo con el token
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: Email,
    subject: "Recuperación de contraseña",
    html: `
  <html>
    <head>
      <style>
        /* Estilos CSS normales */
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #007BFF;
          color: #ffffff;
          text-align: center;
          padding: 10px;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
          margin-top: 20px;
        }
        .content {
          margin-top: 20px;
          font-size: 16px;
        }
        .link {
          color: #007BFF;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="title">Recuperación de contraseña</h1>
        </div>
        <div class="content">
          <p>
            Haga clic en este <a class="link" href="http://localhost:4000/api/users/reset-password/${recoveryToken}">enlace</a> para restablecer su contraseña.
          </p>
        </div>
      </div>
    </body>
  </html>
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .send("Error al enviar el correo de recuperación de contraseña.");
    } else {
      console.log(
        "Correo de recuperación de contraseña enviado: " + info.response
      );
      res.status(200).send("Correo de recuperación de contraseña enviado.");
    }
  });
}
