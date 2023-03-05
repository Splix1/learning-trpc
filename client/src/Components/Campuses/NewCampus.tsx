import React, { useContext, useState } from 'react';
import { Campus, initialCampusState } from '../../Context/@types.campuses';
import { Context } from '../../Context/ContextProvider';

function NewCampus() {
  const [newCampus, setNewCampus] = useState<Campus>(initialCampusState);
  const { context, setContext, campuses } = useContext(Context);

  function createCampus(evt: any) {
    evt.preventDefault();
    const postCampusRoute = '/api/campuses';
    import('axios').then((axios) =>
      axios.default
        .post(postCampusRoute, newCampus)
        .then((response) =>
          setContext({ ...context, campuses: [...campuses, response?.data] })
        )
        .catch((err) => {
          alert('Creation failed');
          return;
        })
    );
    setNewCampus(initialCampusState);
  }

  return (
    <div id="add-campus-form">
      New Campus
      <form onSubmit={createCampus}>
        <div>
          <div>Name</div>
          <input
            name="campus"
            onChange={(evt) =>
              setNewCampus({ ...newCampus, name: evt.target.value })
            }
          />
        </div>
        <div>
          <div>Image</div>
          <input
            name="campus-image"
            onChange={(evt) =>
              setNewCampus({ ...newCampus, imageUrl: evt.target.value })
            }
          />
        </div>

        <div>
          <div>Address</div>
          <input
            name="address"
            onChange={(evt) =>
              setNewCampus({ ...newCampus, address: evt.target.value })
            }
          />
        </div>

        <div>
          <div>Description</div>
          <input
            name="description"
            onChange={(evt) =>
              setNewCampus({ ...newCampus, description: evt.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewCampus;
