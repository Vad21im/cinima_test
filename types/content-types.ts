export type TContent = {
  id: string;
  title: string;
  description: string;
  release_date: string;
  duration: number;
  type: "movie" | "series" | "season" | "episode" | "trailer" | "clip";
};

export type TContentList = TContent[];

export type TPerson = {
  id: string;
  name: string;
  link?: string;
  image?: string;
};

export interface IContentMeta {
  genre: string[];
  year: string;
  ageRating: number;
  description: string;
}
