/* eslint-disable import/no-anonymous-default-export */
import {
   GET_POSTS,
   ADD_POST,
   POSTS_LOADING,
   CLEAR_POSTS,
   POST_LOADING_ERROR,
   GET_COMMENTS,
   GET_REPLIES,
} from "../actions/types";

const initialState = {
   posts: [],
   isLoading: false,
   hasMore: true,
   error: false,

   comments: [],
   moreComments: true,
   commentsError: false,
   commentsLoading: false,

   replies: [],
   moreReplies: true,
   repliesError: false,
   repliesLoading: false,
   createReply: {
      replyReceiver: null,
      commentId: null,
   },
   gifs: [],
   gifsLoading: false,
};

export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case POSTS_LOADING:
         return {
            ...state,
            isLoading: true,
         };
      case POST_LOADING_ERROR:
         return {
            ...state,
            error: true,
         };
      case GET_POSTS:
         return {
            ...state,
            posts: state.posts.concat(payload.results),
            hasMore: payload.next,
            isLoading: false,
         };
      case ADD_POST:
         return {
            ...state,
            posts: [payload, ...state.posts],
         };

      case GET_COMMENTS:
         return {
            ...state,
            comments: state.comments.concat(payload.results),
            moreComments: payload.next,
            commentsLoading: false,
         };
      case "CLEAR_COMMENTS": {
         return {
            ...state,
            comments: [],
            moreComments: true,
            commentsError: false,
            commentsLoading: false,
         };
      }
      case "COMMENT_LOADING_ERROR": {
         return {
            ...state,
            commentsError: true,
         };
      }
      case "COMMENTS_LOADING": {
         return {
            ...state,
            commentsLoading: true,
         };
      }
      case "ADD_COMMENT": {
         return {
            ...state,
            comments: [payload, ...state.comments],
         };
      }

      case GET_REPLIES:
         return {
            ...state,
            replies: state.replies.concat(payload.results),
            moreReplies: payload.next,
            repliesLoading: false,
         };
      case "CLEAR_REPLIES": {
         return {
            ...state,
            replies: [],
            moreReplies: true,
            repliesError: false,
            repliesLoading: false,
         };
      }
      case "REPLIES_LOADING_ERROR": {
         return {
            ...state,
            repliesError: true,
         };
      }
      case "REPLIES_LOADING": {
         return {
            ...state,
            repliesLoading: true,
         };
      }
      case "SELECT_REPLY": {
         return {
            ...state,
            createReply: payload,
         };
      }
      case "ADD_REPLY": {
         return {
            ...state,
            replies: [...state.replies, payload],
         };
      }
      case "DELETE_REPLY": {
         return {
            ...state,
            createReply: {
               replyReceiver: null,
               commentId: null,
            },
         };
      }

      case "GET_GIFS": {
         return {
            ...state,
            gifsLoading: false,
            gifs: payload,
         };
      }
      case "GIFS_LOADING": {
         return {
            ...state,
            gifsLoading: true,
         };
      }
      case "CLEAR_GIFS": {
         return {
            ...state,
            gifs: [],
            gifsLoading: false,
         };
      }

      case CLEAR_POSTS:
         return {
            ...state,
            posts: [],
            isLoading: false,
            hasMore: true,
            error: false,
            comments: [],
            moreComments: true,
            replies: [],
            moreReplies: true,
            createReply: {
               replyReceiver: null,
               commentId: null,
            },
            gifs: [],
            gifsLoading: false,
         };
      default:
         return state;
   }
}
