export type ItemType = {
  itemId: string;
  itemHeader: string;
  itemState: string;
  itemDescription: string;
  itemCreatorId: string;
  itemPriority?: string;
  itemNotes?: string;

  createdAt: string;
  updatedAt: string;
};
