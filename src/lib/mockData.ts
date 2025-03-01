
import { Website, Product, PriceAlert, VulnerabilityReport, AttackSimulation, StatsSummary } from "@/types";

export const mockWebsites: Website[] = [
  {
    id: "w1",
    url: "https://electronics-store.example.com",
    name: "ElectroTech",
    lastScanned: new Date(Date.now() - 30 * 60000).toISOString(),
    status: "active",
    productCount: 124
  },
  {
    id: "w2",
    url: "https://fashion-boutique.example.com",
    name: "Fashion Boutique",
    lastScanned: new Date(Date.now() - 2 * 3600000).toISOString(),
    status: "active",
    productCount: 87
  },
  {
    id: "w3",
    url: "https://home-goods.example.com",
    name: "Home Essentials",
    lastScanned: new Date(Date.now() - 6 * 3600000).toISOString(),
    status: "paused",
    productCount: 203
  },
  {
    id: "w4",
    url: "https://gadget-world.example.com",
    name: "Gadget World",
    lastScanned: new Date(Date.now() - 12 * 3600000).toISOString(),
    status: "error",
    productCount: 45
  }
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    websiteId: "w1",
    name: "Ultra HD Smart TV 55\"",
    currentPrice: 499.99,
    originalPrice: 799.99,
    discountPercentage: 37.5,
    currency: "USD",
    lastUpdated: new Date(Date.now() - 45 * 60000).toISOString(),
    priceHistory: [
      { date: new Date(Date.now() - 7 * 86400000).toISOString(), price: 799.99 },
      { date: new Date(Date.now() - 5 * 86400000).toISOString(), price: 749.99 },
      { date: new Date(Date.now() - 3 * 86400000).toISOString(), price: 699.99 },
      { date: new Date(Date.now() - 1 * 86400000).toISOString(), price: 599.99 },
      { date: new Date(Date.now() - 45 * 60000).toISOString(), price: 499.99 }
    ],
    imageUrl: "/placeholder.svg",
    url: "https://electronics-store.example.com/products/ultra-hd-smart-tv-55"
  },
  {
    id: "p2",
    websiteId: "w1",
    name: "Noise Cancelling Headphones",
    currentPrice: 149.99,
    originalPrice: 249.99,
    discountPercentage: 40,
    currency: "USD",
    lastUpdated: new Date(Date.now() - 2 * 3600000).toISOString(),
    priceHistory: [
      { date: new Date(Date.now() - 10 * 86400000).toISOString(), price: 249.99 },
      { date: new Date(Date.now() - 7 * 86400000).toISOString(), price: 229.99 },
      { date: new Date(Date.now() - 4 * 86400000).toISOString(), price: 199.99 },
      { date: new Date(Date.now() - 2 * 3600000).toISOString(), price: 149.99 }
    ],
    imageUrl: "/placeholder.svg",
    url: "https://electronics-store.example.com/products/noise-cancelling-headphones"
  },
  {
    id: "p3",
    websiteId: "w2",
    name: "Designer Handbag",
    currentPrice: 89.99,
    originalPrice: 199.99,
    discountPercentage: 55,
    currency: "USD",
    lastUpdated: new Date(Date.now() - 5 * 3600000).toISOString(),
    priceHistory: [
      { date: new Date(Date.now() - 14 * 86400000).toISOString(), price: 199.99 },
      { date: new Date(Date.now() - 10 * 86400000).toISOString(), price: 179.99 },
      { date: new Date(Date.now() - 7 * 86400000).toISOString(), price: 149.99 },
      { date: new Date(Date.now() - 5 * 3600000).toISOString(), price: 89.99 }
    ],
    imageUrl: "/placeholder.svg",
    url: "https://fashion-boutique.example.com/products/designer-handbag"
  }
];

export const mockPriceAlerts: PriceAlert[] = [
  {
    id: "a1",
    productId: "p1",
    productName: "Ultra HD Smart TV 55\"",
    websiteName: "ElectroTech",
    previousPrice: 599.99,
    currentPrice: 499.99,
    changePercentage: 16.67,
    currency: "USD",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    severity: "medium",
    imageUrl: "/placeholder.svg",
    status: "new"
  },
  {
    id: "a2",
    productId: "p2",
    productName: "Noise Cancelling Headphones",
    websiteName: "ElectroTech",
    previousPrice: 199.99,
    currentPrice: 149.99,
    changePercentage: 25,
    currency: "USD",
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    severity: "medium",
    imageUrl: "/placeholder.svg",
    status: "reviewing"
  },
  {
    id: "a3",
    productId: "p3",
    productName: "Designer Handbag",
    websiteName: "Fashion Boutique",
    previousPrice: 149.99,
    currentPrice: 89.99,
    changePercentage: 40,
    currency: "USD",
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    severity: "high",
    imageUrl: "/placeholder.svg",
    status: "new"
  }
];

export const mockVulnerabilityReports: VulnerabilityReport[] = [
  {
    id: "v1",
    websiteId: "w1",
    websiteName: "ElectroTech",
    attackVector: "parameter_tampering",
    description: "Price parameter in checkout request can be manipulated to lower the total",
    severity: "critical",
    status: "open",
    dateDiscovered: new Date(Date.now() - 2 * 86400000).toISOString(),
    steps: [
      "Add product to cart",
      "Proceed to checkout page",
      "Intercept the final payment request",
      "Modify the 'total_price' parameter",
      "Complete the payment with reduced amount"
    ]
  },
  {
    id: "v2",
    websiteId: "w2",
    websiteName: "Fashion Boutique",
    attackVector: "coupon_stacking",
    description: "Multiple discount coupons can be applied sequentially",
    severity: "high",
    status: "in_progress",
    dateDiscovered: new Date(Date.now() - 5 * 86400000).toISOString(),
    steps: [
      "Add product to cart",
      "Apply first discount coupon",
      "Record new total price",
      "Apply second discount coupon",
      "Complete checkout with stacked discounts"
    ]
  },
  {
    id: "v3",
    websiteId: "w1",
    websiteName: "ElectroTech",
    attackVector: "hidden_field_modification",
    description: "Hidden form field contains the product price which can be modified",
    severity: "medium",
    status: "resolved",
    dateDiscovered: new Date(Date.now() - 10 * 86400000).toISOString(),
    dateResolved: new Date(Date.now() - 1 * 86400000).toISOString(),
    steps: [
      "View product page source code",
      "Identify hidden input field with price data",
      "Modify the value using browser developer tools",
      "Add product to cart",
      "Complete checkout with modified price"
    ]
  }
];

export const mockAttackSimulations: AttackSimulation[] = [
  {
    id: "as1",
    websiteId: "w1",
    targetEndpoint: "/api/checkout/process",
    method: "POST",
    parameters: [
      { name: "product_id", value: "12345", manipulated: false },
      { name: "quantity", value: "1", manipulated: false },
      { name: "price", value: "19.99", manipulated: true },
      { name: "total", value: "19.99", manipulated: true }
    ],
    success: true,
    responseCode: 200,
    responseData: "{\"status\":\"success\",\"order_id\":\"ORD-7890\",\"total_charged\":\"19.99\"}",
    timestamp: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: "as2",
    websiteId: "w2",
    targetEndpoint: "/api/cart/apply-discount",
    method: "POST",
    parameters: [
      { name: "cart_id", value: "cart-567", manipulated: false },
      { name: "discount_code", value: "SUMMER20%OFF", manipulated: true },
      { name: "apply_multiple", value: "true", manipulated: true }
    ],
    success: true,
    responseCode: 200,
    responseData: "{\"status\":\"success\",\"discount_applied\":\"40%\",\"new_total\":\"59.99\"}",
    timestamp: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: "as3",
    websiteId: "w3",
    targetEndpoint: "/api/checkout/finalize",
    method: "PUT",
    parameters: [
      { name: "order_id", value: "ORD-1234", manipulated: false },
      { name: "payment_status", value: "completed", manipulated: false },
      { name: "shipping_cost", value: "0", manipulated: true }
    ],
    success: false,
    responseCode: 403,
    responseData: "{\"status\":\"error\",\"message\":\"Server-side validation failed. Tampering detected.\"}",
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString()
  }
];

export const mockStatsSummary: StatsSummary = {
  totalWebsites: 4,
  totalProducts: 450,
  activePriceAlerts: 12,
  criticalVulnerabilities: 3,
  successfulAttacks: 8,
  monitoringStatus: "active"
};
