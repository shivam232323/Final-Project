$("#post").click(function () {
  $("#box form").toggle("slow");
  return false;
});

const companyName = document.getElementById("company-name");
const jobRole = document.getElementById("designation");
const jobDescription = document.getElementById("description");
const jobLocation = document.getElementById("job-locations");
const hrEmail = document.getElementById("hr");
const postButton = document.getElementById("post-job");
const adminEmail = localStorage.getItem("adminEmail")
const logout = document.getElementById("Logout");
const signout = document.getElementById("Signout");
logout.innerHTML = adminEmail;


signout.addEventListener('click', function () {
  localStorage.clear();
  window.open("../Sign In/index.html", '_self');
})

postButton.addEventListener("click", function (e) {
  e.preventDefault();
  addJob();
})


const addJob = () => {
  fetch("http://localhost:1800/postJob", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
           companyName: companyName.value,
           designation: jobRole.value,
           jobDescription: jobDescription.value,
           jobLocation: jobLocation.value,
           hrEmail: hrEmail.value,
           jobActive: 1,
           postedBy: adminEmail
        }),

        // Adding headers to the request
        headers: {
           "Content-type": "application/json"
        }
     })
     .then(response => response.json())

     // Displaying results to console
     .then(json => {

        alert(json);

     }).catch(err => console.log(err))

}


//get posted jobs

const getJobs = async () => {
  const url = await fetch('http://localhost:1800/getJobs');
  const jsonData = await url.json();
  return jsonData;
}


function displayJobs() {
  getJobs().then((jsonData) => {
     addJobs(jsonData);
  }).catch(err => console.log(err))
}


function addJobs(jobs) {

  for (const value of jobs) {
     const {
        job_id,
        company_name,
        designation,
        job_description,
        job_location,
        hr_email,
        job_createdAt
     } = value;
     let date = job_createdAt.slice(0, 10);
     const test1 = document.getElementById('jobs');
     const newDiv = document.createElement('div');
     newDiv.id = "test1";

     newDiv.innerHTML = `
      <div class="card text-center">
      <div class="card-header" style = "color:black;">
      ${company_name}
      </div>
      <div class="card-body">
        <h5 class="card-title" style = "color:black;">${designation}</h5>
        <p class="card-text" style = "color:black;">${job_description}</p>
        <a href="#" class="btn btn-primary" id = "${job_id}"  onclick="applicants(this.id)"
        type="button" data-toggle="modal" data-target="#exampleModalCenter" >View Applicants</a>
      </div>
      <div class="card-footer" style = "color:black;" >
      <h6 class="text-left" id ="text1" style = "color:black;">Location:${job_location}</h6>
      <h6 class="text-right"  id ="text2" style = "color:black;">hr email: ${hr_email}</h3>
     <div id = "date"> Posted On: ${date}</div>
      </div>
      
    </div>`


     /*newDiv.innerHTML = `
 <h2 id ='companyname'>company Name: ${company_name}</h2>
     <h3 id = "designation">title: ${designation} <h3>Job Location:Mumbai</h3></h3>
     
     <p id = "description">Job Description : ${job_description}</p>
     <h6 id = "location">Job Location: ${job_location}</h3>
    <h6 id = "hremail">hr email: ${hr_email}</h3>
     <h6 id = "posted">Posted On: ${date}</h3>
     <button class = "btn btn-outline-info applicant" id = "${job_id}"  onclick="applicants(this.id)"
     type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">View Applicants</button>
   
 `*/

     test1.appendChild(newDiv);

  }

}

displayJobs();

const applicants = async (jobId) => {
  const fetchApplicants = await fetch(`http://localhost:1800/applicants/${jobId}`);
  const jsonData = await fetchApplicants.json();
  const test1 = document.getElementById('main');
  test1.innerHTML = "";
  if (!jsonData[0]) {
     return;
  } else {
     for (const applicants of jsonData) {
        const {
           firstName,
           lastName,
           email,
           collegeName,
           graduationYear,
           skills
        } = applicants;
        console.log(firstName, lastName, email, collegeName, graduationYear, skills);

        const newTable = document.createElement("tr");
        newTable.id = "t";
        newTable.innerHTML =
           `<td >${firstName+lastName}</td>
            <td >${email}</td>
            <td >${collegeName}</td>
            <td >${graduationYear}</td>
            <td>${skills}</td>`
            test1.appendChild(newTable);


     }
  }

}