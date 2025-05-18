const express = require("express");
const app = express();

const jobs = [];

function updateJob(jobId, prg) {
  jobs[jobId] = prg;
  console.log(`Updated ${jobId} to ${prg}`);

  if (prg === 100) return;

  this.setTimeout(() => {
    updateJob(jobId, prg + 10);
  }, 3000);
}

app.post("/submit", (req, res) => {
  const jobId = `job:${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId, 0);
  return res.send(`\n\n ${jobId} \n\n`);
});

app.get("/checkStatus", (req, res) => {
  console.log(req.query);
  console.log(jobs);
  console.log(jobs[req.query.jobId]);
  return res.send(`\n\nJob Status: ${jobs[req.query.jobId]} \n\n`);
});

app.listen(8080, () => {
  console.log("Server is listening at port 8080");
});
