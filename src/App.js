import React, { useState } from "react";
import "./App.css";
import { PushNotifications } from "@capacitor/push-notifications";
import { LocalNotifications } from "@capacitor/local-notifications";
import { useEffect } from "react";
import Viewer from "./Viewer/Viewer";

function App() {
  const [notificationData, setNotificationData] = useState(null);

  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === "prompt") {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== "granted") {
      throw new Error("User denied permissions!");
    }
    await PushNotifications.register();
  };

  const addListeners = async () => {
    await PushNotifications.addListener("registration", (token) => {
      console.info("Registration token: ", token.value);
    });

    await PushNotifications.addListener("registrationError", (err) => {
      console.error("Registration error: ", err.error);
    });

    await PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
  
        console.log("Push notification received: ", notification.data);
      }
    );
    await PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        setNotificationData(notification.notification.data.body);
        console.log("Push action performed: " + JSON.stringify(notification));
        console.log(
          "Push notification action performed",
          notification.actionId,
          notification.inputValue,
          notification.notification.data
        );
      }
    );
  };

  useEffect(() => {
    registerNotifications();
    addListeners();
  }, []);

  function onComplete(result) {
    console.log("result on Complete", result);
  }

  function onValueChanged(result) {
    console.log("result on value changed", result);
  }

  return (
    <div className="App">
      <h1> Push Notifications</h1>
      {notificationData ? (
        <Viewer
          data={notificationData}
          onComplete={onComplete}
          onValueChanged={onValueChanged}
        />
      ) : (
        " "
      )}
    </div>
  );
}

export default App;
