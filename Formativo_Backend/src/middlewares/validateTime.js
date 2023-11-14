 function validateHour12(input) {
    var regularExpression = /^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][Mm]$/;
    if (regularExpression.test(input)) {
      const [hour, rest] = input.split(" ");
    const [h, m] = hour.split(":");
    const formattedHour = `${h.padStart(2, "0")}:${m} ${rest}`;
    return formattedHour;
    } else {
      return false;
    }
  }
  

 function validateDate(dateInput){
    const dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);
    const [year, month, day] = dateInput.split('-');
    // const dateParts = dateInput.split('-');
    // const year = dateParts[0];
    // const month = (parseInt(dateParts[1], 10) < 10) ? `0${dateParts[1]}` : dateParts[1];
    // const day = (parseInt(dateParts[2], 10) < 10) ? `0${dateParts[2]}` : dateParts[2];
    const dateEnd = new Date(year, month -1 , day);
    if(dateEnd >= dateToday){
      return `${year}-${month}-${day}`
    }
    return false;
  }

module.exports = { validateHour12, validateDate }