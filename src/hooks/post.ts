import { useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import { useToast } from 'react-native-toast-notifications';
import {
  CreatePostInput,
  TimelineScreenDataDocument,
  TimelineScreenDataQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} from 'src/generated/graphql';
import { creatingPostReplyVar, creatingPostVar } from 'src/stores/post';

export const useCreatingPostReply = () => {
  const creatingPostReply = useReactiveVar(creatingPostReplyVar);

  const setCreatingPostReply = useCallback((value: boolean) => {
    creatingPostReplyVar(value);
  }, []);

  return {
    creatingPostReply,
    setCreatingPostReply,
  };
};

export const useCreatingPost = () => {
  const creatingPost = useReactiveVar(creatingPostVar);

  const setCreatingPost = useCallback((value: boolean) => {
    creatingPostVar(value);
  }, []);

  return {
    creatingPost,
    setCreatingPost,
  };
};

export const useCreatePost = () => {
  const [createPostMutation] = useCreatePostMutation();

  const createPost = useCallback(
    async ({
      input,
      onCompleted,
    }: {
      input: CreatePostInput;
      onCompleted?: () => void;
    }) => {
      try {
        await createPostMutation({
          variables: {
            input,
          },
          update: (cache, { data: responseData }) => {
            // if (!responseData) {
            //   return;
            // }
            // const cachedActivityPostsQuery =
            //   cache.readQuery<ActivityPostsQuery>({
            //     query: ActivityPostsDocument,
            //   });
            // if (cachedActivityPostsQuery) {
            //   const newEdge = {
            //     node: responseData.createPost,
            //     cursor: '',
            //   };
            //   const newEdges = [
            //     newEdge,
            //     ...cachedActivityPostsQuery.posts.edges,
            //   ];
            //   cache.writeQuery({
            //     query: ActivityPostsDocument,
            //     data: {
            //       posts: {
            //         ...cachedActivityPostsQuery.posts,
            //         edges: newEdges,
            //       },
            //     },
            //   });
            // }
          },
          onCompleted,
        });
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  return {
    createPost,
  };
};

export const useDeletePost = () => {
  const [deletePostMutation] = useDeletePostMutation();
  const toast = useToast();

  const deletePost = async (id: number) => {
    await deletePostMutation({
      variables: {
        id,
      },
      update: (cache, { data: responseData }) => {
        if (!responseData || !responseData?.deletePost.id) {
          return;
        }

        const timelineScreenDataQuery =
          cache.readQuery<TimelineScreenDataQuery>({
            query: TimelineScreenDataDocument,
          });

        if (timelineScreenDataQuery) {
          const newEdges = timelineScreenDataQuery.posts.edges.filter(
            (edge) => edge.node.id !== responseData.deletePost.id
          );
          cache.writeQuery({
            query: TimelineScreenDataDocument,
            data: {
              posts: {
                ...timelineScreenDataQuery.posts,
                edges: newEdges,
              },
            },
          });
        }
      },
      onCompleted: () => {
        toast.show('削除しました');
      },
    });
  };

  return {
    deletePost,
  };
};
