import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };
  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };
  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };

  // enterni bosilganda ham signup bo'lish mantiqi
  const handlePasswordKeyDown = (e: T) => {
    // signup
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  // signup request
  const handleSignupRequest = async () => {
    try {
      const isFulFill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";

      if (!isFulFill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      // Saving Authenticated User
      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose(); // authentication modal ni yopib beradi
      sweetErrorHandling(err).then();
      // backenddan kelgan meassage- alert => signup bo'lgan user ma'lumoti qayta yozilganda
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulFill = memberNick !== "" && memberPassword !== "";
      if (!isFulFill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      // Saving Authenticated User
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log("fashdiah", err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack
            className={classes.paper}
            direction={{ xs: "column", md: "row" }} // Mobilda ustma-ust, kattaroq ekranlarda yonma-yon
            sx={{
              width: { xs: "90vw", sm: "600px", md: "800px" },
              backgroundColor: "#7a8895",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <ModalImg
              src={"/img/authPhoto.webp"}
              alt="camera"
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                objectFit: "cover",
              }}
            />
            <Stack
              sx={{
                p: { xs: 2, sm: 4 },
                width: "100%",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>
                Signup Form
              </h2>
              <TextField
                sx={{ mt: 1, width: "100%" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                sx={{ my: 2, width: "100%" }}
                id="outlined-basic"
                label="phone number"
                variant="outlined"
                onChange={handlePhone}
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                sx={{ width: "100%" }}
              />
              <Fab
                sx={{
                  mt: 3,
                  width: { xs: "100%", sm: "120px" },
                  justifyContent: "center",
                  color: "white",
                }}
                variant="extended"
                color="primary"
                onChange={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            direction={{ xs: "column", md: "row" }}
            sx={{
              width: { xs: "90vw", sm: "600px", md: "700px" },
              backgroundColor: "#7a8895",
              borderRadius: 2,
              overflow: "hidden",
              mx: "auto", // center horizontally
              my: 4, // margin top/bottom
            }}
          >
            <ModalImg
              src={"/img/authPhoto.webp"}
              alt="camera"
              style={{
                width: "100%",
                maxWidth: "350px",
                height: "auto",
                objectFit: "cover",
              }}
            />
            <Stack
              sx={{
                p: { xs: 2, sm: 4 },
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>
                Login Form
              </h2>
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={handleUsername}
                sx={{ my: 1, width: "100%" }}
              />
              <TextField
                id={"outlined-basic"}
                label={"password"}
                variant={"outlined"}
                type={"password"}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                sx={{ my: 1, width: "100%" }}
              />
              <Fab
                sx={{
                  mt: 3,
                  width: { xs: "100%", sm: "120px", color: "white" },
                  justifyContent: "center",
                }}
                variant={"extended"}
                color={"primary"}
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
