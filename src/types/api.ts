export type BreedRatings = {
  affection: number | null;
  childFriendly: number | null;
  dogFriendly: number | null;
  energy: number | null;
  grooming: number | null;
  healthIssues: number | null;
  intelligence: number | null;
  shedding: number | null;
  socialNeeds: number | null;
  strangerFriendly: number | null;
  vocalisation: number | null;
};

export type BreedSummary = {
  id: string;
  name: string;
  temperament: string[];
  origin: string;
  description: string;
  lifeSpan: string;
  wikipediaUrl: string | null;
  referenceImageId: string | null;
  weight: {
    imperial: string;
    metric: string;
  };
  ratings: BreedRatings;
};

export type BreedImage = {
  id: string;
  url: string;
  width: number | null;
  height: number | null;
};

export type Favorite = {
  id?: string;
  breedId: string;
  breedName: string;
  imageUrl?: string | null;
  createdAt?: string;
};

export type ApiError = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};
