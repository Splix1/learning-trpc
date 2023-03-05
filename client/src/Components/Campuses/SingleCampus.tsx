import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { trpc } from '../../utils/trpc';

const SingleCampus = () => {
  const id = useParams<{ id: string }>().id!;
  const { data, isError } = trpc.getCampus.useQuery({ id })


  if (isError) return <div>An error occured retrieving this campus</div>
  if (!data) return <div>Loading...</div>
  return (
    <div id="singleCampus">
      <div>{data?.campus?.name}</div>
      <img src={data?.campus?.imageUrl} />
      <div>{data?.campus?.address}</div>
      <div>{data?.campus?.description}</div>
    </div>
  );
};

export default SingleCampus;
