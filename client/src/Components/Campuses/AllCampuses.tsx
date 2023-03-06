import React from 'react';
import NewCampus from './NewCampus';
import './Campuses.css';
import UpdateCampus from './UpdateCampus';
import { trpc } from '../../utils/trpc';


function AllCampuses() {
  const utils = trpc.useContext();
  const { data, isError, isLoading } = trpc.getCampuses.useQuery();
  const { mutate: deleteCampus } = trpc.deleteCampus.useMutation({
    onSuccess() {
      utils.getCampuses.invalidate();
    },
    onError() {
      alert("There was a problem deleting this campus.")
    },
  })

  console.log(data)

  if (isError) return <div>There was an error retrieving all campuses.</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <div className='campus-container'>
      <div>
        {/* <NewCampus />
        <UpdateCampus /> */}
      </div>
      {data?.campuses?.map((campus) => {
        return (
          <div key={campus.id} className="campus-card">
            <img
              className="campus-image"
              src={campus.imageUrl}
              alt="Image of Campus"
            />
            <div className='campus-name'>{campus.name}</div>
            <div className='campus-address'>{campus.address}</div>
            <div className='campus-description'>{campus.description}</div>
            <button className='delete-button' onClick={() => deleteCampus({ id: campus.id })}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default AllCampuses;
