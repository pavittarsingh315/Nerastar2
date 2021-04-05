import React, { useEffect, useState } from "react";
import "../Styles/Gifs.css";

// Redux
import { connect, useSelector, useDispatch } from "react-redux";
import { addPost, getTrendingGifs } from "../redux/actions/posts";

// Material Ui
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import GifIcon from "@material-ui/icons/Gif";
import TheatersIcon from "@material-ui/icons/Theaters";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const InputField = withStyles({
   root: {
      "& label.Mui-focused": {
         color: "var(--primary-color)",
      },
      "& .MuiInput-underline:after": {
         borderBottomColor: "red",
      },
      "& .MuiOutlinedInput-root": {
         "& fieldset": {
            borderColor: "var(--primary-color)",
         },
         "&:hover fieldset": {
            borderColor: "var(--primary-color)",
         },
         "&.Mui-focused fieldset": {
            borderColor: "var(--primary-color)",
         },
      },
   },
})(TextField);

function CreatePost({ addPost, getTrendingGifs, gifs, gifsLoading }) {
   const dispatch = useDispatch();
   const username = useSelector((state) => state.auth.profile.user);
   const [createPostOpen, setCreatePostOpen] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [gifSearch, setGifSearch] = useState("");
   const [gifOpen, setGifOpen] = useState(false);
   const id = gifOpen ? "simple-popover" : undefined;
   const [postForm, setPostForm] = useState({
      caption: "",
      mediaUrl: "",
      file: null,
      fileName: null,
   });

   const handleCreatePostOpen = () => {
      setCreatePostOpen(!createPostOpen);
      setPostForm({
         caption: "",
         file: null,
         fileName: null,
      });
   };

   const handleGifClick = (src) => {
      setPostForm({
         ...postForm,
         mediaUrl: src,
      });
   };

   const handlePostFormChange = (e) => {
      setPostForm({
         ...postForm,
         [e.target.name]: e.target.value,
      });
   };

   const handlePostFormFiles = (e) => {
      setPostForm({
         ...postForm,
         file: e.target.files[0],
         fileName: e.target.files[0].name,
      });
   };

   const handleClearFile = () => {
      setPostForm({
         ...postForm,
         file: null,
         fileName: null,
      });
   };

   const handleGif = (e) => {
      setAnchorEl(e.currentTarget);
      setGifOpen(true);
      dispatch({ type: "GIFS_LOADING" });
   };

   const handleGifClose = () => {
      setAnchorEl(null);
      setGifOpen(false);
   };

   useEffect(() => {
      if (gifOpen) {
         setTimeout(() => {
            getTrendingGifs(process.env.REACT_APP_GIPHY_API_KEY, 20, 0);
         }, 500);
      } else if (!gifOpen) {
         setTimeout(() => {
            dispatch({ type: "CLEAR_GIFS" });
         }, 750);
      }
   }, [gifOpen]);

   const handlePostSubmit = (e) => {
      e.preventDefault();

      const post = new FormData();
      post.append("content", postForm.caption);
      if (postForm.file) {
         post.append("media", postForm.file, postForm.fileName);
      }

      addPost(post, username);

      setCreatePostOpen(false);
      setPostForm({
         caption: "",
         file: null,
         fileName: null,
      });
   };

   return (
      <div>
         <div className="rightmenu__navOption" onClick={handleCreatePostOpen}>
            <AddIcon />
            Add Post
         </div>

         <Dialog
            maxWidth="xs"
            fullWidth
            open={createPostOpen}
            onClose={handleCreatePostOpen}
            aria-labelledby="create-post-title"
         >
            <MuiDialogTitle disableTypography className="modalTitle">
               <Typography align="center" variant="h6">
                  Create a Post
               </Typography>
            </MuiDialogTitle>
            <MuiDialogContent className="generalModal">
               <form noValidate onSubmit={handlePostSubmit}>
                  <InputField
                     autoFocus
                     value={postForm.caption}
                     id="caption"
                     label="Caption"
                     name="caption"
                     multiline
                     rows={3}
                     fullWidth
                     type="text"
                     variant="outlined"
                     onChange={handlePostFormChange}
                     margin="normal"
                  />

                  <div className="postCreateMedia">
                     <input
                        accept=".png, .jpg, .jpeg, .mp4"
                        id="file-upload"
                        style={{ display: "none" }}
                        type="file"
                        onChange={handlePostFormFiles}
                     />
                     <label htmlFor="file-upload">
                        <IconButton
                           component="span"
                           style={{ backgroundColor: "transparent" }}
                        >
                           <div className="postModalIcons">
                              <TheatersIcon fontSize="large" />
                              Media
                           </div>
                        </IconButton>
                     </label>

                     <div>
                        <IconButton
                           component="span"
                           style={{ backgroundColor: "transparent" }}
                           onClick={handleGif}
                        >
                           <div className="postModalIcons">
                              <GifIcon fontSize="large" />
                              Choose Gif
                           </div>
                        </IconButton>
                     </div>
                  </div>
                  {postForm.fileName ? (
                     <div className="postMediaName">
                        <Typography
                           style={{ textAlign: "center" }}
                           variant="h6"
                        >
                           {postForm.fileName}
                        </Typography>
                        <IconButton onClick={handleClearFile}>
                           <CloseIcon />
                        </IconButton>
                     </div>
                  ) : null}
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     className="postModalSubmitBtn"
                  >
                     Post
                  </Button>
               </form>
            </MuiDialogContent>
            <MuiDialogActions className="modalAction" />
         </Dialog>
         <Popover
            className="gifs__popper"
            id={id}
            open={gifOpen}
            anchorEl={anchorEl}
            onClose={handleGifClose}
            anchorOrigin={{
               vertical: "center",
               horizontal: "right",
            }}
            transformOrigin={{
               vertical: "center",
               horizontal: "left",
            }}
         >
            <div className="gifs">
               <div className="gifs__search">
                  <div className="search-wrapper">
                     <div style={{ width: "100%", overflowX: "hidden" }}>
                        <div className="searchBar">
                           <SearchIcon />
                           <input
                              autoComplete="off"
                              id="search"
                              value={gifSearch}
                              onChange={(e) => setGifSearch(e.target.value)}
                              type="text"
                              placeholder="(╯°□°）╯︵ ┻━┻"
                           />
                           <label htmlFor="search">Search</label>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="gifs__content">
                  {gifsLoading ? (
                     <div className="modalLoading">
                        <CircularProgress
                           style={{ color: "var(--primary-color)" }}
                        />
                     </div>
                  ) : (
                     <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="center"
                        alignItems="center"
                     >
                        {gifs.map((gif) => (
                           <Grid
                              item
                              xs={6}
                              key={Math.random()}
                              onClick={() => handleGifClick(gif.mp4)}
                           >
                              <video
                                 className="gif__object"
                                 autoPlay
                                 loop
                                 src={gif.mp4}
                              />
                           </Grid>
                        ))}
                     </Grid>
                  )}
               </div>
               <MuiDialogActions>
                  <h4>
                     Powered by
                     <a
                        href="https://giphy.com/"
                        style={{ color: "var(--primary-color)" }}
                        target="_blank"
                        rel="noreferrer nofollow"
                     >
                        {" "}
                        GIPHY
                     </a>
                  </h4>
               </MuiDialogActions>
            </div>
         </Popover>
      </div>
   );
}

const mapStateToProps = (state) => ({
   gifs: state.posts.gifs,
   gifsLoading: state.posts.gifsLoading,
});

export default connect(mapStateToProps, { addPost, getTrendingGifs })(
   CreatePost
);
