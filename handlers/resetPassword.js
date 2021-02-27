const User = require("../models/salary");
const passwordResetToken = require('../models/resettoken');

const resetPassword = async (req, res) => {
    if (!req.body.email) {
        return res
            .status(500)
            .json({ message: 'Email is required' });
    }
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        return res
            .status(409)
            .json({ message: 'Email does not exist' });
    }
    var resettoken = new passwordResetToken({ _userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
    resettoken.save(function (err) {
        if (err) { 
            return res.status(500).send({ msg: err.message }); 
        }
        passwordResetToken.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
        res.status(200).json({ message: 'Reset Password successfully.' 
    });
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 465,
            auth: {
                user: 'user',
                pass: 'password'
            }
        });
        var mailOptions = {
            to: user.email,
            from: 'your email',
            subject: 'Mot de passe reinitialisé',
            text: "Vous recevez ceci parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.nn" +
                'Veuillez cliquer sur le lien suivant ou collez-le dans votre navigateur pour terminer le processus.nn' +
                'http://localhost:3000/response-reset-password/' + resettoken.resettoken + 'nn' +
                "Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.n"
        }
        transporter.sendMail(mailOptions, (err, info) => {
        })
    })
},

//Validation du jeton mot de passe
const ValidPasswordToken = async (req, res) => {
    if (!req.body.resettoken) {
    return res
    .status(500)
    .json({ message: 'Token is required' });
    }
    const user = await passwordResetToken.findOne({
    resettoken: req.body.resettoken
    });
    if (!user) {
    return res
    .status(409)
    .json({ message: 'Invalid URL' });
    }
    User.findOneAndUpdate({ _id: user._userId }).then(() => {
    res.status(200).json({ message: 'Token verified successfully.' });
    }).catch((err) => {
    return res.status(500).send({ msg: err.message });
    });
},

//Définition du nouveau mot de passe 
const NewPassword =  async (req, res) => {
        passwordResetToken.findOne({ resettoken: req.body.resettoken }, function (err, userToken, next) {
          if (!userToken) {
            return res
              .status(409)
              .json({ message: 'Token has expired' });
          }
    
          User.findOne({
            _id: userToken._userId
          }, function (err, userEmail, next) {
            if (!userEmail) {
              return res
                .status(409)
                .json({ message: 'User does not exist' });
            }
            return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
              if (err) {
                return res
                  .status(400)
                  .json({ message: 'Error hashing password' });
              }
              userEmail.password = hash;
              userEmail.save(function (err) {
                if (err) {
                  return res
                    .status(400)
                    .json({ message: 'Password can not reset.' });
                } else {
                  userToken.remove();
                  return res
                    .status(201)
                    .json({ message: 'Password reset successfully' });
                }
    
              });
            });
          });
    
        })
    }


module.exports = { resetPassword, ValidPasswordToken, NewPassword };