import React, { useState, useEffect } from "react";

const NotificationComponent = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [tweetText, setTweetText] = useState("");

  // Check if the browser supports notifications
  const isNotificationSupported = "Notification" in window;

  // Request notification permission
  const requestNotificationPermission = () => {
    if (isNotificationSupported) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    } else {
      console.log("This browser does not support notifications.");
    }
  };

  // Check for keywords in the tweet
  const checkTweetForKeywords = (text) => {
    const keywords = ["cricket", "science"];
    return keywords.some((keyword) => text.toLowerCase().includes(keyword));
  };

  // Show notification if keywords are found
  const showNotification = (text) => {
    if (Notification.permission === "granted" && notificationsEnabled) {
      new Notification("New Tweet Alert!", {
        body: text, // Show the full tweet in the notification
        icon: "https://example.com/icon.png", // Optional: Add an icon
      });
    } else {
      console.log("Cannot show notification: Permission not granted or notifications disabled.");
    }
  };

  // Handle posting a tweet
  const handleTweetPost = () => {
    if (checkTweetForKeywords(tweetText)) {
      showNotification(tweetText);
    }
    setTweetText(""); // Clear the input
  };

  // Toggle notifications on/off
  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  // Automatically request permission when the component mounts
  useEffect(() => {
    if (isNotificationSupported && Notification.permission !== "granted") {
      console.log("Requesting notification permission...");
      requestNotificationPermission();
    }
  }, []);

  return (
    <div>
      <h2>Notification Feature</h2>

      {/* Request Notification Permission */}
      {isNotificationSupported && Notification.permission !== "granted" && (
        <button onClick={requestNotificationPermission}>
          Enable Notifications
        </button>
      )}

      {/* Tweet Input and Post Button */}
      <div>
        <textarea
          placeholder="Write your tweet..."
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
        />
        <button onClick={handleTweetPost}>Post Tweet</button>
      </div>

      {/* Toggle Notifications */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={toggleNotifications}
          />
          Enable Notifications
        </label>
      </div>
    </div>
  );
};

export default NotificationComponent;