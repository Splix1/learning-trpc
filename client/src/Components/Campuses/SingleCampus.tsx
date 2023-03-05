import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleCampus = () => {
  const { id } = useParams();
  const [campus, setCampus] = useState({
    name: '',
    imageUrl: '',
    address: '',
    description: '',
  });

  useEffect(() => {
    const fetchCampus = async () => {
      const { data } = await axios.get(`/api/campuses/${id}`);
      setCampus(data);
    };
    fetchCampus();
  }, [id]);

  return (
    <div id="singleCampus">
      <div>{campus.name}</div>
      <img src={campus.imageUrl} />
      <div>{campus.address}</div>
      <div>{campus.description}</div>
    </div>
  );
};

export default SingleCampus;
