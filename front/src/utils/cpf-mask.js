const cpfMask = (cpf) => {
  if (cpf !== null && phone.length === 11) {
    const result =
      cpf.substring(0, 3) +
      "." +
      cpf.substring(3, 6) +
      "." +
      phone.substring(6, 10) +
      "-" +
      cpf.substring(10, 12);
    return result;
  } else {
    return cpf;
  }
};

export { cpfMask };
