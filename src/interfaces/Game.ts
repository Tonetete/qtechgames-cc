export type GameType = 'roulette' | 'crash' | string;

export type SupportedPlatform = 'mobile' | 'tablet' | string

export type Volatility = 'low' | 'medium' | 'high'

export interface GameCatalogueItem {
  id: string;
  title: string;
  description: string;
  studio: string;
  rating: number;
  thumbnail: string;
  type: GameType;
  categories: string[];
  rtp: number;
  volatility: Volatility;
  release_date: string;
  features: string[];
  has_jackpot: boolean;
  demo_url: string;
  provider_game_id: string;
  supported_platforms: Array<SupportedPlatform>;
}

export type GameCatalogue = Array<GameCatalogueItem>