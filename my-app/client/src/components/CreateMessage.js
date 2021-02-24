import React from "react";
import Bootstrap from "bootstrap";
import { Form, Button, Row, Col, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import Popup from "./popup/Popup";
//import CustomDropdown from "./dropdown/CustomDropdown";

const styles = {
  cancelBtn: {
    backgroundColor: "#f2f2f2",
    border: "1px solic #f2f2f2",
    color: "#333",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
  },
};

const styleAnimalSelected = {};
export default function CreateMessage({ childId }) {
  //!on submit will need to call multiple functions.  one needs to call on the badges to update thec count of messaged a child has.

  const [formData, setFormData] = useState({
    child_id_to: "",
    animal_id: "",
    text: "",
  });

  const animals = [
    {
      id: 1,
      src: "zebra.png",
      name: "Zebra",
    },
    {
      id: 2,
      src: "llama.png",
      name: "Llama",
    },
    {
      id: 3,
      src: "owl.png",
      name: "Owl",
    },
    {
      id: 4,
      src: "dove.png",
      name: "Dove",
    },
    {
      id: 5,
      src: "shark.png",
      name: "Shark",
    },
    {
      id: 6,
      src: "octopus.png",
      name: "Octopus",
    },
    {
      id: 7,
      src: "phoenix.png",
      name: "Phoenix",
    },
    {
      id: 8,
      src: "unicorn.png",
      name: "Unicorn",
    },
    {
      id: 9,
      src: "dragon.png",
      name: "Dragon",
    },
  ];

  let history = useHistory();

  const [messageData, setMessageData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(window.localStorage.getItem("childId"));
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get(`/api/profiles/child/${userId}`).then((response) => {
      //console.log("child profile ", response.data.childs[0]);
      const profile = response.data.childs[0];
      setUserProfile(profile);
    });
  }, []);

  useEffect(() => {
    if (childId) {
      setUserId(childId);
      window.localStorage.setItem("childId", childId);
    } else {
      setUserId(window.localStorage.getItem("childId"));
    }
    axios.get(`/api/profiles/child/${userId}`).then((response) => {
      // console.log("child profile ", response.data.childs[0]);
      const profile = response.data.childs[0];
      setUserProfile(profile);
    });
  }, []);

  const validateForm = () => {
    //console.log("child_id_to ", formData.child_id_to);
    //console.log("formData.text.length ", formData.text.length);
    if (
      !formData.child_id_to ||
      formData.child_id_to === "Pick a contact" ||
      !formData.text ||
      !formData.animal_id
    ) {
      console.log("form validation FALSE");
      return false;
    } else {
      console.log("form validation TRUE");
      return true;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("submit form", formData);

    if (!validateForm()) {
      setShowPopup(true);
    } else {
      sendMessage(formData);
    }
  };

  // :id needs to be changed after we have the login form
  const sendMessage = (formData) => {
    axios
      .post(`/api/messages/children/${userId}`, {
        child_id_to: formData.child_id_to,
        message: formData.text,
        animal_id: formData.animal_id,
      })
      .then(function (response) {
        const data = response.data.message[0];

        setMessageData(data);
        history.push("/message/sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getRandomPenPal = () => {
    axios
      .get(`/api/children/${userId}`)
      .then(function (response) {
        const length = response.data.childs.length;
        const randomId = Math.floor(Math.random() * length);

        setFormData({
          ...formData,
          child_id_to: response.data.childs[randomId].id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const togglePopup = () => {
    console.log("inside togglePopup func");
    setShowPopup(!showPopup);
  };

  const chooseAnimal = (animalId) => {
    console.log("chooseAnimal func ", animalId);
    setFormData({ ...formData, animal_id: animalId });
  };

  const isItemInSelection = (animalId) => {
    if (formData.animal_id === animalId) {
      return true;
    }
    return false;
  };

  // The function below is for the CustomDropdown component - just keeping it as a reference, we won't be using it
  // const getAnimalSelected = (animalId) => {
  //   setFormData({ ...formData, animal_id: animalId });
  // };

  return (
    <>
      <h2 class="welcomeOutBox">Compose A New Message</h2>

      {showPopup && (
        <Popup
          class="formWarning"
          text="Please fill out all the fields in the form"
          closePopup={togglePopup}
        />
      )}
      {!showPopup && (
        <Form onSubmit={submitHandler}>
          <Form.Group as={Row} controlId="selectPenPal.ControlSelect">
            <Row>
              <Form.Label column sm={2}>
                FROM:
              </Form.Label>
              <Form.Group>
                <Col>
                  {userProfile && (
                    <p class="welcomeOutBox">
                      {userProfile.username}, {userProfile.age},{" "}
                      {userProfile.location}
                    </p>
                  )}{" "}
                </Col>
              </Form.Group>
            </Row>

            <Row class="rowAlign">
              <div class="rowAlign">
                <Form.Label column sm={2}>
                  To:
                </Form.Label>
                <Form.Control
                  as="select"
                  value={formData.child_id_to}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      child_id_to: event.target.value,
                    })
                  }
                >
                  <option placeholder="Pick a contact">Pick a contact</option>
                  <option value="4">Ana, 8, Montreal</option>
                  <option value="1">Naz, 8, Istanbul</option>
                  <option value="2">Sam, 8, Phoenix</option>
                  <option value="3">Thomas, 8, Toronto</option>
                </Form.Control>
              </div>
            </Row>
            <div class="rowAlign">
              <Button
                class="FindNew"
                onClick={getRandomPenPal}
                style={{
                  color: "rgba(252, 176, 69, 1)",
                  background: "rgba(81, 78, 166, 1)",
                  fontWeight: "1000",
                }}
              >
                Find a new pen pal!
              </Button>
            </div>
          </Form.Group>
          <Form.Group as={Row} controlId="selectAnimal.ControlSelect">
            <Form.Label column sm={2}>
              Delivery Animal:
            </Form.Label>

            {/* <CustomDropdown
                title="Select an animal"
                items={animals}
                getAnimalSelected={getAnimalSelected}
              /> */}
          </Form.Group>
          <div class="aniContain">
            <ul class="selectAnimal">
              {animals.map((animal) => (
                <li key={animal.id} style={{ display: "inline" }}>
                  <button
                    class="delivery"
                    type="button"
                    onClick={() => chooseAnimal(animal.id)}
                  >
                    <img
                      src={animal.src}
                      style={{ width: "50px", height: "auto" }}
                    />
                    <p>{animal.name}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Form.Group as={Row} controlId="createMessage.ControlTextarea">
            <Form.Label column sm={2}>
              Your Message:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                rows={4}
                value={formData.text}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    text: event.target.value,
                  })
                }
              />
            </Col>
          </Form.Group>
          <h3 class="welcomeOutBox">Characters: {formData.text.length}</h3>
          {/* <Button variant="primary">Send Message</Button>{" "} */}
          <input class="FindNew" type="submit" value="Send Message" />
        </Form>
      )}

      {/* path might need to change if inbox pth changes */}
      <Link
        class="FindNew"
        to={{ pathname: `/inbox/children/${userId}` }}
        style={{ textDecoration: "none", height: "auto", margin: "10px" }}
      >
        Cancel
      </Link>
    </>
  );
}
