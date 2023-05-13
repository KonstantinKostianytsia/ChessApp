export interface IValidator {
  validate: () => boolean;
  getErrors: () => Array<string>;
}
