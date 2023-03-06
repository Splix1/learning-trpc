export interface Campus {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  imageUrl: string;
  address: string;
  description: string;
}

export interface initialCampusInterface {
  name: string;
  imageUrl: string;
  address: string;
  description: string;
};

export const initialCampusState: initialCampusInterface = {
  name: '',
  imageUrl: '',
  address: '',
  description: ''
}

export type CampusFromDB = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  imageUrl: string;
  address: string;
  description: string;
}

export type deletedCampus = {
  id: number;
}

export type CampusContextType = {
  campuses: Campus[];
  addCampus: (campus: Campus) => void;
  removeCampus: (id: number) => void;
};
