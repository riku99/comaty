import { useMyIdQuery } from 'src/generated/graphql';

export const useMyId = () => {
  const { data } = useMyIdQuery({ fetchPolicy: 'cache-only' });

  if (!data?.me) {
    return null;
  }

  return data.me.id;
};
