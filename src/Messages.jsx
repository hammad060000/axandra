/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import TopButtons from "./component/TopButtons";

const Messages = () => {
  const [users, setUsers] = useState([]);

  const getUsersRealtime = () => {
    const usersRef = collection(db, "messages");
    onSnapshot(usersRef, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      console.log("Real-time users: ", users);
    });
  };

  const deleteUser = async (id) => {
    try {
      const userDocRef = doc(db, "messages", id);
      await deleteDoc(userDocRef);
      console.log(`User with ID ${id} deleted.`);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  useEffect(() => {
    getUsersRealtime();
  }, []);

  return (
    <div className="dashboard-container">
      <TopButtons />
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
              <th>Action</th>
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
                  <td>
                    <button
                      onClick={() => deleteUser(user?.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-projects">
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
