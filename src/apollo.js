import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co/',
  cache: new InMemoryCache(),
  resolvers: {
    Media: {
      isLiked: () => false,
    },
    Mutation: {
      likeAnime: (_, { id }, { cache }) => {
        cache.writeData({
          id: `Media:${id}`,
          data: {
            isLike: true,
          }
        })
      }
    }
  }
});

export default client;
