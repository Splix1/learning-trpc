import React from 'react';
import { useParams } from 'react-router-dom';
import { trpc } from '../../utils/trpc';
import './Campus.css';

const SingleCampus = () => {
  const id = useParams<{ id: string }>().id!;
  const { data, isError } = trpc.getCampus.useQuery({ id })


  if (isError) return <div>An error occured retrieving this campus</div>
  if (!data) return <div>Loading...</div>
  return (
    <div className='container'>
      <div className='image-container'>
        <img className='image' alt={data?.campus?.name} src={data?.campus?.imageUrl} />
      </div>
      <div className='text-container'>
        <h2 className='name'>{data?.campus?.name}</h2>
        <p className='address'>{data?.campus?.address}</p>
        <p className='description'>{data?.campus?.description}</p>
      </div>
    </div>
  );
};

export default SingleCampus;
