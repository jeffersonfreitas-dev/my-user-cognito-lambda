const phoneMask = (phone) => {
  if (phone !== null && phone.length === 11) {
    const result =
      "(" +
      phone.substring(0, 2) +
      ")" +
      phone.substring(2, 7) +
      "-" +
      phone.substring(7, 12);
    return result;
  } else {
    return phone;
  }
};

const cpfMask = (cpf) => {
  if (cpf !== null && cpf.length === 11) {
    const result =
      cpf.substring(0, 3) +
      "." +
      cpf.substring(3, 6) +
      "." +
      cpf.substring(6, 9) +
      "-" +
      cpf.substring(9, 12);
    return result;
  } else {
    return cpf;
  }
};

const dateMask = (date) => {
  return new Date(date).toLocaleDateString("pt-br");
};

export { phoneMask, cpfMask, dateMask };
