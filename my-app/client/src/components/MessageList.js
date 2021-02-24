import axios from "axios";
import MessageListItem from "./MessageListItem";
import { useState, useEffect } from "react";

export default function MessageList({ messages, childId }) {
  const [userId, setUserId] = useState(window.localStorage.getItem("childId"));
  const [filteredSender, setFilteredSender] = useState(null);
  const [listOfPenPals, setListOfPenPals] = useState([]);

  const filteredMessages = messages.filter((message) => {
    if (!filteredSender) {
      return message;
    }
    return message.sender_name === filteredSender;
  });

  useEffect(() => {
    if (childId) {
      setUserId(childId);
      window.localStorage.setItem("childId", childId);
    } else {
      setUserId(window.localStorage.getItem("childId"));
    }
    axios.get(`/api/children/penpal/${userId}`).then((response) => {
      const penpalData = response.data.penpals;
      setListOfPenPals(penpalData);
      console.log("PENPAL DATA >>>>> ", penpalData);
    });
  }, []);

  const allMessages =
    filteredMessages &&
    filteredMessages.map((message) => {
      if (message && !message.is_received) {
        return null;
      }
      return (
        <MessageListItem
          key={message.message_id}
          id={message.message_id}
          senderName={message.sender_name}
          senderAge={message.sender_age}
          senderLocation={message.sender_location_name}
          dateReceived={new Date(message.datetime_receiving).toLocaleString()}
          animalAvatar={message.animal_avatar}
          message={message.message}
          senderAvatar={message.sender_avatar}
        />
      );
    });

  const allPenPals = listOfPenPals.map((penpal) => {
    return <option value={penpal.sender_name}> {penpal.sender_name}</option>;
  });

  return (
    <>
      <section>
        <select
          class="logButton"
          onChange={(e) => setFilteredSender(e.target.value)}
        >
          <option> Choose Pen Pal </option>
          {allPenPals}
        </select>

        <ul>{allMessages}</ul>
      </section>
    </>
  );
}
