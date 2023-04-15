const Messages = require("../models/message");
const multer = require("multer");

const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      const messageBody = {
        fromSelf: msg.sender && msg.sender.toString() === from,
        message: msg.text,
      };

      if (msg.attachment) {
        // const attachmentData = msg.attachment.buffer;
        // const base64Data = attachmentData.toString("base64");

        // messageBody.attachment = {
        //     data: base64Data,
        // };

        const downloadLink = `${req.protocol}://${req.headers.host}/messages/download/${msg.attachment.filename}`;

        messageBody.downloadLink = downloadLink;
      }

      return messageBody;
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const addMessages = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { from, to, message } = req.body;

      let attachmentUrl = null;
      let filename = null;
      let downloadLink = null;
      if (req.file) {
        attachmentUrl = `uploads/${req.file.filename}`;
        filename = req.file.filename;
        downloadLink = `${req.protocol}://${req.headers.host}/messages/download/${req.file.filename}`;
      }

      const response = await Messages.create({
        text: message,
        attachment: {
          url: attachmentUrl,
          filename: filename,
        },
        users: [from, to],
        sender: from,
      });

      if (response) {
        let message = { msg: "Message added successfully" };
        if (attachmentUrl) {
          message.attachment = attachmentUrl;
          message.downloadLink = downloadLink;
        }
        res.json(message);
      }
    } catch (err) {
      res.status(400).json({ msg: "Unexpected error while adding message" });
      console.log(err);
    }
  },
];

module.exports = {
  getMessages,
  addMessages,
};
