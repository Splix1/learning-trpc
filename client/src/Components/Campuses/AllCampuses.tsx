import React, { useContext } from 'react';
import { Context } from '../../Context/ContextProvider';
import { Campus } from '../../Context/@types.campuses';
import NewCampus from './NewCampus';
import '../../App.css';
import UpdateCampus from './UpdateCampus';

function AllCampuses() {
  const { campuses, context, setContext } = useContext(Context);

  function deleteCampus(campus: Campus) {
    const deleteCampus = `/api/campuses/${campus.id}`;
    import('axios')
      .then((axios) => axios.default.delete(deleteCampus))
      .then((response) =>
        setContext({
          ...context,
          campuses: campuses.filter(
            (currentCampus) => currentCampus.id !== campus.id
          ),
        })
      );
  }

  return (
    <div id="campuses">
      <div>
        <NewCampus />
        <UpdateCampus />
      </div>
      {campuses?.map((campus: Campus) => {
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
