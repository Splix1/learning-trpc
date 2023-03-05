export interface Campus {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  imageUrl: string;
  address: string;
  description: string;
}

export const initialCampusState: Campus = {
  name: '',
  imageUrl: '',
  address: '',
  description: '',
};

export type CampusContextType = {
  campuses: Campus[];
  addCampus: (campus: Campus) => void;
  removeCampus: (id: number) => void;
};
