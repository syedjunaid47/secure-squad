
export interface Website {
  id: string;
  url: string;
  name: string;
  lastScanned: string;
  status: 'active' | 'paused' | 'error';
  productCount: number;
}

export interface Product {
  id: string;
  websiteId: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  discountPercentage: number;
  currency: string;
  lastUpdated: string;
  priceHistory: PricePoint[];
  imageUrl: string;
  url: string;
}

export interface PricePoint {
  date: string;
  price: number;
}

export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  websiteName: string;
  previousPrice: number;
  currentPrice: number;
  changePercentage: number;
  currency: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  imageUrl: string;
  status: 'new' | 'reviewing' | 'resolved';
}

export interface VulnerabilityReport {
  id: string;
  websiteId: string;
  websiteName: string;
  attackVector: 'api_manipulation' | 'parameter_tampering' | 'coupon_stacking' | 'hidden_field_modification';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'false_positive';
  dateDiscovered: string;
  dateResolved?: string;
  steps: string[];
}

export interface AttackSimulation {
  id: string;
  websiteId: string;
  targetEndpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  parameters: {
    name: string;
    value: string;
    manipulated: boolean;
  }[];
  success: boolean;
  responseCode: number;
  responseData: string;
  timestamp: string;
}

export interface StatsSummary {
  totalWebsites: number;
  totalProducts: number;
  activePriceAlerts: number;
  criticalVulnerabilities: number;
  successfulAttacks: number;
  monitoringStatus: 'active' | 'paused';
}
