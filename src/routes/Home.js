import React from 'react';
import {
  useQuery,
  gql,
} from '@apollo/client';
import styled from 'styled-components';
import Anime from '../components/Anime';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 50vh;
  background: linear-gradient(to right, #f03ab3, #e8781c);
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 2em;
  font-size: 30px;
  color: white;
`;

const Title = styled.span`
  font-weight: bold;
`;

const SubTitle = styled.span`
  font-size: 14px;
`;

const Loading = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: bold;
  color: white;
`;

const AnimationWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const Animations = styled.div`
  width: 60%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: -50px;
`;

const QUERY = gql`
{
  Page(page: 0, perPage: 20) {
    mediaList {
      id
      media {
        id
        isLiked @client
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
  const { loading, data } = useQuery(QUERY);
  console.log(data, loading);

  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>
            Apollo Animations
          </Title>
          <SubTitle>
            made with "Apollo Client" & "GraphQL"
          </SubTitle>
        </TitleWrapper>
      </Header>
      <AnimationWrapper>
        <Animations>
          { loading && <Loading>loading...</Loading> }
          {
            data?.Page?.mediaList.map(media => (
              <Anime media={media} key={media.id} />
            ))
          }
        </Animations>
      </AnimationWrapper>
    </div>
  );
}

export default Home;
