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
