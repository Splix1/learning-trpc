import React from 'react';
import NewCampus from './NewCampus';
import './Campuses.css';
import UpdateCampus from './UpdateCampus';
import { trpc } from '../../utils/trpc';
import { Link } from 'react-router-dom';


function AllCampuses() {
  const utils = trpc.useContext();
  const { data: campuses, isError, isLoading } = trpc.getCampuses.useQuery();
  const { mutate: deleteCampus } = trpc.deleteCampus.useMutation({
    onSuccess() {
      utils.getCampuses.invalidate();
    },
    onError() {
      alert("There was a problem deleting this campus.")
    },
  })



  if (isError) return <div>There was an error retrieving all campuses.</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <div className='campus-container'>
      <NewCampus />
      <UpdateCampus />
      {campuses.map((campus) => {
        return (
          <div className="campus-card" key={campus.id}>
            <Link to={`/campuses/${campus.id}`} key={campus.id}>
              <img
                className="campus-image"
                src={campus.imageUrl}
                alt={campus.name}
              />
            </Link>
            <h2 className='campus-name'>{campus.name}</h2>
            <p className='campus-address'>{campus.address}</p>
            <p className='campus-description'>{campus.description}</p>
            <button className='delete-button' onClick={() => deleteCampus({ id: campus.id })}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default AllCampuses;
