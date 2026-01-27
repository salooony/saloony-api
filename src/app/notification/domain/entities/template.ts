import { TemplateType } from '../enums/template-type.enum';

export class Template {
  public id: string;
  public key: string;
  public type: TemplateType;
  public title: string;
  public message: string;
  public defaultParameters: Record<string, any>;
  public metadata: Record<string, any>;
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date;
}
