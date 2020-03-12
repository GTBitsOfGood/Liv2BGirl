import React from "react";
import { useRouter } from "next/router";
import { Link } from "next/link";

// Stylings
import "../../../../client/components/Group/GroupPage.scss";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";

// Components
import { Button, Input, Form } from "reactstrap";

const CreateThread = () => {
  const router = useRouter();
  const { groupid } = router.query;
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");

  const handleCreateThread = async () =>
    // eslint-disable-next-line no-alert
    window.alert(
      `Created in group ${groupid} with title "${title}" and text "${text}"`
    );

  return (
    <div>
      <div className="create-thread-header">
        <Button
          tag={Link}
          className="create-thread-back"
          href={`/app/groups/${groupid}`}
        >
          <Icon className="back-group" icon={bxArrowBack} width="18px" />
        </Button>
        <p>liv2bgirl</p>
        <Button className="create-thread-post" onClick={handleCreateThread}>
          Post
        </Button>
      </div>
      <div className="page">
        <h1 className="create-thread-h1">Start a New Thread.</h1>
        <Form className="create-thread-form">
          <Input
            onChange={event => {
              setTitle(event.target.value);
            }}
            className="create-thread-title"
            type="text"
            placeholder="Title"
          />
          <Input
            onChange={event => {
              setText(event.target.value);
            }}
            className="create-thread-text"
            type="textarea"
            placeholder="Text"
          />
        </Form>
      </div>
    </div>
  );
};

export default CreateThread;
