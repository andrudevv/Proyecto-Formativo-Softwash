
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


function register(email, name) {
  return new Promise((resolve, reject) => { 
  // Envía un correo con el token
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Registro exitoso",
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
          <h1 class="title">Bienvenido a softwash <strong>${name}</strong></h1>
        </div>
        <div class="content">
          <p>
            Haga clic en este <a class="link" href="http://localhost:4000/">enlace</a> para iniciar session.
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
      reject(error);
    } else {
      console.log("registro exitoso: " , info.response );
      resolve(true);
    }
  });
} );
}

module.exports = {register};