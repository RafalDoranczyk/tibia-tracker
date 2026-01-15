export type ScrollItem = {
  id: number;
  name: string;
  quantity: number;
  defaultPrice: number;
  imageUrl: string;
};

export type ScrollType = "powerfull" | "intricate";
export type CraftMethod = "items" | "tokens";

export type Scroll = {
  name: string;
  defaultPrice: number;
  items: ScrollItem[];
  craftMethods: CraftMethod[];
  color: string;
  imageUrl: string;
  scrollType?: ScrollType;
};
