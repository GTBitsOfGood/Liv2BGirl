import React from "react";

// Page Component
import CreateThreadComponent from "../../../../client/components/Group/Thread/CreateThread";

const CreateThread = (props) => {
	const { currentUser } = props;
	return <CreateThreadComponent currentUser={props.currentUser} />
};

export default CreateThread;
