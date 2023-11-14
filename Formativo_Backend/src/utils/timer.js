const schedule = require('node-schedule');
const { sendReminderEmail } = require('./emailReminderUser');
const AppointmentService = require('../services/appointments.service.js');
 const Appointment =  new AppointmentService();
function validador() {
    const fechaManana = new Date();
    fechaManana.setHours(0, 0, 0, 0);
    fechaManana.setDate(fechaManana.getDate() + 1);
    const year = fechaManana.getFullYear();
    const month = (fechaManana.getMonth() + 1).toString().padStart(2, '0');
    const day = fechaManana.getDate().toString().padStart(2, '0');
    const fechaMananaFormato = `${year}-${month}-${day}`;
    return fechaMananaFormato;
  }
const recordatorioCita = async (cita) => {
    const date= cita.date;
    const time= cita.time;
    const Vehicle = cita.Vehicle.plate;
    const useremail= cita.Vehicle.User.email;
    await sendReminderEmail(useremail, date, time, Vehicle);
  };

  const programarRecordatorios = async () => {
    const dateTomorrow = validador();
    const citas = await Appointment.getCitas(dateTomorrow); 
    citas.forEach((cita) => {
      schedule.scheduleJob({hour:9, minute:0}, async () => {
        await recordatorioCita(cita);
      });
    });
  };


  module.exports = { programarRecordatorios}