import { useEffect, useState } from 'react';
import { UserProfile } from 'src/components/domain/user/UserProfile';
import {
  UserGetError,
  useUserProfileItemInMessageUserProfileListQuery,
} from 'src/generated/graphql';
import { getGraphQLError } from 'src/utils';

type Props = {
  id: string;
  displayedItemIndexInViewport: number;
  itemIndex: number;
};

export const UserProfileItem = ({
  id,
  displayedItemIndexInViewport,
  itemIndex,
}: Props) => {
  const [userNotFound, setUserNotFound] = useState(false);
  const [skipQuery, setSkipQuery] = useState(
    Math.abs(itemIndex - displayedItemIndexInViewport) > 2
  );

  useUserProfileItemInMessageUserProfileListQuery({
    variables: {
      id,
    },
    skip: skipQuery,
    fetchPolicy: 'cache-and-network',
    onError: (e) => {
      const ge = getGraphQLError(e, 0);
      if (ge.code === UserGetError.NotFound) {
        setUserNotFound(true);
      }
    },
  });

  useEffect(() => {
    // skip: が false -> true になると data も undfined になってしまうので、まだスキップ中のもののみ検証
    if (skipQuery) {
      setSkipQuery(Math.abs(itemIndex - displayedItemIndexInViewport) > 2);
    }
  }, [itemIndex, displayedItemIndexInViewport, setSkipQuery]);

  if (userNotFound) {
    return null;
  }

  return <UserProfile id={id} />;
};
