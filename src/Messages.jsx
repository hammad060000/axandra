/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const Messages = () => {
  const [users, setUsers] = useState([]);

  // Function to get real-time users
  const getUsersRealtime = () => {
    const usersRef = collection(db, "messages");
    onSnapshot(usersRef, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      console.log("Real-time users: ", users);
    });
  };

  useEffect(() => {
    getUsersRealtime();
  }, []);
console.log(users,'usersAHDSJA')
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Users and Messages</h1>

      <div className="dashboard-card mt-4">
        <h3 className="dashboard-subtitle">Users List:</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users?.map((user) => (
                <tr key={user?.id}>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.username}</td>
                  <td>{user?.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-projects">
                  No Messages available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
