// Settings.tsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : `/icons/default-user.svg`,
  );

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    },
  );

  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };
  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };
  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };
  const memberDescriptionHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const handleSubmit = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }
      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);
      await sweetTopSmallSuccessAlert("Modified Successfully", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    const fileType = file.type;
    const validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if (file) {
        memberUpdateInput.memberImage = file;
        setMemberUpdateInput({ ...memberUpdateInput });
        setMemberImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <Box className="settings">
      {/* Avatar upload */}
      <div className="settings-avatar-row">
        <div className="settings-avatar-wrap">
          <img src={memberImage} className="settings-avatar-img" alt="avatar" />
          <label className="settings-avatar-overlay" htmlFor="avatar-upload">
            <CloudUploadIcon style={{ fontSize: 22, color: "#fff" }} />
          </label>
          <input
            id="avatar-upload"
            type="file"
            hidden
            onChange={handleImageViewer}
          />
        </div>
        <div className="settings-avatar-info">
          <span className="sai-title">Profile Photo</span>
          <span className="sai-hint">JPG, JPEG or PNG · max 2MB</span>
          <Button
            component="label"
            className="sai-btn"
            onChange={handleImageViewer}
            startIcon={<CloudUploadIcon />}
          >
            Upload new photo
            <input type="file" hidden />
          </Button>
        </div>
      </div>

      {/* Username */}
      <div className="settings-field-group">
        <div className="settings-field full">
          <label className="sf-label">Username</label>
          <input
            className="sf-input"
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdateInput.memberNick ?? ""}
            name="memberNick"
            onChange={memberNickHandler}
          />
        </div>
      </div>

      {/* Phone + Address */}
      <div className="settings-field-group two-col">
        <div className="settings-field">
          <label className="sf-label">Phone</label>
          <input
            className="sf-input"
            type="text"
            placeholder={authMember?.memberPhone ?? "No phone"}
            value={memberUpdateInput.memberPhone ?? ""}
            name="memberPhone"
            onChange={(e) =>
              setMemberUpdateInput({
                ...memberUpdateInput,
                memberPhone: e.target.value,
              })
            }
          />
        </div>
        <div className="settings-field">
          <label className="sf-label">Address</label>
          <input
            className="sf-input"
            type="text"
            placeholder={authMember?.memberAddress ?? "No address"}
            value={memberUpdateInput.memberAddress ?? ""}
            name="memberAddress"
            onChange={(e) =>
              setMemberUpdateInput({
                ...memberUpdateInput,
                memberAddress: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* Description */}
      <div className="settings-field-group">
        <div className="settings-field full">
          <label className="sf-label">Description</label>
          <textarea
            className="sf-textarea"
            placeholder={
              authMember?.memberDesc ?? "Tell something about yourself..."
            }
            value={memberUpdateInput.memberDesc ?? ""}
            name="memberDesc"
            onChange={(e) =>
              setMemberUpdateInput({
                ...memberUpdateInput,
                memberDesc: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* Save */}
      <div className="settings-save-row">
        <Button className="settings-save-btn" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </Box>
  );
}
