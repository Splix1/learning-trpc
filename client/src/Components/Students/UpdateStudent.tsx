import React, { useState, useEffect, useContext } from 'react';
import '../../App.css';
import { initialStudentState, Student } from '../../Context/@types.students';
import { Context } from '../../Context/ContextProvider';

export default function UpdateStudent() {
  const [studentToUpdate, setStudentToUpdate] = useState<number | null>(null);
  const [updatedStudent, setUpdatedStudent] =
    useState<Student>(initialStudentState);
  const { students, context, setContext } = useContext(Context);

  useEffect(() => {
    if (studentToUpdate) {
      const student = students?.filter(
        (currentStudent) => currentStudent.id === studentToUpdate
      );
      setUpdatedStudent(student[0]);
    }
  }, [studentToUpdate]);

  function updateStudent(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const updateStudentRoute = `/api/students/${updatedStudent.id}`;
    import('axios')
      .then((axios) => axios.default.put(updateStudentRoute, updatedStudent))
      .then((response) => {
        console.log('response', response);
        setContext({
          ...context,
          students: students.map((currentStudent) =>
            currentStudent.id === updatedStudent.id
              ? response.data
              : currentStudent
          ),
        });
      });
  }

  return (
    <div id="update-campus">
      Update Student
      <div>
        <select onChange={(evt) => setStudentToUpdate(+evt.target.value)}>
          <option value={0}>Select a Student</option>
          {students?.map((currentStudent) => (
            <option
              key={currentStudent.id}
              value={currentStudent.id}
            >{`${currentStudent.firstName} ${currentStudent.lastName}`}</option>
          ))}
        </select>
      </div>
      {studentToUpdate ? (
        <div id="add-campus-form">
          <form onSubmit={updateStudent}>
            <div>
              <div>First Name</div>
              <input
                name="firstName"
                defaultValue={updatedStudent?.firstName || ''}
                onChange={(evt) =>
                  setUpdatedStudent({
                    ...updatedStudent,
                    firstName: evt.target.value,
                  })
                }
              />
            </div>

            <div>
              <div>Last Name</div>
              <input
                name="lastName"
                defaultValue={updatedStudent?.lastName || ''}
                onChange={(evt) =>
                  setUpdatedStudent({
                    ...updatedStudent,
                    lastName: evt.target.value,
                  })
                }
              />
            </div>

            <div>
              <div>Image URL</div>
              <input
                name="imageURL"
                defaultValue={updatedStudent?.imageUrl || ''}
                onChange={(evt) =>
                  setUpdatedStudent({
                    ...updatedStudent,
                    imageUrl: evt.target.value,
                  })
                }
              />
            </div>

            <div>
              <div>GPA</div>
              <input
                name="GPA"
                defaultValue={updatedStudent?.gpa || 0}
                onChange={(evt) =>
                  setUpdatedStudent({
                    ...updatedStudent,
                    gpa: +evt.target.value,
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
