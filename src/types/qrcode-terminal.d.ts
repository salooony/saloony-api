declare module 'qrcode-terminal' {
  export type GenerateOptions = {
    small?: boolean;
  };

  export function generate(input: string, options?: GenerateOptions, callback?: (qrcode: string) => void): void;
}
