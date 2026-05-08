import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "@mui/material/Tabs";
import { terms } from "../../../lib/data/terms";
import { faq } from "../../../lib/data/faq";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const S = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "#07091a",
    fontFamily: "'DM Sans', sans-serif",
  } as React.CSSProperties,

  // Hero
  hero: {
    position: "relative" as const,
    width: "100%",
    height: "180px",
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
  } as React.CSSProperties,

  heroBg: {
    position: "absolute" as const,
    inset: 0,
    background: "radial-gradient(ellipse at 70% 50%, #1e1060 0%, #07091a 65%)",
    zIndex: 0,
  } as React.CSSProperties,

  heroBlob1: {
    position: "absolute" as const,
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "#7c3aed",
    top: "-160px",
    right: "-60px",
    opacity: 0.13,
    filter: "blur(70px)",
    pointerEvents: "none" as const,
  } as React.CSSProperties,

  heroBlob2: {
    position: "absolute" as const,
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "#06b6d4",
    bottom: "-80px",
    left: "25%",
    opacity: 0.07,
    filter: "blur(60px)",
    pointerEvents: "none" as const,
  } as React.CSSProperties,

  heroContent: {
    position: "relative" as const,
    zIndex: 1,
    paddingBottom: "28px",
  } as React.CSSProperties,

  heroEyebrow: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "12px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    color: "rgba(167,139,250,0.7)",
    display: "block",
    marginBottom: "6px",
  } as React.CSSProperties,

  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "38px",
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 4px",
    lineHeight: 1.1,
  } as React.CSSProperties,

  heroSub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    color: "rgba(255,255,255,0.35)",
    margin: 0,
  } as React.CSSProperties,

  // Body
  body: {
    padding: "36px 0 80px",
  } as React.CSSProperties,

  // Tabs wrap
  tabsWrap: {
    marginBottom: "32px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "6px",
    display: "inline-flex",
  } as React.CSSProperties,

  // Content panel
  panel: {
    padding: 0,
  } as React.CSSProperties,

  // Terms
  termsBox: {
    background: "#0f1130",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "28px 32px",
    maxHeight: "520px",
    overflowY: "auto" as const,
  } as React.CSSProperties,

  termsPara: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.8,
    marginBottom: "14px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    paddingBottom: "14px",
  } as React.CSSProperties,

  // FAQ accordion
  accordion: {
    background: "#0f1130",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px !important",
    marginBottom: "10px",
    boxShadow: "none",
    "&:before": { display: "none" },
    overflow: "hidden",
  },

  accordionSummaryText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    color: "rgba(255,255,255,0.8)",
  } as React.CSSProperties,

  accordionDetailText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.7,
  } as React.CSSProperties,

  // Contact
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  } as React.CSSProperties,

  contactInfoCard: {
    background: "#0f1130",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  } as React.CSSProperties,

  contactTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "6px",
  } as React.CSSProperties,

  contactSubtitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.35)",
    marginBottom: "4px",
  } as React.CSSProperties,

  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.55)",
  } as React.CSSProperties,

  infoIconWrap: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "rgba(167,139,250,0.12)",
    border: "1px solid rgba(167,139,250,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: "#a78bfa",
  } as React.CSSProperties,

  formCard: {
    background: "#0f1130",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  } as React.CSSProperties,

  formTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "2px",
  } as React.CSSProperties,

  formSub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.35)",
    marginBottom: "8px",
  } as React.CSSProperties,

  fieldLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    display: "block",
    marginBottom: "6px",
  } as React.CSSProperties,

  fieldInput: {
    width: "100%",
    height: "46px",
    padding: "0 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.8)",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
  } as React.CSSProperties,

  fieldTextarea: {
    width: "100%",
    height: "110px",
    padding: "12px 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.8)",
    outline: "none",
    resize: "vertical" as const,
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  sendBtn: {
    background: "linear-gradient(135deg, #7c3aed, #a78bfa)" as const,
    color: "#fff",
    borderRadius: "10px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    padding: "9px 24px",
    textTransform: "none" as const,
    boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
    transition: "all 0.2s ease",
    alignSelf: "flex-end" as const,
  } as React.CSSProperties,
};

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div style={S.page}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      {/* Hero */}
      <div style={S.hero}>
        <div style={S.heroBg} />
        <div style={S.heroBlob1} />
        <div style={S.heroBlob2} />
        <Container>
          <div style={S.heroContent}>
            <span style={S.heroEyebrow}>💬 Support</span>
            <h1 style={S.heroTitle}>Help Center</h1>
            <p style={S.heroSub}>Terms, FAQ and contact — all in one place</p>
          </div>
        </Container>
      </div>

      {/* Body */}
      <div style={S.body}>
        <Container>
          <TabContext value={value}>
            {/* Tabs */}
            <div style={S.tabsWrap}>
              <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{ style: { display: "none" } }}
                sx={{ minHeight: "auto" }}
              >
                {[
                  { val: "1", icon: "📄", label: "Terms" },
                  { val: "2", icon: "❓", label: "FAQ" },
                  { val: "3", icon: "✉️", label: "Contact" },
                ].map((tab) => (
                  <Tab
                    key={tab.val}
                    value={tab.val}
                    label={
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          fontWeight: 500,
                          textTransform: "none",
                        }}
                      >
                        {tab.icon} {tab.label}
                      </span>
                    }
                    sx={{
                      color: "rgba(255,255,255,0.4)",
                      borderRadius: "10px",
                      padding: "7px 18px",
                      minHeight: "40px",
                      transition: "all 0.2s",
                      "&.Mui-selected": {
                        background: "rgba(167,139,250,0.15)",
                        color: "#a78bfa",
                        border: "1px solid rgba(167,139,250,0.3)",
                      },
                    }}
                  />
                ))}
              </Tabs>
            </div>

            {/* ---- TERMS ---- */}
            <TabPanel value="1" sx={{ padding: 0 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div style={S.termsBox}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "20px",
                      paddingBottom: "16px",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>📋</span>
                    <div>
                      <h2
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "20px",
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        Terms & Conditions
                      </h2>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.3)",
                          margin: 0,
                        }}
                      >
                        Please read carefully before using our service
                      </p>
                    </div>
                  </div>
                  {terms.map((text, i) => (
                    <p key={i} style={S.termsPara}>
                      <span
                        style={{
                          color: "rgba(167,139,250,0.6)",
                          fontWeight: 600,
                          marginRight: "8px",
                          fontSize: "12px",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      {text}
                    </p>
                  ))}
                </div>
              </motion.div>
            </TabPanel>

            {/* ---- FAQ ---- */}
            <TabPanel value="2" sx={{ padding: 0 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>❓</span>
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "20px",
                        color: "#fff",
                        margin: 0,
                      }}
                    >
                      Frequently Asked Questions
                    </h2>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.3)",
                        margin: 0,
                      }}
                    >
                      Find answers to common questions below
                    </p>
                  </div>
                </div>

                {faq.map((item, i) => (
                  <Accordion
                    key={i}
                    disableGutters
                    sx={{
                      background: "#0f1130",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "12px !important",
                      marginBottom: "10px",
                      boxShadow: "none",
                      "&:before": { display: "none" },
                      "&.Mui-expanded": {
                        border: "1px solid rgba(167,139,250,0.25)",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{ color: "rgba(167,139,250,0.7)", fontSize: 20 }}
                        />
                      }
                      sx={{
                        padding: "0 20px",
                        minHeight: "52px",
                        "& .MuiAccordionSummary-content": { margin: "14px 0" },
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "6px",
                            background: "rgba(167,139,250,0.12)",
                            border: "1px solid rgba(167,139,250,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "11px",
                            color: "#a78bfa",
                            fontWeight: 600,
                            flexShrink: 0,
                          }}
                        >
                          Q
                        </span>
                        <Typography style={S.accordionSummaryText}>
                          {item.question}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        padding: "0 20px 16px 52px",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <Typography style={S.accordionDetailText}>
                        {item.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </motion.div>
            </TabPanel>

            {/* ---- CONTACT ---- */}
            <TabPanel value="3" sx={{ padding: 0 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div style={S.contactGrid}>
                  {/* Info card */}
                  <div style={S.contactInfoCard}>
                    <div>
                      <h2 style={S.contactTitle}>Get in touch</h2>
                      <p style={S.contactSubtitle}>
                        We're here to help. Reach out anytime.
                      </p>
                    </div>

                    {[
                      {
                        icon: <PhoneIcon sx={{ fontSize: 16 }} />,
                        label: "Phone",
                        val: "010 7730 7215",
                      },
                      {
                        icon: <EmailIcon sx={{ fontSize: 16 }} />,
                        label: "Email",
                        val: "khusan7700@gmail.com",
                      },
                      {
                        icon: <LocationOnIcon sx={{ fontSize: 16 }} />,
                        label: "Address",
                        val: "Seoul, South Korea",
                      },
                      {
                        icon: <AccessTimeIcon sx={{ fontSize: 16 }} />,
                        label: "Hours",
                        val: "Mon–Sun · 10:00 AM – 11:00 PM",
                      },
                    ].map((row, i) => (
                      <div key={i} style={S.infoRow}>
                        <div style={S.infoIconWrap}>{row.icon}</div>
                        <div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "rgba(255,255,255,0.3)",
                              letterSpacing: "0.5px",
                              textTransform: "uppercase",
                              marginBottom: "2px",
                            }}
                          >
                            {row.label}
                          </div>
                          <div
                            style={{
                              color: "rgba(255,255,255,0.65)",
                              fontSize: "13px",
                            }}
                          >
                            {row.val}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Decorative divider */}
                    <div
                      style={{
                        marginTop: "8px",
                        padding: "16px",
                        background: "rgba(167,139,250,0.06)",
                        border: "1px solid rgba(167,139,250,0.12)",
                        borderRadius: "10px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.6,
                      }}
                    >
                      💡 Average response time is under{" "}
                      <span style={{ color: "#a78bfa" }}>2 hours</span> during
                      business hours.
                    </div>
                  </div>

                  {/* Form card */}
                  <form
                    action="#"
                    method="POST"
                    style={S.formCard}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div>
                      <h2 style={S.formTitle}>Send a message</h2>
                      <p style={S.formSub}>
                        Fill out the form and we'll get back to you
                      </p>
                    </div>

                    <div>
                      <label style={S.fieldLabel}>Your name</label>
                      <input
                        type="text"
                        name="memberNick"
                        placeholder="Type your name here"
                        style={S.fieldInput}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(167,139,250,0.5)";
                          e.target.style.background = "rgba(167,139,250,0.06)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255,255,255,0.1)";
                          e.target.style.background = "rgba(255,255,255,0.05)";
                        }}
                      />
                    </div>

                    <div>
                      <label style={S.fieldLabel}>Your email</label>
                      <input
                        type="email"
                        name="memberEmail"
                        placeholder="Type your email here"
                        style={S.fieldInput}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(167,139,250,0.5)";
                          e.target.style.background = "rgba(167,139,250,0.06)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255,255,255,0.1)";
                          e.target.style.background = "rgba(255,255,255,0.05)";
                        }}
                      />
                    </div>

                    <div>
                      <label style={S.fieldLabel}>Message</label>
                      <textarea
                        name="memberMsg"
                        placeholder="Tell us how we can help you..."
                        style={S.fieldTextarea}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(167,139,250,0.5)";
                          e.target.style.background = "rgba(167,139,250,0.06)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255,255,255,0.1)";
                          e.target.style.background = "rgba(255,255,255,0.05)";
                        }}
                      />
                    </div>

                    <Button
                      type="submit"
                      sx={{
                        ...S.sendBtn,
                        "&:hover": {
                          transform: "translateY(-1px)",
                          boxShadow: "0 8px 24px rgba(124,58,237,0.45)",
                          background:
                            "linear-gradient(135deg, #6d28d9, #a78bfa)",
                        },
                      }}
                    >
                      Send Message →
                    </Button>
                  </form>
                </div>
              </motion.div>
            </TabPanel>
          </TabContext>
        </Container>
      </div>
    </div>
  );
}
