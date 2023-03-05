import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    imageUrl: '',
    gpa: 0,
  });

  useEffect(() => {
    const fetchStudent = async () => {
      const { data } = await axios.get(`/api/students/${id}`);
      setStudent(data);
    };
    fetchStudent();
  }, [id]);

  return (
    <div id="singleStudent">
      <div>{`${student.firstName} ${student.lastName}`}</div>
      <div>{student.email}</div>
      <img src={student.imageUrl} />
      <div>{student.gpa}</div>
    </div>
  );
};

export default SingleStudent;
