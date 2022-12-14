import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateFormat, { masks } from "dateformat";
import {
  faEnvelope,
  faAddressCard,
  faPhone,
  faDollar,
  faCheck,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import GoogleMapContainer from "../GoogleMapContainer";
import { useParams } from "react-router-dom";
// import {
//   faSquareFacebook,
//   faSquareInstagram
// } from "@fortawesome/free-brands-svg-icons";

function Informatio({ handleChangeInput, input, setInput, profiles }) {
  const { isEditing, user } = useAuth();
  // console.log( setInput);
  const { id } = useParams();
  console.log(profiles[0]?.id);
  console.log("user", user);
  console.log("profiles", profiles);
  if (!user || !profiles[0]) {
    return null;
  }

  const joinDate = new Date(
    user?.id == id ? user?.createdAt : profiles[0]?.createdAt
  );
  const fullDate = dateFormat(joinDate || "02/02/22", " d mmmm yyyy ");
  const birthDate = new Date(
    user?.id == id ? user?.birthDate : profiles[0]?.birthDate
  );
  const fullBirthDate = dateFormat(birthDate || "02/02/32", " d mmmm yyyy ");

  // console.log("user", user);
  return (
    <div className="flex flex-col w-[350px] h-[900px] gap-[12px] text-[#224957]">
      <div className="flex flex-row justify-center items-center w-[350px] h-[150px] border-2 border-[#224957] rounded-[10px]">
        <div className="flex flex-col w-[90%] h-[90%] gap-[10px]">
          <div className="text-[20px] font-medium">Information</div>
          <div className="flex flex-row justify-between text-sm">
            <div>Join</div>
            <div>{fullDate}</div>
          </div>
          <div className="flex flex-row justify-between text-sm">
            <div>Work Sold</div>
            <div>150 Times</div>
          </div>
          <div className="flex flex-row justify-between text-sm">
            <div>Success Rate</div>
            <div>99%</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center w-[350px] h-[90px] border-2 border-[#224957] rounded-[10px]">
        <div className="flex flex-col w-[90%] h-[90%] gap-[10px]">
          <div className="text-[20px] font-medium">Verified</div>
          <div className="flex flex-row justify-start gap-[15px]">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-[#809590] text-[25px]"
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faAddressCard}
              className="text-[#809590] text-[25px]"
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faPhone}
              className="text-[#809590] text-[25px]"
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faMoneyCheckDollar}
              className="text-[#809590] text-[25px]"
            ></FontAwesomeIcon>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center w-[350px] h-[150px] border-2 border-[#224957] rounded-[10px]">
        <div className="flex flex-col w-[90%] h-[90%] gap-[10px]">
          <div className="text-[20px] font-medium">Personal Details</div>
          <div className="flex flex-row justify-between text-sm">
            <div>Date of birth:</div>
            <div>{fullBirthDate}</div>
          </div>
          <div className="flex flex-row justify-between text-sm">
            <div>Gender:</div>

            {isEditing ? (
              <select
                className="text-[#809590] w-28 text-right border-2 border-[#809590] rounded-xl"
                onChange={handleChangeInput}
                name="gender"
                value={input?.gender}
              >
                <option value="NOT_SPECIFIC">Not specific</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
            ) : (
              <div>{user?.id == id ? user?.gender : profiles[0]?.gender}</div>
            )}
          </div>
          <div className="flex flex-row justify-between text-sm">
            <div>Interest:</div>
            {isEditing ? (
              <select
                className="text-[#809590] w-28 text-right border-2 border-[#809590] rounded-xl"
                onChange={handleChangeInput}
                name="sexuallyInterested"
                value={input?.sexuallyInterested}
              >
                <option value="NOT_SPECIFIC">Not specific</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
            ) : (
              <div>
                {" "}
                {user?.id == id
                  ? user?.sexuallyInterested
                  : profiles[0]?.sexuallyInterested}
              </div>
            )}
          </div>
        </div>
      </div>
      {user.id == id && (
        <div className="flex flex-row justify-center items-center w-[350px]  border-2 border-[#224957] rounded-[10px]">
          <div className="flex flex-col w-[90%] h-[90%] gap-[10px]">
            <div className="text-[20px] font-medium">Location</div>
            <div
              className={`flex flex-col ${
                isEditing ? "h-60" : "h-20"
              }   gap-[15px] text-sm`}
            >
              {!isEditing ? (
                <div>
                  {user?.id == id
                    ? user?.location
                    : profiles[0]?.location || "-"}
                </div>
              ) : (
                <GoogleMapContainer
                  setInput={setInput}
                  input={input}
                  profiles={profiles}
                />
              )}
              {/* {isEditing ? (
              <input
                className="text-[#224957] w-80  border-2 border-[#809590] rounded-xl"
                type="text"
                name="lat"
                value={input?.lat}
                onChange={handleChangeInput}
              ></input>
            ) : (
              <div>{user?.lat}</div>
            )} */}
            </div>
            {/* <div className="flex flex-row justify-start gap-[15px] text-sm">
            {isEditing ? (
              <input
                className="text-[#224957] w-80  border-2 border-[#809590] rounded-xl"
                type="text"
                name="lng"
                value={input?.lng}
                onChange={handleChangeInput}
              ></input>
            ) : (
              <div>{user?.lng}</div>
            )}
          </div> */}
          </div>
        </div>
      )}
      <div className="flex flex-row justify-center items-center w-[350px] h-[90px] border-2 border-[#224957] rounded-[10px]">
        <div className="flex flex-col w-[90%] h-[90%] gap-[10px]">
          <div className="text-[20px] font-medium">Language</div>
          <div className="flex flex-row justify-start gap-[15px] text-sm">
            {isEditing ? (
              <input
                className="text-[#224957] w-80  border-2 border-[#809590] rounded-xl"
                type="text"
                name="language"
                value={input?.language}
                onChange={handleChangeInput}
              ></input>
            ) : (
              <div>
                {" "}
                {user?.id == id ? user?.language : profiles[0]?.language || "-"}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center w-[350px] h-[90px] border-2 border-[#224957] rounded-[10px]">
        <div className="flex flex-col w-[90%] h-[90%] gap-[10px]">
          <div className="text-[20px] font-medium">Hobby</div>
          <div className="flex flex-row justify-start gap-[15px] text-sm">
            {isEditing ? (
              <input
                className="text-[#224957] w-80  border-2 border-[#809590] rounded-xl"
                type="text"
                name="hobby"
                value={input?.hobby}
                onChange={handleChangeInput}
              ></input>
            ) : (
              <div>
                {user?.id == id ? user?.hobby : profiles[0]?.hobby || "-"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informatio;
