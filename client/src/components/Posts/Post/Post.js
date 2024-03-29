import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import {
  ThumbUpAlt,
  ThumbUpAltOutlined,
  Delete,
  MoreHoriz,
} from "@mui/icons-material";
// import DeleteIcon from '@mui/icons-material/Delete'
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from "react-redux";
import { fetchPost, deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
export default function Post({ post, setCurrentId, user }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
    dispatch(deletePost(post._id));
  };
  const openPost = () => {
    dispatch(fetchPost(post._id, navigate));
  };

  const handleLike = () => {
    dispatch(likePost(post._id));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMoreButtonClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelectEdit = (e) => {
    e.stopPropagation();
    handleMenuClose();
    setCurrentId(post._id);
  };
  const handleSelectSeeAuthor = (e) => {
    e.stopPropagation();
    handleMenuClose();
  };
  const handleSelectReport = (e) => {
    e.stopPropagation();
    handleMenuClose();
  };

  const likeComponent = post.likes.length ? (
    post.likes.find((userId) => userId === user?.id) ? (
      <Button
        size="small"
        color="primary"
        onClick={handleLike}
        disabled={!user}
      >
        {" "}
        <ThumbUpAlt fontSize="small" />
        &nbsp;
        {post.likes.length > 2
          ? `You and ${post.likes.length - 1} others`
          : post.likes.length === 1
          ? `${post.likes.length} like`
          : `${post.likes.length} likes`}
        {/* this user liked */}
      </Button>
    ) : (
      <Button
        size="small"
        color="primary"
        onClick={handleLike}
        disabled={!user}
      >
        {" "}
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;
        {`${post.likes.length} ${post.likes > 1 ? "Likes" : "Like"}`}
      </Button>
    )
  ) : (
    <Button size="small" color="primary" onClick={handleLike} disabled={!user}>
      {" "}
      <ThumbUpAltOutlined fontSize="small" />
      &nbsp; Like
    </Button>
  );

  return (
    <div>
      <Card className={classes.card}>
        <ButtonBase onClick={openPost} className={classes.cardAction}>
          <CardMedia
            className={classes.media}
            image={post.selectedFile}
            title={post.title}
          />
          <div className={classes.overlay}>
            <Typography variant="h6"> {post.creator}</Typography>
            <Typography variant="body2">
              {" "}
              {moment(post.createdAt).fromNow()}{" "}
            </Typography>
          </div>
          <div className={classes.overlay2}>
            <IconButton
              style={{ color: "white" }}
              size="small"
              onClick={handleMoreButtonClick}
            >
              {" "}
              <MoreHoriz fontSize="default" />{" "}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {user && user.id === post.creatorId && (
                <MenuItem onClick={handleSelectEdit}>Edit</MenuItem>
              )}
              {user && <MenuItem onClick={handleSelectReport}>Report</MenuItem>}
              <MenuItem onClick={handleSelectSeeAuthor}>See author</MenuItem>
            </Menu>
          </div>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {post.title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.message}
            </Typography>
          </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
          {likeComponent}
          <Button
            size="small"
            color="primary"
            onClick={handleDelete}
            disabled={user && user.id === post.creatorId ? false : true}
          >
            <Delete fontSize="small" disabled /> Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
