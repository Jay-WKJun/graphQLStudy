import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const ASDF = gql`
  query getMedia($id: Int!) {
    Media(id: $id) {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
    }
  }
`;
function Detail() {
  const { id } = useParams();
  const { loading, data } = useQuery(ASDF, { variables: { id }});
  console.log(data);

  return (
    <div>
      {
        loading
          ? (
            `Detail${id}`
          )
          : (
            data.Media.title.english
          )
      }
    </div>
  );
}

export default Detail;
