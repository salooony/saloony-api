export const COUNTRY_CODE_LENGTH = 3;
export const COUNTRY_CODE_PATTERN = '^[A-Z]{3}$';
export const COUNTRY_CODE_REGEX = /^[A-Z]{3}$/;
export const COUNTRY_CODE_EXAMPLE = 'TUN';

export const normalizeCountryCode = (code: string): string => code.trim().toUpperCase();
