export interface Products {
    id: string;            // UUID as string
    userId: string;       // User identifier
    companyId: string;    // Company identifier
    shipmentId?: string;  // Optional shipment identifier
    name: string;         // Name of the product
    totalQuantity: number; // Total quantity of the product
    weight: number;       // Weight of the product
    createdAt: string;    // Creation date as ISO string
    updatedAt: string;    // Last updated date as ISO string
}
