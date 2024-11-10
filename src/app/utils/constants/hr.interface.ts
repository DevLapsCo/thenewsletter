// interfaces.ts

export interface JobRole {
    id: string
    companyId: string;
    userId: string;
    jobTitle: string;
    description: string;
    department: string;
    workMode: string;
    contractType: string;
    level: string;
    dueDate: Date; // ISO 8601 date string format
  }
  
  // You might want to create an enum for work modes
  export enum WorkMode {
    REMOTE = 'REMOTE',
    ONSITE = 'ONSITE',
    HYBRID = 'HYBRID'
  }
  
  // You might want to create an enum for contract types
  export enum ContractType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    CONTRACT = 'CONTRACT',
    TEMPORARY = 'TEMPORARY'
  }
  
  // You might want to create an interface for creating a new job role
  export interface CreateJobRoleDTO {
    companyId: string;
    userId: string,
    jobTitle: string;
    description: string;
    department: string;
    workMode: WorkMode;
    contractType: ContractType;
    level: string;
    dueDate: string; // ISO 8601 date string format
  }
  
  // You might want to create an interface for updating an existing job role
  export interface UpdateJobRoleDTO extends Partial<CreateJobRoleDTO> {
    userId: string; // Assuming this is required for updates
  }