import React, { useContext } from 'react';
import { Context } from '../../Context/ContextProvider';
import { Student } from '../../Context/@types.students';
import { useLocation } from 'react-router-dom';
import NewStudent from './NewStudent';
import UpdateStudent from './UpdateStudent';

const AllStudents = () => {
  const { students, context, setContext } = useContext(Context);

  function deleteStudent(student: Student) {
    const deleteRoute = `/api/students/${student.id}`;
    import('axios')
      .then((axios) => axios.default.delete(deleteRoute))
      .then((response) =>
        setContext({
          ...context,
          students: students.filter(
            (currentStudent) => currentStudent.id !== student.id
          ),
        })
      );
  }

  return (
    <div id="students">
      <NewStudent />
      <UpdateStudent />
      {students?.map((student: Student) => {
        return (
          <div className="student" key={student.id}>
            <img src={student.imageUrl} alt="student-img" />
            <div>{student.firstName}</div>
            <div>{student.lastName}</div>
            <div>{student.email}</div>
            <div>{student.gpa}</div>
            <button onClick={() => deleteStudent(student)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default AllStudents;
