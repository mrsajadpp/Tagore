let userData = require('../database/user_data');
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'dev.traceinc@gmail.com',
    pass: 'rfhykcsxtepvfcam'
  },
});

//Admin validation
function verifyAdmin(req, res, next) {
  try {
    if (req.session.user) {
      if (req.session.user.admin) {
        next();
      } else {
        res.redirect('/admin/login')
      }
    } else {
      res.redirect('/admin/login')
    }
  } catch (err) {
    console.error(err)
  }
}

//Unlogin
function verifyUnlogin(req, res, next) {
  try {
    if (req.session.user) {
      if (req.session.user.admin) {
        res.redirect('/alert')
      } else {
        next()
      }
    } else {
      next()
    }
  } catch (err) {
    console.error(err)
  }
}

//Email configuer
function mail(message) {
  //let testAccount = await nodemailer.createTestAccount();
  try {
    transporter.sendMail({
      from: 'dev.traceinc@gmail.com',
      to: 'mrsajadpp@gmail.com',
      subject: message.title,
      text: message.text,
      html: message.content,
    });
    return true;
  } catch (err) {
    console.error(err)
  }
}

//Get methods
//Home
router.get('/', (req, res, next) => {
  try {
    res.render('pages/index', { title: 'Tagore College And Computer Academy', description: 'Tagore college and computer academy', user: req.session.user });
  } catch (err) {
    console.error(err)
  }
});
//College Home
router.get('/college', (req, res, next) => {
  try {
    res.render('pages/college', { title: 'Tagore College', description: 'Tagore College', user: req.session.user })
  } catch (err) {
    console.error(err)
  }
})
//Terms and conditions
router.get('/termsconditions', (req, res, next) => {
  try {
    res.render('pages/terms-conditions', { title: 'Terms And Conditions', description: 'Our Terms And Conditions', user: req.session.user });
  } catch (err) {
    console.error(err)
  }
})
//Privacy policy
router.get('/privacypolicy', (req, res, next) => {
  try {
    res.render('pages/privacy-policy', { title: 'Privacy Policy', description: 'Our Privacy Policy', user: req.session.user });
  } catch (err) {
    console.error(err)
  }
})
//Contact
router.get('/contact', (req, res, next) => {
  try {
    res.render('pages/contact', { title: 'Contact Us', description: 'Contact our team', user: req.session.user });
  } catch (err) {
    console.error(err)
  }
})
//Mission and vision
router.get('/visionandmission', (req, res, next) => {
  try {
    res.render('pages/vision', { title: 'Mission And Vision', description: 'Our Mission And Vision', user: req.session.user })
  } catch (err) {
    console.error(err)
  }
})
//Careers
router.get('/careers', (req, res, next) => {
  try {
    console.log('Careers')
  } catch (err) {
    console.error(err)
  }
})
//Get subs
router.get('/alert', verifyAdmin, (req, res, next) => {
  try {
    res.render('pages/alert', { title: 'Send Updates', description: 'Notify your subscribers' })
  } catch (err) {
    console.error(err)
  }
})
//Course
router.get('/course/:name', (req, res, next) => {
  try {
    res.render('course/course', { title: req.params.name.toUpperCase(), description: req.params.name.toUpperCase(), course: req.params.name, hide: true, user: req.session.user })
  } catch (err) {
    console.error(err)
  }
})
//Admin Login
router.get('/admin/login', verifyUnlogin, (req, res, next) => {
  try {
    res.render('pages/login', { title: 'Admin Login', description: 'Admin login page', user: req.session.user })
  } catch (err) {
    console.error(err)
  }
})

//Post methods
router.post('/subscribe', (req, res, next) => {
  try {
    userData.newSub(req.body).then((response) => {
      res.redirect('/')
    }).catch((err) => { console.error(err) })
  } catch (err) {
    console.error(err)
  }
})
router.post('/contact', (req, res, next) => {
  try {
    mail({
      title: 'New message.',
      text: 'New message from ' + req.body.email,
      content: `<!-- © 2018 Shift Technologies. All rights reserved. -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9"
          id="bodyTable">
          <tbody>
              <tr>
                  <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody"
                          style="max-width:600px">
                          <tbody>
                              <tr>
                                  <td align="center" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard"
                                          style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                                          <tbody>
                                              <tr>
                                                  <td style="background-color:#00d2f4;font-size:1px;line-height:3px"
                                                      class="topBorder" height="3">&nbsp;</td>
                                              </tr>
                                              <tr>
                                                  <td style="padding-top: 60px; padding-bottom: 20px;" align="center"
                                                      valign="middle" class="emailLogo">
                                                      <a href="#" style="text-decoration:none" target="_blank">
                                                          <img alt="" border="0"
                                                              src="https://i.postimg.cc/wMC4fRN7/logo.png"
                                                              style="width:100%;max-width:150px;height:auto;display:block"
                                                              width="150">
                                                      </a>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;"
                                                      align="center" valign="top" class="mainTitle">
                                                      <h3 class="text"
                                                          style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">
                                                          Hi "Tagore"</h3>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;"
                                                      align="center" valign="top" class="subTitle">
                                                      <h4 class="text"
                                                          style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:9px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">
                                                          From : ${req.body.fullname}, Email: ${req.body.email}.</h4>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="padding-left:20px;padding-right:20px" align="center" valign="top"
                                                      class="containtTable ui-sortable">
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                          class="tableDescription" style="">
                                                          <tbody>
                                                              <tr>
                                                                  <td style="padding-bottom: 20px;" align="center"
                                                                      valign="top" class="description">
                                                                      <p class="text"
                                                                          style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">
                                                                          Message: ${req.body.message}.</p>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                                          <tbody>
                                              <tr>
                                                  <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter"
                          style="max-width:600px">
                          <tbody>
                              <tr>
                                  <td align="center" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                                          <tbody>
                                              <tr>
                                                  <td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px"
                                                      align="center" valign="top" class="socialLinks">
                                                      <a href="#facebook-link" style="display:inline-block" target="_blank"
                                                          class="facebook">
                                                          <img alt="" border="0"
                                                              src="http://email.aumfusion.com/vespro/img/social/light/facebook.png"
                                                              style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px"
                                                              width="40">
                                                      </a>
                                                      <a href="https://twitter.com/tagoreacademi" style="display: inline-block;" target="_blank"
                                                          class="twitter">
                                                          <img alt="" border="0"
                                                              src="http://email.aumfusion.com/vespro/img/social/light/twitter.png"
                                                              style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px"
                                                              width="40">
                                                      </a>
                                                      <a href="https://instagram.com/tagore_computer_academy" style="display: inline-block;" target="_blank"
                                                          class="instagram">
                                                          <img alt="" border="0"
                                                              src="http://email.aumfusion.com/vespro/img/social/light/instagram.png"
                                                              style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px"
                                                              width="40">
                                                      </a>
                                                      <a href="httpd://linkedin.com/tagoreitacademy" style="display: inline-block;" target="_blank"
                                                          class="linkdin">
                                                          <img alt="" border="0"
                                                              src="http://email.aumfusion.com/vespro/img/social/light/linkdin.png"
                                                              style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px"
                                                              width="40">
                                                      </a>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="padding: 10px 10px 5px;" align="center" valign="top"
                                                      class="brandInfo">
                                                      <p class="text"
                                                          style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">
                                                          ©&nbsp;Tagore College and Computer Academy. | 2nd Floar RF Mall | Kolathur, Kerala 679338.</p>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="padding: 0px 10px 10px;" align="center" valign="top"
                                                      class="footerEmailInfo">
                                                      <p class="text"
                                                          style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">
                                                          If you have any quetions please contact us <a href="mailto:tagorecomputeracademy@mail.com"
                                                              style="color:#bbb;text-decoration:underline"
                                                              target="_blank">tagorecomputeracademy@mail.com.</a>
                                                          <br> <a href="#" style="color:#bbb;text-decoration:underline"
                                                              target="_blank">Unsubscribe</a> from our mailing lists
                                                      </p>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
          </tbody>
      </table>`
    })
    res.redirect('/contact')
  } catch (err) {
    console.error(err)
  }
})
router.post('/notify', verifyAdmin, (req, res, next) => {
  try {
    userData.getSub().then((emails) => {
      for (let i = 0; i < emails.length; i++) {
        setTimeout(function () {
          transporter.sendMail({
            from: 'dev.traceinc@gmail.com',
            to: emails[i].email,
            subject: req.body.title,
            text: req.body.subtitle,
            html: `<!-- © 2018 Shift Technologies. All rights reserved. -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9"
              id="bodyTable">
              <tbody>
                  <tr>
                      <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody"
                              style="max-width:600px">
                              <tbody>
                                  <tr>
                                      <td align="center" valign="top">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard"
                                              style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                                              <tbody>
                                                  <tr>
                                                      <td style="background-color:#00d2f4;font-size:1px;line-height:3px"
                                                          class="topBorder" height="3">&nbsp;</td>
                                                  </tr>
                                                  <tr>
                                                      <td style="padding-top: 60px; padding-bottom: 20px;" align="center"
                                                          valign="middle" class="emailLogo">
                                                          <a href="#" style="text-decoration:none" target="_blank">
                                                              <img alt="" border="0"
                                                                  src="https://i.postimg.cc/wMC4fRN7/logo.png"
                                                                  style="width:100%;max-width:150px;height:auto;display:block"
                                                                  width="150">
                                                          </a>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;"
                                                          align="center" valign="top" class="mainTitle">
                                                          <h3 class="text"
                                                              style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">
                                                              Hi</h3>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;"
                                                          align="center" valign="top" class="subTitle">
                                                          <h4 class="text"
                                                              style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:9px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">
                                                              From : Tagore.</h4>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style="padding-left:20px;padding-right:20px" align="center" valign="top"
                                                          class="containtTable ui-sortable">
                                                          <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                              class="tableDescription" style="">
                                                              <tbody>
                                                                  <tr>
                                                                      <td style="padding-bottom: 20px;" align="center"
                                                                          valign="top" class="description">
                                                                          <p class="text"
                                                                              style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">
                                                                              Update: ${req.body.message}.</p>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                                              <tbody>
                                                  <tr>
                                                      <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter"
                              style="max-width:600px">
                              <tbody>
                                  <tr>
                                      <td align="center" valign="top">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                                              <tbody>
                                                  <tr>
                                                      <td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px"
                                                          align="center" valign="top" class="socialLinks">
                                                          <a href="#facebook-link" style="display:inline-block" target="_blank"
                                                              class="facebook">
                                                              <img alt="" border="0"
                                                                  src="http://email.aumfusion.com/vespro/img/social/light/facebook.png"
                                                                  style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px"
                                                                  width="40">
                                                          </a>
                                                          <a href="https://twitter.com/tagoreacademi" style="display: inline-block;" target="_blank"
                                                              class="twitter">
                                                              <img alt="" border="0"
                                                                  src="http://email.aumfusion.com/vespro/img/social/light/twitter.png"
                                                                  style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px"
                                                                  width="40">
                                                          </a>
                                                          <a href="https://instagram.com/tagore_computer_academy" style="display: inline-block;" target="_blank"
                                                              class="instagram">
                                                              <img alt="" border="0"
                                                                  src="http://email.aumfusion.com/vespro/img/social/light/instagram.png"
                                                                  style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px"
                                                                  width="40">
                                                          </a>
                                                          <a href="httpd://linkedin.com/tagoreitacademy" style="display: inline-block;" target="_blank"
                                                              class="linkdin">
                                                              <img alt="" border="0"
                                                                  src="http://email.aumfusion.com/vespro/img/social/light/linkdin.png"
                                                                  style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px"
                                                                  width="40">
                                                          </a>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style="padding: 10px 10px 5px;" align="center" valign="top"
                                                          class="brandInfo">
                                                          <p class="text"
                                                              style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">
                                                              ©&nbsp;Tagore College and Computer Academy. | 2nd Floar RF Mall | Kolathur, Kerala 679338.</p>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style="padding: 0px 10px 10px;" align="center" valign="top"
                                                          class="footerEmailInfo">
                                                          <p class="text"
                                                              style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">
                                                              If you have any quetions please contact us <a href="mailto:tagorecomputeracademy@mail.com"
                                                                  style="color:#bbb;text-decoration:underline"
                                                                  target="_blank">tagorecomputeracademy@mail.com.</a>
                                                              <br> <a href="#" style="color:#bbb;text-decoration:underline"
                                                                  target="_blank">Unsubscribe</a> from our mailing lists
                                                          </p>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>`,
          });
        }, 3000);
      }
      res.redirect('/alert')
    }).catch((err) => { console.error(err) })
  } catch (err) {
    console.error(err)
  }
})
//Admin login
router.post('/login', verifyUnlogin, (req, res, next) => {
  try {
    console.log(req.body)
    if (req.body.username == 'tagoreacademy' && req.body.password == 'tagore786300') {
      req.session.user = {
        admin: true
      }
      res.redirect('/alert')
    } else {
      res.redirect('/admin/login')
    }
  } catch (err) {
    console.error(err)
  }
})
//Robots.txt
router.get('/robots.txt', (req, res, next) => {
  try {
    res.type('text/plain')
    res.send('User-agent: * \n Allow: / \n Allow: /college \n Allow: /contact \n Allow: /visionandmission')
  } catch (err) {
    console.error(err)
  }
})
module.exports = router;
