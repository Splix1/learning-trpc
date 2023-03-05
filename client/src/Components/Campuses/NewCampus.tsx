import React, { useState } from 'react';
import { Campus, initialCampusState } from '../../Context/@types.campuses';
import { trpc } from '../../utils/trpc';


function NewCampus({ refetch }: any) {
  const [newCampus, setNewCampus] = useState<Campus>(initialCampusState);
  const mutation = trpc.addCampus.useMutation();


  function createCampus(evt: React.FormEvent) {
    evt.preventDefault();
    mutation.mutate(newCampus, {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        alert("Failed to create campus. Please fill out all fields correctly.")
      }
    })

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
