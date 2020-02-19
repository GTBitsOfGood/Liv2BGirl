import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from 'reactstrap';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardDeck, Button} from 'reactstrap';

const ProfilePage = props => {
  const { userid } = props;

  return (
  	<div>
	  	<Row className='bg-secondary' style = {{ textAlign: 'center', verticalAlign: 'middle'}}>
	        <div className="mt-3">
	        	<img style = {{ width:"10em", borderRadius: '50%'}} src="https://picsum.photos/200/200" alt="Avatar" />
	        	<br></br>
			    <h1 className='text-white'>{userid}</h1>
			    <p className='text-white'>15 yo * 10th Grade</p>
			    <p className='text-white'>Bio:</p>
			    <p className='text-white ml-5 mr-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
		    </div>
	        <Col sm="4"></Col>
	    </Row>
	    <Row className="mt-3">
	  		<div display='table-cell' vertical-align='middle'>
			    <h3>Interests</h3>
		    </div>
	    </Row>
	    <Row className='mb-5 mt-2'>
	    	<CardDeck>
		  		<Card className="rounded-pill clickable" style={{width: "18rem"}}>
			        <CardBody>
			          <CardText>Swimming</CardText>
			        </CardBody>
			     </Card>
			     <Card className="rounded-pill">
			        <CardBody>
			          <CardText>Dancing</CardText>
			        </CardBody>
			     </Card>
			     <Card className="rounded-pill">
			        <CardBody>
			          <CardText>Netflix</CardText>
			        </CardBody>
			     </Card>
			     <Card className="rounded-pill">
			        <CardBody>
			          <CardText>Music</CardText>
			        </CardBody>
			     </Card>
			     <Card className="rounded-pill" width="50%">
			        <CardBody>
			          <CardText>College</CardText>
			        </CardBody>
			     </Card>
		      </CardDeck>
	    </Row>
	    <Row className="ml-3">
	  		<div display='table-cell' vertical-align='middle'>
			    <h3>Followers</h3>
		    </div>
	    </Row>
	    <Row className="scrollable-box ml-3">
			<CardDeck style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
		      <Card style={{flexBasis: "55%"}}>
		      	<CardImg top width="100%" src="https://picsum.photos/200/200?image=10" alt="Card image cap" />
		        <CardBody>
		          <CardText>Sarah</CardText>
		        </CardBody>
		      </Card>
		      <Card style={{flexBasis: "55%"}}>
		      	<CardImg top width="100%" src="https://picsum.photos/200/200?image=20" alt="Card image cap" />
		        <CardBody>
		          <CardText>Jessica</CardText>
		        </CardBody>
		      </Card>
		      <Card style={{flexBasis: "55%"}}>
		      	<CardImg top width="100%" src="https://picsum.photos/200/200?image=30" alt="Card image cap" />
		        <CardBody>
		          <CardText>Tiffany</CardText>
		        </CardBody>
		      </Card>
		      <Card style={{flexBasis: "55%"}}>
		      	<CardImg top width="100%" src="https://picsum.photos/200/200?image=40" alt="Card image cap" />
		        <CardBody>
		          <CardText>Mel</CardText>
		        </CardBody>
		      </Card>
		      <Card style={{flexBasis: "55%"}}>
		      	<CardImg top width="100%" src="https://picsum.photos/200/200?image=50" alt="Card image cap" />
		        <CardBody>
		          <CardText>Laine</CardText>
		        </CardBody>
		      </Card>
		      <Card style={{flexBasis: "55%"}}>
		      	<CardImg top width="100%" src="https://picsum.photos/200/200?image=60" alt="Card image cap" />
		        <CardBody>
		          <CardText>Sarah</CardText>
		        </CardBody>
		      </Card>
		      <Card style={{flexBasis: "55%"}}>
		      	<CardImg top width="100%" src="https://picsum.photos/200/200?image=70" alt="Card image cap" />
		        <CardBody>
		          <CardText>Sarah</CardText>
		        </CardBody>
		      </Card>
		      <Card style={{flexBasis: "55%"}}>
		      	<CardImg top width="100%" src="https://picsum.photos/200/200?image=80" alt="Card image cap" />
		        <CardBody>
		          <CardText>Jane</CardText>
		        </CardBody>
		      </Card>
		    </CardDeck>
		</Row>
	</div>
  );
};

ProfilePage.propTypes = {
  userid: PropTypes.string.isRequired
};

export default ProfilePage;
