import React, { useContext, useEffect } from 'react';
import { Context } from '../../Context/ContextProvider';
import { Campus, deletedCampus, CampusFromDB } from '../../Context/@types.campuses';
import NewCampus from './NewCampus';
import '../../App.css';
import UpdateCampus from './UpdateCampus';
import { trpc } from '../../utils/trpc';
import { useMutation } from '@tanstack/react-query';


function AllCampuses() {
  const { data, isError, isLoading } = trpc.getCampuses.useQuery();
  const mutation = trpc.deleteCampus.useMutation();


  function deleteCampus(id: number | undefined) {
    if (id) {
      mutation.mutate({ id: id }, {
        onSuccess: () => {
          if (data?.campuses) {
            data.campuses = data.campuses.filter((current) => current.id !== id)
          }
        },
        onError: () => alert("There was a problem deleting this campus.")
      })
    }
  }



  if (isError) return <div>There was an error retrieving all campuses.</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <div id="campuses">
      <div>
        <NewCampus />
        <UpdateCampus />
      </div>
      {data?.campuses?.map((campus) => {
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
            <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default AllCampuses;
