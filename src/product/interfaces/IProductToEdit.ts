interface IProductVariant {
  model: string; // модель одежды

  color: string;

  size: string; // размер одежды
}

export interface IProductToEdit {
  name: string;

  category: string;

  images: string[];

  variants: IProductVariant[];
}
