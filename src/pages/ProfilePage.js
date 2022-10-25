import Bio from "../components/profile/Bio";
import TabBar from "../components/TabBar";
import Informatio from "../components/profile/Informatio";
import ReviewCard from "../components/ReviewCard";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const { user, updateUser, getProfileImages } = useAuth();
  const [input, setInput] = useState({});

  useEffect(() => {
    setInput((p) => {
      return {
        penName: user?.penName || user?.firstName,
        description: user?.description,
        rate: user?.rate,
        gender: user?.gender,
        sexuallyInterested: user?.sexuallyInterested,
        language: user?.language,
        hobby: user?.hobby,
        lat: user?.lat,
        lng: user?.lng
      };
    });
  }, [user]);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleClickSave = async (e) => {
    try {
      await updateUser(input, user.id);
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Bio
        toggleEditing={toggleEditing}
        isEditing={isEditing}
        user={user}
        handleChangeInput={handleChangeInput}
        input={input}
        getProfileImages={getProfileImages}
      />
      <div className="w-[100vw] h-[650px] px-60">
        <TabBar />
        <div className="flex flex-row gap-10">
          <Informatio
            isEditing={isEditing}
            handleChangeInput={handleChangeInput}
            input={input}
            user={user}
          />
          <div className="flex flex-col   h-[650px]">
            <div className="flex flex-col gap-[10px]">
              <div className="text-[20px] text-[#224957] font-medium">
                My reviews (150)
              </div>
              <input
                className="w-[375px] h-[30px] rounded-[20px] border-2 border-[#9AC0B5] pl-[20px] placeholder-[#C4C4C4]"
                placeholder="Search here..."
              />
              <div className="flex flex-row flex-wrap gap-10">
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
              </div>

              {isEditing ? (
                <div
                  className="mx-auto mt-20 flex flex-row justify-center items-center bg-[#9AC0B5] text-white font-bold rounded-[20px] w-[140px] h-[60px]"
                  onClick={handleClickSave}
                >
                  Save
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
