import React, { useContext } from 'react';
import { Context } from '../../Context/ContextProvider';
import { Campus } from '../../Context/@types.campuses';
import NewCampus from './NewCampus';
import '../../App.css';
import UpdateCampus from './UpdateCampus';
import { trpc } from '../../utils/trpc';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type CampusFromDB = {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  imageUrl: string;
  address: string;
  description: string;
}

function AllCampuses() {
  const { data, isError } = trpc.getCampuses.useQuery();
  const mutation = trpc.deleteCampus.useMutation();

  function deleteCampus(campus: CampusFromDB) {
    mutation.mutate({ id: campus.id })
  }


  return (
    <div id="campuses">
      <div>
        {/* <NewCampus />
        <UpdateCampus /> */}
      </div>
      {data?.campuses?.map((campus: CampusFromDB) => {
        return (
          <div key={campus.id}>
            <img
              className="campus-img"
              src={campus.imageUrl}
              alt="Image of Campus"
            />
            <div>{campus.name}</div>
            <div>{campus.address}</div>
            <div>{campus.description}</div>
            <button onClick={() => deleteCampus(campus)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default AllCampuses;
