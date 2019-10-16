const express = require('express');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const path = require('path');
const config = require('../config');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            EMAIL SETTINGS 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.user,
      pass: config.pass
    }
});


const sendSampleSubmission = function(orgName, refNumber, email, fname, surname, prediagnosis) {

    transporter.use('compile', hbs({
        viewEngine: {
            viewPath: path.resolve(__dirname, 'templates', 'SampleSubmission'),
            extName: '.hbs',
            defaultLayout: false
        },
        viewPath: path.resolve(__dirname, 'templates', 'SampleSubmission'),
        extName: '.hbs'
    }));

    let pth = "";
    let content = "";
    setNewHTMLTemplate();

    async function setNewHTMLTemplate () {
        content = `<div style="border: solid black; width: 40%; height: auto; margin: 0 auto; margin-top: 30px; padding: 10px; font-family: Arial, Helvetica, sans-serif;font-size: larger;">
        <div style="text-align: center;">
        <img style="width: 40%; padding: 5px; height: 20%;" src="https://drive.google.com/uc?export=view&amp;id=1ECN34q9tJuBS2dKnIdIUA2o2wtS3X5pn"/>  
        </div>
        <div>  <p style="white-space: pre-line;">  <span style="font-weight: bolder;">Organization:</span>  ${orgName}  </p>     </div>
        <div>  <p style="white-space: pre-line;">  <span style="font-weight: bolder;">Name:</span> ${fname}  ${surname}  </p>     </div>
        <div>  <p style="white-space: pre-line;">  <span style="font-weight: bolder;">Email:</span>  ${email}  </p>     </div>
        <div>  <p style="white-space: pre-line;">  <span style="font-weight: bolder;">Reference Number:</span> <span style="font-weight: bold;">${refNumber}</span>  </p>     </div>
        </div>`;
        overwriteHTMLFile();
    }

    async function overwriteHTMLFile () {
        fs.writeFile(path.resolve(__dirname, 'templates', 'SampleSubmission', "physicalSamplePaper.html"), content, function (err) {
            if (err) throw err;
            console.log('Saved!');
            htmlToPDF();
        });
    }
    
    async function htmlToPDF () {
        var html = fs.readFileSync(path.resolve(__dirname, 'templates', 'SampleSubmission', "physicalSamplePaper.html"), 'utf8');
        pdf.create(html, options).toFile('./physicalSampleAttachment.pdf', function(err, res) {
            if (err) {
                console.log(err);
                finallySendEmail();
                return;
            } else {
                pth = res.filename;
                console.log(res.filename); // { filename: '/app/businesscard.pdf' }
                finallySendEmail();
            }
        });
    }
    
    async function finallySendEmail() {
        let mailOptions = {
            from: 'FABI',
            // to: email,
            to: email,                              
            subject: "FABI Mobile | Sample Submission",
            text: "",
            template: 'sampleSent',
            context: {
                refNumber: refNumber,
                fname: fname,
                surname: surname,
                prediagnosis: prediagnosis
            },
            attachments: [{
                filename: "physicalSampleAttachment.pdf",
                path: pth,
                contentType: 'application/pdf'
                // filename: "test.txt",
                // content: `
                //     Organization: ${orgName}  
                //     Name: ${fname} ${surname}
                //     Email: kendrar@mweb.co.za
                //     Reference Number: 734912840712`,
                
            }]
        };
        
        return transporter.sendMail(mailOptions, (error, info) => {
            if (error)
                console.log(error);
            else
                console.log('Email Sent');
        });
    }

}


module.exports = {
    sendSampleSubmission: sendSampleSubmission
};