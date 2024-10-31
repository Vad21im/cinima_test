export type TPageSEO = {
  title?: string;
  description?: string;
  keywords?: string;
};

export type TPagesSEO = {
  default: TPageSEO;
  [key: string]: TPageSEO;
};
