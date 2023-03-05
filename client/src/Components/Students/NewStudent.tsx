import React, { useContext, useState } from 'react';
import { Student, initialStudentState } from '../../Context/@types.students';
import { Context } from '../../Context/ContextProvider';

function NewStudent() {
  const [newStudent, setNewStudent] = useState<Student>(initialStudentState);
  const { context, setContext, students } = useContext(Context);

  async function createStudent(evt: any) {
    evt.preventDefault();
    const postStudent = '/api/students';
    import('axios')
      .then((axios) => axios.default.post(postStudent, newStudent))
      .then((response) =>
        setContext({ ...context, students: [...students, response?.data] })
      )
      .catch((err) => {
        alert('Creation failed');
        return;
      });
    setNewStudent(initialStudentState);
  }

  return (
    <div id="add-student-form">
      <form onSubmit={createStudent}>
        <div>
          <div>First Name</div>
          <input
            name="First Name"
            placeholder="Jimmie"
            value={newStudent?.firstName}
            onChange={(evt) =>
              setNewStudent({ ...newStudent, firstName: evt.target.value })
            }
          />
        </div>

        <div>
          <div>Last Name</div>
          <input
            name="Last Name"
            placeholder="Wright"
            value={newStudent?.lastName}
            onChange={(evt) =>
              setNewStudent({ ...newStudent, lastName: evt.target.value })
            }
          />
        </div>

        <div>
          <div>Email</div>
          <input
            name="Email"
            value={newStudent?.email}
            onChange={(evt) =>
              setNewStudent({ ...newStudent, email: evt.target.value })
            }
          />
        </div>

        <div>
          <div>Image URL</div>
          <input
            name="Image URL"
            value={newStudent?.imageUrl}
            onChange={(evt) =>
              setNewStudent({ ...newStudent, imageUrl: evt.target.value })
            }
          />
        </div>

        <div>
          <div>GPA</div>
          <input
            name="GPA"
            type="number"
            step="0.01"
            value={newStudent?.gpa}
            onChange={(evt) =>
              setNewStudent({ ...newStudent, gpa: +evt.target.value })
            }
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewStudent;
