
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const img1 = '.'
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
function sendReminderEmail(email, date, time, vehicle) {
  return new Promise((resolve, reject) => { 
  // Envía un correo con el token
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Recordatorio de Cita",
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
          .header-img{
              background-image: url('./images/1.png');
            background-color: #007BFF;
  
              height: 200px;
          }
          .body {
            color: #ffffff;
            background-color: #007BFF;
            background-image: url('./images/2.png');
            text-align: center;
            /* padding: 10px; */
            height: 300px;
            display: flex;
            flex-direction: column;
  
          }
          .title {
            font-size: 24px;
            margin-top: 5%;
            font-weight: bold;
          }
          .link {
              color: #007BFF;
              text-decoration: none;
          }
     
          .footer {
              height: 100px;
            background-color: #007BFF;
            background-size: contain;
              background-image: url('./images/3.png');
            
          }
          .parrafo-header{
              color: #ffffff;
          }
          .logo1, .logo2, .logo3{
              height: 30px; margin: 10px;
              background-image: url('./images/facebook.png');
          }
          .parrafo-body{
              margin-top: 10%;
          }
        </style>
      </head>
      <body>
      <div class="container">
      <div class="header-img">
         
      </div>
      <div class="body"> 
          <p class="parrafo-header">"Innovación que brilla en cada gota. Tu lavadero, nuestra tecnología."</p>
        <h1 class="title">Recordatorio de Cita</h1> 
        <p class="parrafo-body">
          Recuerda que tienes una cita programada para el ${date} a las ${time} para el vehículo con detalles: ${JSON.stringify(vehicle)}
        </p>
      </div>
      <div class="footer">
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
      resolve(true);
    }
  });
} );
}

module.exports = {sendReminderEmail};