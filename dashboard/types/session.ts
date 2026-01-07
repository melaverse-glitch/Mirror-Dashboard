export interface FoundationTryon {
  appliedAt: number;
  sku: string;
  name: string;
  hex: string;
  undertone: 'warm' | 'neutral' | 'cool';
  resultImageUrl: string;
  resultMimeType: string;
}

export interface Session {
  id: string;
  createdAt: number;
  originalImageUrl: string;
  originalMimeType: string;
  derenderedImageUrl: string;
  derenderedMimeType: string;
  model: string;
  derenderPrompt: string;
  foundationTryons: FoundationTryon[];
  status: 'active' | 'completed';
  completedAt: number | null;
  rating?: number; // 0-5 stars, added for future use
}
