async function validateType(type, plate) {
  const regexCar = /carro/;
  const regexMotorcycle = /moto/;
  if (regexMotorcycle.test(type)) {
    const plateT = await validatePlateMotorcycle(plate);
    return plateT;
  } else if (regexCar.test(type)) {
    const plateT = await validatePlateCar(plate);
    return plateT;
  } else {
    throw new Error("error, ingrese un tipo de vehiculo valido");
  }
}

function validatePlateCar(placa) {
  const regexCar = /^[A-Z]{3}-\d{3}$/;
  if (regexCar.test(placa)) {
    const cleanPlate = placa.replace(/[^A-Z0-9]/g, "");
    if (cleanPlate.length === 6) {
      const letters = cleanPlate.slice(0, 3);
      const numbers = cleanPlate.slice(3);

      const formattedPlate = `${letters}-${numbers}`;
      return formattedPlate;
    } else {
      return false;
    }
  } else {
    throw new Error("ingrese una placa valida para carros");
  }
}
function validatePlate(placa) {
  const regexPlate = /^[A-Z]{3}-\d{2}[A-Z\d]?$/;

  if (regexPlate.test(placa)) {
    return placa;
  } else {
    return false;
  }
}
function validatePlateMotorcycle(placa) {
  const regexMotorcycle = /^[A-Z]{3}-\d{2}[A-Z]?$/;

  if (regexMotorcycle.test(placa)) {
    return placa;
  } else {
    const cleanPlate = placa.replace(/[^A-Z0-9]/g, "");
    if (cleanPlate.length >= 5 || cleanPlate.length <= 6) {
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


module.exports = {validateType, validatePlate}