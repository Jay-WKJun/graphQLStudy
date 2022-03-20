import React from 'react';
import { useNavigate } from 'react-router';
import {
  useMutation,
  gql,
} from '@apollo/client';
import styled from 'styled-components';

const Animation = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 250px;
  margin: 0 10px;
`;

const Poster = styled.img`
  width: 150px;
  height: 200px;
`;

const LikeButton = styled.button`
  width: 50px;
  height: 30px;
  margin-top: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
`;

const LIKE_MUTATION = gql`
  mutation likeAnime($id: Int) {
    likeAnime(id: $id) @client
  }
`;

function Anime({ media }) {
  const navigator = useNavigate();
  const [likeAnime] = useMutation(LIKE_MUTATION, {
    variables: { id: parseInt(media.media.id) }
  });

  const handleLikeButtonClick = React.useCallback((e) => {
    e.stopPropagation();
    likeAnime();
  }, [likeAnime]);

  return (
    <Animation key={media.id} onClick={() => navigator(`/${media.media.id}`)}>
      <Poster src={media.media.coverImage.extraLarge} />
    </Animation>
  );
}

export default Anime;
