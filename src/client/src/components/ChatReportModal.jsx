import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Select, MenuItem, FormControl, Button } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ sender, receiver, open, onClose, message, callbackModal }) {

  const { t, i18n } = useTranslation();

  const [reportData, setReportData] = useState({
    sender: sender,
    receiver: receiver,
    message: message,
    justification: "",
  });

  useEffect(() => {
    setReportData({...reportData, message: message})
  },[message])

  const closeButtonClickHandler = () => {
    callbackModal();
  }

  const handleSendReport = async () => {
    console.log(reportData);
    await axios.post(
      `http://localhost:9000/reports/create`,
      {
        sender: reportData.sender,
        receiver: reportData.receiver,
        reportedDM: reportData.message,
        justification: reportData.justification
      })
      .then((response) => {
        console.log(response.data);
        swal(t("Success!"),t("Successfully Submitted a Report!"),"success",{
          button:false,
          timer:2000
        });
        closeButtonClickHandler();
      })
      .catch((error) => {
        console.log(error);
        swal(t("Failed!"),t("Failed to Submit a Report!"),"error",{
          button:false,
          timer:2000
        });
      });
  }

  return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("Chat Report")}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {t("You're about to report this user for saying:")} {message}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {t("What's wrong with this message?")}
          </Typography>
          <FormControl fullWidth sx={{paddingTop: "10px", marginBottom: "20px"}}>
            <Select data-testid="select" onChange={(selected) => setReportData({...reportData, justification: selected.target.value})}>
              <MenuItem value="Hate Speech">{t("Hate Speech")}</MenuItem>
              <MenuItem value="Scam/Fraud">{t("Scam or Fraud")}</MenuItem>
              <MenuItem value="Bullying/Harassment">{t("Bullying or Harrassment")}</MenuItem>
              <MenuItem value="Spam">{t("Spam")}</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleSendReport} variant="contained" fullWidth color="error">{t("Send Report")}</Button>
        </Box>
      </Modal>
  );
}