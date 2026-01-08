interface IProductVariant {
  model: string; // модель одежды

  color: string;

  size: string; // размер одежды
}

export interface IProduct {
  name: string;

  category: string;

  images: string[];

  variants: IProductVariant[];
}

export interface IProductDb extends IProduct {
  _id: string;
}
