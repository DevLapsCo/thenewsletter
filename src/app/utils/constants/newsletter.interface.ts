export interface TemplateVariable {
  [key: string]: string;
  }

  export interface KeyValuePair {
    key: string;
    value: string;
  }

export interface TemplatePayload {
  title: string;
  templateVariables: Map<string, string>;
  templateKeyName: string;
  templateFile: File;
}

export interface Template {
  id: string;
  name: string;
  htmlBody?: string;
  css: string;
  html: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
