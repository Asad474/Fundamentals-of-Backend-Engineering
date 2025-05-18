const express = require('express');
const app = express();

const jobs = {};

async function checkJobComplete(jobId) {
    return new Promise((resolve, reject) => {
        if (jobs[jobId] < 100)
            this.setTimeout(() => resolve(false), 1000);
            // resolve(false);
        else 
            resolve(true);
    })
}

function updateJob(jobId, prg) {
    jobs[jobId] = prg;
    console.log(`Updated ${jobId} to ${prg}\n`);
    if (prg === 100)
        return;

    this.setTimeout(() => {
        updateJob(jobId, prg + 10);
    }, 3000);
}

app.post('/submit', (req, res) => {
    const jobId = `job:${Date.now()}`;
    jobs[jobId] = 0;
    updateJob(jobId, 0);
    return res.send(`${jobId}\n`);
});

app.get('/checkStatus', async(req, res) => {
    console.log(req.query);
    while(await checkJobComplete(req.query.jobId) === false);
    return res.send(`Job completed: ${jobs[req.query.jobId]}\n`);
});

app.listen(8080, () => {
    console.log('Server is running at port 8080');
});