import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
let OnceClickHandler = false;
const Profile = () => {
  const profileName = useRef();
  const photoUrl = useRef();

  const UID = localStorage.getItem("UID");

  function FormHandler(event) {
    event.preventDefault();
    console.log(profileName.current.value);
    console.log(photoUrl.current.value);
    console.log(localStorage.getItem("idToken"));
    let url;
    let METHOD;
    console.log(OnceClickHandler);

    if (OnceClickHandler) {
      url = `https://expenses-tracker-2f825-default-rtdb.firebaseio.com//users/${UID}/${UID}/expenses/${localStorage.getItem(
        "profileKey"
      )}.json`;
      METHOD = "PUT";
    } else {
      url = `https://expenses-tracker-2f825-default-rtdb.firebaseio.com//users/${UID}/profile.json`;
      METHOD = "POST";
    }

    OnceClickHandler = true;

    async function UPF() {
      try {
        const response = await fetch(url, {
          method: METHOD,
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            idToken: localStorage.getItem("idToken"),
            displayName: profileName.current.value,
            photoUrl: photoUrl.current.value,
            returnSecureToken: false,
          }),
        });
        if (!response.ok) {
          throw new Error("profile not updated ");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("we got some error" + error);
      }
    }

    UPF();
  }

  useEffect(() => {
    async function getProfileData() {
      try {
        const response = await fetch(
          `https://expenses-tracker-2f825-default-rtdb.firebaseio.com//users/${UID}/profile.json`
        );

        if (!response.ok) {
          throw new Error("!!!!");
        }
        const data = await response.json();
        console.log(data);
        console.log(data);
        console.log(Object.keys(data));
        localStorage.setItem("profileKey", Object.keys(data));
        console.log(Object.values(data)[0].displayName);
        console.log(Object.values(data)[0].photoUrl);

        profileName.current.value = Object.values(data)[0].displayName;
        photoUrl.current.value = Object.values(data)[0].photoUrl;
      } catch (error) {
        console.error("we got failed to get data" + error);
      }
    }

    getProfileData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between border-bottom my-1 align-items-center">
        <p className="fw-medium ">Winner Never quite,Quiters never wins.</p>
        <p style={{ width: "30%" }} className="text-uppercase fw-medium">
          your profile is 64% complete. A complete Profile has higher changes of
          landing a job <Link to="/profile">Complete Now</Link>
        </p>
      </div>
      <form
        onSubmit={FormHandler}
        className="border border-1 w-75 rounded-2 float-end fw-medium p-2"
        style={{ backgroundColor: "#cac2c1" }}
      >
        <div className="d-flex justify-content-between ">
          <p>Contact Details</p>
          <p>
            <button className="btn btn-info">
              <Link to="/">cancel</Link>
            </button>
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p>
            <span></span>
            <span>full Name</span>
            <input
              ref={profileName}
              type="text"
              className="rounded-2 m-1 "
              name="ashoka"
            ></input>
          </p>
          <p>
            <span></span>
            <span>profile photo url</span>
            <input ref={photoUrl} type="url" className="rounded-2 m-1"></input>
          </p>
        </div>
        <div>
          <button className="btn btn-info" type="submit">
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default Profile;
