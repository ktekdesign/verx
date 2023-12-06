export const formatCpfOrCnpj = (identity: string) => {
  if (identity.match(/^\d{11}$/)) {
    return identity.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  } else if (identity.match(/^\d{14}$/)) {
    return identity.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      "$1.$2.$3/$4-$5",
    );
  }
  return identity;
};
