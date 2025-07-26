// lib/types/fabric.d.ts

export interface FabricOption {
  id: string;
  name: string;
  imageUrl: string;
  pricePerMeter: number;
  description?: string;
  category?: string; // e.g., Cotton, Silk, Wool, etc.
  colorsAvailable?: string[];
  stockAvailable?: number;
  isPremium?: boolean;
}
