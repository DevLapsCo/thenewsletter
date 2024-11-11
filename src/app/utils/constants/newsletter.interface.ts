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
