import mongoose from 'mongoose';

class SanitizerString {
  public static onlyNumbers(value: string): string {
    return value.replace(/\D/g, "");
  };

  public static removeSpaces(string: string): string {
    return string.trim();
  };

  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/ToString
  public static stringOrUndefined(value: any): string | undefined {
    if (toString.call(value) !== '[object String]')
      return undefined;

    if (this.removeSpaces(value).length === 0)
      return undefined;

    return this.removeSpaces(value);
  };

  public static stringOrNull(value: any): string | null {
    if (toString.call(value) !== '[object String]')
      return null;

    if (this.removeSpaces(value).length === 0)
      return null;

    return this.removeSpaces(value);
  };

  public static stringOrEmpty(value: any): string {
    if (toString.call(value) !== '[object String]')
      return '';
    else
      return this.removeSpaces(value);
  };

  public static objectIdToStringOrNull(value: mongoose.Types.ObjectId | string | null): string | null {
    if (value === null || toString.call(value) === '[object String]')
      return this.stringOrNull(value);

    return value.toString();
  }
};

export default SanitizerString;