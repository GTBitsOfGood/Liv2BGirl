import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {Post} from "../Post";
import { getApprovedPosts } from "../../actions/Post";
import { approvePost, deletePost } from "../../actions/Post";
import { avatarImg, colorArr } from "../../../utils/avatars";
import { timeSince } from "../ThreadComment/utils";
// import { render } from "node-sass";


const Newsfeed = ({posts}) => {
    console.log(JSON.parse(posts.content));
    return(
  <div>
    <ol>
      {
        posts.map(post => (
          <li key = {posts._id} align = "start">
            <div>
              <p> {posts.createdBy}</p>
              <p> {posts.content != null && posts.content.length > 0
            ? JSON.parse(posts.content)
            : null} </p>
              <p> {posts.createdAt} </p>
              </div>
              </li>
        ))
      }
      </ol> 
      </div>
    );
 }

index.PropTypes = {
  post: PropTypes.arrayOf (
    PropTypes.shape({
        content: PropTypes.string.isRequired,
        createdAt:PropTypes.string.isRequired,
        createdBy: PropTypes.string.isRequired,
    })
).isRequired,
};

export default Newsfeed;