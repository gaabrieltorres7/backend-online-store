export type CreatedCategoryDTO = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  Products?: any[];
};

export type CreateCategoryDTO = {
  name: string;
};
