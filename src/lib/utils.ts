export const classNames: (...classes: string[]) => string = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export default { classNames };
