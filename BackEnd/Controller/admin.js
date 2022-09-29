const express = require('express');
const router = express.Router();
const pool = require('../database');
const app = new express();

app.use(express.json());


exports.addJobs = async (req, res) => {
   const {
      companyName,
      designation,
      jobDescription,
      jobLocation,
      hrEmail,
      jobActive,
      postedBy
   } = req.body;

   let jobDeatils = `insert into job (company_name,designation
        ,job_description,
        job_location,
        hr_email,
        job_active,
        job_createdAt,
        posted_by)
        values(
            '${companyName}',
            '${designation}',
            '${jobDescription}',
            '${jobLocation}',
            '${hrEmail}',
            '${jobActive}',
            now(),
            '${postedBy}')`;

   const details = await pool.query(jobDeatils, (err, result) => {
      if (err) throw err;
      res.json("Job Added Successfully!");
   })


}

//send jobs to frontend


exports.sendJob = async (req, res) => {
   sql = `select * from job`;
   const output = await pool.query(sql, (err, result) => {
      if (err) throw err;

      res.json(result);


   })
}

exports.applicants = async (req, res) => {
   const {
      jobId
   } = req.params;
   console.log(jobId)
   const sql = `select firstName , lastName , email, collegeName,graduationYear,skills from user_details
    where user_id in (select user_id from applied_jobs where job_id = ${Number(jobId)})`;
   await pool.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
   })
}