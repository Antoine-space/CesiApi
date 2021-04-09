const nodemailer = require("nodemailer");
const Conge = require("../handlers/conge");
const Salary = require("../handlers/salary");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.HOST_MAILER, // HOST_MAILER=smtp.gmail.com
  port: process.env.PORT_MAILER, // PORT_MAILER=587
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_MAILER, // generated ethereal user
    pass: process.env.PASSWORD_MAILER, // generated ethereal password
  },
});
const date = new Date();



async function sendEmail(to, subject, html) {
  let info = await transporter.sendMail({
    from: process.env.EMAIL_MAILER,
    to: to,
    subject: subject,
    html:html,
  });
  return info;
};

const CongeRequestStatusUpdateToEmployee = (CongeId) => {
  return async (req, res) => {
    conge = await Conge.findById(CongeId).populate(
      "salary"
    );

    let html = `<b>Le status de votre demande de congé du ${date.toLocaleDateString(
      conge.startDate
    )} au ${date.toLocaleDateString(conge.endDate)} a changé de status: ${
      conge.state
    }</b>`;
    html += `<br>`;
    html += `Demande de congé :`;
    sendEmail(
      conge.salary.email,
      "Votre demande de congé a changé de status",
      html
    );
  };
};

const CongeRequestStatusUpdateToManager = (CongeId) => {
  return async (req, res) => {
    conge = await Conge.findById(CongeId).populate({
      path: "salary",
      populate: {
        path: "service",
        populate: {
          path: "id_reponsable",
        },
      },
    });

    let html = `<b>Le status de la demande de congé de ${
      conge.salary.lastname
    } ${conge.salary.firstName} du ${date.toLocaleDateString(
      conge.startDate
    )} au ${date.toLocaleDateString(conge.endDate)} a changé de status: ${
      conge.state
    }</b>`;
    html += `<br>`;
    html += `Demande de congé :`;
    sendEmail(
      conge.salary.service.id_responsable.email,
      `Le status de la demande de congé de ${conge.salary.lastname} ${conge.salary.firstname} a changé`,
      html
    );
  };
};


const NewCongeRequestToRh = (CongeId) => {
    return async (req, res) => {
    conge = await Conge.findById(CongeId).populate(
      "salary"
    );
    SalaryServiceRH = await Salary.find({
      id_service: process.env.ID_RH,
    });

    RHMail = await SalaryServiceRH.map((RH) => {
      return RH.email;
    });

    //Créatrion Mail
    let html = `<b>Une nouvelle demande de congé de ${
      conge.salary.lastname
    } ${conge.salary.firstname} du ${date.toLocaleDateString(
      conge.startDate
    )} au ${date.toLocaleDateString(
      conge.endDate
    )} est en attente de validation</b>`;
    html += `<br>`;
    html += `Demande de congé :`;

    //Envoie Mail
    sendEmail(
      RHMail,
      `Une nouvelle demande de congé de ${conge.salary.lastname} ${conge.salary.firstname} est en attente de validation`,
      html
    );
  }
}


module.exports = { sendEmail, CongeRequestStatusUpdateToEmployee, CongeRequestStatusUpdateToManager, NewCongeRequestToRh};