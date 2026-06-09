export interface List {
  id: string;
  title: string;
  position: number;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateListData {
  title: string;
  position: number;
  projectId: string;
}
