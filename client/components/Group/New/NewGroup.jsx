import React, { useEffect } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Styling
import global from "../../components.global.scss";
import styles from "./newgroup.module.scss";

const categories = [
  "Music",
  "Movie",
  "Art",
  "Books",
  "Mental Health",
  "Dating",
  "College",
  "Career",
];

const NewGroup = ({ values, setValues, setStageCompleted }) => {
  const { name, description, category } = values;

  useEffect(() => {
    if (name.length > 0 && description.length > 0 && category.length > 0) {
      setStageCompleted(true);
    }
  }, [name, description, category]);

  return (
    <div className={styles.NewGroupPage}>
      <div className={global.Page} style={{ marginBottom: "32px" }}>
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
            onChange={event => setValues({ name: event.target.value })}
          />
        </div>
        <div>
          <h3 className={styles.CreateGroupHeader}> Description *</h3>
          <textarea
            id="description"
            className={styles.GroupDescText}
            onChange={event => setValues({ description: event.target.value })}
          />
        </div>
        <h3 className={styles.CreateGroupHeader}>Category</h3>
        <div>
          {categories.map(cat => (
            <button
              type="button"
              onClick={() => {
                setValues({ category: cat });
              }}
              className={
                category === cat
                  ? `${global.SmallPill} ${global.ActivePill}`
                  : `${global.SmallPill}`
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NewGroup;
