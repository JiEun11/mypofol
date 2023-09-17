import React from 'react';
import { useParams } from 'react-router-dom';

export default function Account() {
  const { accountId } = useParams();
  return (
    <div>
      <h1>Hello {accountId} </h1>
    </div>
  );
}

