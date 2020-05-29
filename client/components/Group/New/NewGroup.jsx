import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createGroup } from "../../../actions/Group";
import styles from "./newgroup.module.scss";

const NewGroup = ({ currentUser, categories, handleNext }) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState(null);

  const handleSubmit = event => {
    event.preventDefault();

    if (category == null) {
      return window.alert("A category must be selected!");
    }

    return createGroup(name, description, category, currentUser._id)
      .then(res => handleNext(res._id))
      .catch(() => {
        // eslint-disable-next-line no-alert
        window.alert("Failed to create group!");
      });
  };

  return (
    <form className={styles.NewGroupPage} onSubmit={handleSubmit}>
      <div className="Page" style={{ marginBottom: "32px" }}>
        <div className={styles.AddIcon}>
          <button type="button" className={styles.AddBtn}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <p className={styles.AddText}>Add an icon</p>
        </div>
        <div>
          <h3 className={styles.CreateGroupHeader}>Group Name *</h3>
          <input
            id="groupname"
            className={styles.GroupNameText}
            type="text"
            required
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <h3 className={styles.CreateGroupHeader}> Description *</h3>
          <textarea
            id="description"
            className={styles.GroupDescText}
            required
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </div>
        <h3 className={styles.CreateGroupHeader}>Category *</h3>
        <div>
          {categories.map(cat => (
            <button
              key={cat._id}
              type="button"
              onClick={() => setCategory(cat._id)}
              className={
                category === cat._id ? "SmallPill ActivePill" : "SmallPill"
              }
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <button className="NextButton" type="submit">
          <h1>CREATE</h1>
        </button>
      </div>
    </form>
  );
};

NewGroup.propTypes = {
  handleNext: PropTypes.func.isRequired,
};

export default NewGroup;
