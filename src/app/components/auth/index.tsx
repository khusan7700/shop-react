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
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
    padding: 0,
  },
}));

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.65);
`;

const textFieldSx = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "10px",
    color: "rgba(255,255,255,0.85)",
    fontFamily: "'DM Sans', sans-serif",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(167,139,250,0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(167,139,250,0.6)",
      boxShadow: "0 0 0 3px rgba(167,139,250,0.1)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.35)",
    fontFamily: "'DM Sans', sans-serif",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#a78bfa",
  },
};

const fabSx = {
  width: "100%",
  height: "48px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
  boxShadow: "0 6px 24px rgba(124,58,237,0.4)",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  color: "#fff",
  justifyContent: "center",
  "&:hover": {
    background: "linear-gradient(135deg, #6d28d9, #a78bfa)",
    boxShadow: "0 10px 32px rgba(124,58,237,0.55)",
    transform: "translateY(-1px)",
  },
};

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

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

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

      setAuthMember(result);
      handleSignupClose();
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully signed up!",
        html: `You can <span style="color: #ef4444; font-weight: 600;">login now</span>.`,
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
      handleSignupClose();
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
      {/* ======= SIGNUP MODAL ======= */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={signupOpen}>
          <Stack
            className={classes.paper}
            direction={{ xs: "column", md: "row" }}
            sx={{
              width: { xs: "90vw", sm: "600px", md: "800px" },
              minHeight: { md: "460px" },
              backgroundColor: "#0f1130",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            {/* Left image */}
            <Stack
              sx={{
                width: { xs: "100%", md: "340px" },
                minHeight: { xs: "180px", md: "auto" },
                flexShrink: 0,
                position: "relative",
              }}
            >
              <ModalImg src={"/img/authPhoto.webp"} alt="camera" />
              <Stack
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.55) 0%, rgba(7,9,26,0.35) 100%)",
                }}
              />
              <Stack
                sx={{
                  position: "absolute",
                  bottom: "24px",
                  left: "22px",
                  right: "22px",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  ✍️ New account
                </span>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  Halal
                  <em style={{ fontStyle: "italic", color: "#a78bfa" }}>
                    Station
                  </em>
                </h2>
              </Stack>
            </Stack>

            {/* Right form */}
            <Stack
              sx={{
                p: { xs: 3, sm: "36px 32px" },
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(167,139,250,0.7)",
                  alignSelf: "flex-start",
                  marginBottom: "4px",
                }}
              >
                🍽️ Restaurant Portal
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 4px",
                  alignSelf: "flex-start",
                }}
              >
                Create Account
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.28)",
                  margin: "0 0 20px",
                  alignSelf: "flex-start",
                }}
              >
                Join us and start ordering today
              </p>

              <TextField
                sx={{ mb: 1.5, ...textFieldSx }}
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                sx={{ mb: 1.5, ...textFieldSx }}
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
                sx={{ mb: 2, ...textFieldSx }}
              />
              <Fab
                sx={fabSx}
                variant="extended"
                color="primary"
                onClick={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      {/* ======= LOGIN MODAL ======= */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            direction={{ xs: "column", md: "row" }}
            sx={{
              width: { xs: "90vw", sm: "600px", md: "700px" },
              minHeight: { md: "420px" },
              backgroundColor: "#0f1130",
              borderRadius: "20px",
              overflow: "hidden",
              mx: "auto",
              my: 4,
            }}
          >
            {/* Left image */}
            <Stack
              sx={{
                width: { xs: "100%", md: "300px" },
                minHeight: { xs: "160px", md: "auto" },
                flexShrink: 0,
                position: "relative",
              }}
            >
              <ModalImg src={"/img/authPhoto.webp"} alt="camera" />
              <Stack
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.55) 0%, rgba(7,9,26,0.35) 100%)",
                }}
              />
              <Stack
                sx={{
                  position: "absolute",
                  bottom: "24px",
                  left: "22px",
                  right: "22px",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  🔐 Welcome back
                </span>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  Halal
                  <em style={{ fontStyle: "italic", color: "#a78bfa" }}>
                    Station
                  </em>
                </h2>
              </Stack>
            </Stack>

            {/* Right form */}
            <Stack
              sx={{
                p: { xs: 3, sm: "36px 32px" },
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(167,139,250,0.7)",
                  alignSelf: "flex-start",
                  marginBottom: "4px",
                }}
              >
                🍽️ Restaurant Portal
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 4px",
                  alignSelf: "flex-start",
                }}
              >
                Sign In
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.28)",
                  margin: "0 0 20px",
                  alignSelf: "flex-start",
                }}
              >
                Enter your credentials to continue
              </p>

              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={handleUsername}
                sx={{ mb: 1.5, ...textFieldSx }}
              />
              <TextField
                id={"outlined-basic"}
                label={"password"}
                variant={"outlined"}
                type={"password"}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                sx={{ mb: 2, ...textFieldSx }}
              />
              <Fab
                sx={fabSx}
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
