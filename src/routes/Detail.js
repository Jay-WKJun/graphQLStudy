import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #f03ab3, #e8781c);
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 60%;
  color: white;
`;

const Description = styled.div`
  width: 80%;
  height: 60%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
`;

const SubDescription = styled.div`
  font-size: 20px;
  margin: 1em 0;
`;

const Introduction = styled.div`
  width: 70%;
`;

const PosterSection = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
`;

const Poster = styled.img`
  width: 300px;
  height: 500px;
`;


const GET_MEDIA_QUERY = gql`
  query getMedia($id: Int!) {
    Media(id: $id) {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      coverImage {
        extraLarge
      }
      countryOfOrigin
      description
    }
  }
`;
function Detail() {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MEDIA_QUERY, { variables: { id }});
  console.log(data);

  return (
    <Wrapper>
      <DescriptionWrapper>
        <Description>
          { loading && <Title>Loading</Title>}
          <Title>
            {data?.Media?.title.english}
          </Title>
          <SubDescription>
            {data?.Media?.countryOfOrigin}
          </SubDescription>
          <Introduction>
            {data?.Media?.description}
          </Introduction>
        </Description>
      </DescriptionWrapper>
      <PosterSection>
        <Poster src={data?.Media?.coverImage.extraLarge} />
      </PosterSection>
    </Wrapper>
  );
}

export default Detail;
