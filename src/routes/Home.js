import React from 'react';
import { useNavigate } from 'react-router';
import {
  useQuery,
  gql,
} from '@apollo/client';

const QUERY = gql`
{
  Page(page: 0, perPage: 20) {
    mediaList {
      id
      media {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        type
        format
        season
        episodes
        siteUrl
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
    }
  },
}
`;

function Home() {
  const navigator = useNavigate();
  const { loading, data } = useQuery(QUERY);
  console.log(data, loading);

  return (
    <div>
      {
        loading
        ? "loading..."
        : (
          data.Page.mediaList.map(media => (
            <div key={media.id} onClick={() => navigator(`/${media.media.id}`)}>
              {media.media.title.english}
            </div>
          ))
        )
      }
    </div>
  );
}

export default Home;
