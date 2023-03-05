import React, { useContext, useEffect, useState } from 'react';
import { Campus, initialCampusState } from '../../Context/@types.campuses';
import { Context } from '../../Context/ContextProvider';
import '../../App.css';

export default function UpdateCampus() {
  const [campusToUpdate, setCampusToUpdate] = useState<number | null>(null);
  const [updatedCampus, setUpdatedCampus] =
    useState<Campus>(initialCampusState);
  const { campuses, context, setContext } = useContext(Context);

  useEffect(() => {
    if (campusToUpdate) {
      const campus = campuses?.filter(
        (currentCampus) => currentCampus.id === campusToUpdate
      );
      setUpdatedCampus(campus[0]);
    }
  }, [campusToUpdate]);

  function updateCampus(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const updateCampusRoute = `/api/campuses/${updatedCampus.id}`;
    import('axios')
      .then((axios) => axios.default.put(updateCampusRoute, updatedCampus))
      .then((response) =>
        setContext({
          ...context,
          campuses: campuses.map((currentCampus) =>
            currentCampus.id === response?.data?.id
              ? response.data
              : currentCampus
          ),
        })
      );
  }

  return (
    <div id="update-campus">
      Update Campus
      <div>
        <select onChange={(evt) => setCampusToUpdate(+evt.target.value)}>
          <option value={0}>Select a Campus</option>
          {campuses?.map((currentcampus) => (
            <option key={currentcampus.id} value={currentcampus.id}>
              {currentcampus.name}
            </option>
          ))}
        </select>
      </div>
      {campusToUpdate ? (
        <div id="add-campus-form">
          <form onSubmit={updateCampus}>
            <div>
              <div>Name</div>
              <input
                name="name"
                defaultValue={updatedCampus?.name || ''}
                onChange={(evt) =>
                  setUpdatedCampus({ ...updatedCampus, name: evt.target.value })
                }
              />
            </div>

            <div>
              <div>Address</div>
              <input
                name="address"
                defaultValue={updatedCampus?.address || ''}
                onChange={(evt) =>
                  setUpdatedCampus({
                    ...updatedCampus,
                    address: evt.target.value,
                  })
                }
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
