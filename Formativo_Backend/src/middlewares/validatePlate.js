export function validatePlateCar(placa) {
    const regexCar = /^[A-Z]{3}-\d{3}$/;
  
    if (regexCar.test(placa)) {
      return placa;
    } else {
      const cleanPlate = placa.replace(/[^A-Z0-9]/g, "");
      if (cleanPlate.length === 6) {
        const letters = cleanPlate.slice(0, 3);
        const numbers = cleanPlate.slice(3);
  
        const formattedPlate = `${letters}-${numbers}`;
  
        return formattedPlate;
      } else {
        return false;
      }
    }
  }


export function validatePlateMotorcycle(placa) {
    const regexMotorcycle = /^[A-Z]{2}\d{2}[A-Z]?$/;
  
    if (regexMotorcycle.test(placa)) {
      return placa;
    } else {
      const cleanPlate = placa.replace(/[^A-Z0-9]/g, "");
      if (cleanPlate.length >= 5 && cleanPlate.length <= 6) {
        const letters = cleanPlate.slice(0, 3);
        const numbers = cleanPlate.slice(3, 5);
        const optionalLetter = cleanPlate.length === 6 ? cleanPlate.slice(5) : "";
        const formattedPlate = `${letters}-${numbers}${optionalLetter}`;
  
        return formattedPlate;
      } else {
        return false;
      }
    }
  }