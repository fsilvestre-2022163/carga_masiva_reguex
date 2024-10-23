class Sanitizer {
    str: string;
  
    constructor(str: string) {
      this.str = str;
    }
  
    capitalize(): this {
      this.str = this.str.charAt(0).toUpperCase() + this.str.slice(1).toLowerCase();
      return this;
    }
  
    capitalizeAll(): this {
      this.str = this.str
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
        .join(" ");
      return this;
    }
  
    removeAccents(): this {
      this.str = this.str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return this;
    }
  
    removeSpaces(): this {
      this.str = this.str.replace(/\s+/g, " ").trim();
      return this;
    }
  
    removeSpecialChars(): this {
      this.str = this.str.replace(/[^\w\s]/gi, "");
      return this;
    }
  }
  
  export const capitalize = (str: string): string => {
    return new Sanitizer(str).capitalize().str;
  };
  
  export const removeAccents = (str: string): string => {
    return new Sanitizer(str).removeAccents().str;
  };
  
  export const removeSpaces = (str: string): string => {
    return new Sanitizer(str).removeSpaces().str;
  };
  
  export const removeSpecialChars = (str: string): string => {
    return new Sanitizer(str).removeSpecialChars().str;
  };
  
  export const sanitize = (str: string): string => {
    return new Sanitizer(str).removeAccents().removeSpaces().removeSpecialChars().str;
  };
  
  export const sanitizeAndCapitalize = (str: string): string => {
    return new Sanitizer(str).removeSpaces().capitalize().str;
  };
  
  export const sanitizeAndCapitalizeAll = (str: string): string => {
    return new Sanitizer(str).removeSpaces().capitalizeAll().str;
  };