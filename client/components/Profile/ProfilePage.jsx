import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardDeck,
} from "reactstrap";

const ProfilePage = props => {
  const { userid } = props;

  return (
    <div>
      <Row className="bg-secondary" style={{ verticalAlign: "middle" }}>
        <Col xs="5">
          <img
            className="mt-4 ml-2"
            style={{ width: "7em", borderRadius: "50%" }}
            src="https://picsum.photos/200/200"
            alt="Avatar"
          />
        </Col>
        <Col>
          <div className="mt-3">
            <p className="text-black font-weight-bold">{userid}</p>
            <p className="text-white">15 yo * 10th Grade</p>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            </p>
          </div>
        </Col>
        <Col sm="4" />
      </Row>
      <Row className="mt-3 ml-3">
        <div display="table-cell" vertical-align="middle">
          <h5>Interests</h5>
        </div>
      </Row>
      <Row className="mb-5 mt-2 ml-3" style={{ flexDirection: "row" }}>
        <Button
          className="bg-white text-dark mr-2"
          style={{ borderRadius: "48%" }}
        >
          Swimming
        </Button>
        <Button
          className="bg-white text-dark mr-2"
          style={{ borderRadius: "48%" }}
        >
          Crying
        </Button>
        <Button
          className="bg-white text-dark mr-2"
          style={{ borderRadius: "48%" }}
        >
          College
        </Button>
      </Row>
      <Row className="ml-3">
        <div display="table-cell" vertical-align="middle">
          <h5>Subscriptions</h5>
        </div>
      </Row>
      <Row className="ml-3 mr-3">
        <CardDeck
          style={{
            justifyContent: "",
            display: "flex",
            overflowX: "scroll",
            flexDirection: "row",
          }}
        >
          <Card style={{ flex: "0 0 40%" }}>
            <CardImg
              top
              width="100%"
              src="https://picsum.photos/200/200?image=10"
              alt="Card image cap"
            />
            <CardBody>
              <CardText>Sarah</CardText>
            </CardBody>
          </Card>
          <Card style={{ flex: "0 0 40%" }}>
            <CardImg
              top
              width="100%"
              src="https://picsum.photos/200/200?image=20"
              alt="Card image cap"
            />
            <CardBody>
              <CardText>Jessica</CardText>
            </CardBody>
          </Card>
          <Card style={{ flex: "0 0 40%" }}>
            <CardImg
              top
              width="100%"
              src="https://picsum.photos/200/200?image=30"
              alt="Card image cap"
            />
            <CardBody>
              <CardText>Tiffany</CardText>
            </CardBody>
          </Card>
          <Card style={{ flex: "0 0 40%" }}>
            <CardImg
              top
              width="100%"
              src="https://picsum.photos/200/200?image=40"
              alt="Card image cap"
            />
            <CardBody>
              <CardText>Mel</CardText>
            </CardBody>
          </Card>
          <Card style={{ flex: "0 0 40%" }}>
            <CardImg
              top
              width="100%"
              src="https://picsum.photos/200/200?image=50"
              alt="Card image cap"
            />
            <CardBody>
              <CardText>Laura</CardText>
            </CardBody>
          </Card>
        </CardDeck>
      </Row>
      <Row className="ml-3 mt-4">
        <div display="table-cell" vertical-align="middle">
          <h5>Joined Groups</h5>
        </div>
      </Row>
      <Row className="ml-3">
        <CardDeck>
          <Card>
            <div className="row card-body">
              <img
                width="70em"
                src="https://picsum.photos/200/200?image=75"
                alt=""
              />
              <Col>
                <CardText>Group Name 1</CardText>
              </Col>
            </div>
          </Card>
          <Card>
            <div className="row card-body">
              <img
                width="70em"
                src="https://picsum.photos/200/200?image=85"
                alt=""
              />
              <Col>
                <CardText>Group Name 2</CardText>
              </Col>
            </div>
          </Card>
          <Card>
            <div className="row card-body">
              <img
                width="70em"
                src="https://picsum.photos/200/200?image=95"
                alt=""
              />
              <Col>
                <CardText>Group Name 3</CardText>
              </Col>
            </div>
          </Card>
        </CardDeck>
      </Row>
    </div>
  );
};

ProfilePage.propTypes = {
  userid: PropTypes.string.isRequired,
};

export default ProfilePage;
