import { useState } from 'react';
import { UserProfile } from 'src/components/domain/user/UserProfile';
import {
  UserGetError,
  useUserProfileItemInMessageUserProfileListQuery,
} from 'src/generated/graphql';
import { getGraphQLError } from 'src/utils';

type Props = { id: string };

export const UserProfileItem = ({ id }: Props) => {
  const [userNotFound, setUserNotFound] = useState(false);

  useUserProfileItemInMessageUserProfileListQuery({
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
    onError: (e) => {
      const ge = getGraphQLError(e, 0);
      if (ge.code === UserGetError.NotFound) {
        setUserNotFound(true);
      }
    },
  });

  if (userNotFound) {
    return null;
  }

  return <UserProfile id={id} />;
};
