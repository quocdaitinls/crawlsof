export const isNull = (value: any) => value === null;

export const isUndefined = (value: any) => value === undefined;

export const toArray = <T extends any>(value: T | T[]): T[] => {
  if (Array.isArray(value)) return value;
  return [value];
};
