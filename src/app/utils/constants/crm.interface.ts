export interface Customer {
    id?: string;
    firstName: string;
    lastName: string;
    companyName: string;
    email: string[];
    mobile: string[];
    office: string[];
    billingAddress: string;
    companyId?: string;
    customerType: 'INDIVIDUAL' | 'COMPANY';
    registrationDate?: string;
    isActive: boolean;
    shippingAddresses?: ShippingAddress[];
  }
  
  export interface ShippingAddress {
    id?: string;
    address: string;
    city: string;
    country: string;
  }
  