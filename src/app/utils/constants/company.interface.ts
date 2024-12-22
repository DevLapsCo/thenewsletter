export interface Subscription {
  name: string;
  access: string[];
  features: string[];
  price: number;
  active: boolean;
  startDate: string | null;
  endDate: string | null;
  id: string;
}

export interface SubscriptionResponse {
  status: number;
  message: string;
  subscriptions: Subscription[];
}

export interface UserRow {
  image: string;
  fullName: string;
  email: string;
  contact: string;
  department: string;
  role: number;
  indentity: string;
  location: string;
}


// send-letter.model.ts
export interface SendLetter {
  id?: string;
  userId: string;
  templateId: string;
  groupId: string;
  scheduledTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SendLetterResponse {
  message: string;
  status: string;
  scheduledLetter?: SendLetter;
}

export interface SendImmediateRequest {
  userId: string;
  templateId: string;
  groupId: string;
}