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
