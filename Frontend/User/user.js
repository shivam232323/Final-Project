const userName = localStorage.getItem("Name");
const role = localStorage.getItem("Role")
const userId = localStorage.getItem("Id")
const signOut = document.getElementById("exit");


signOut.addEventListener('click', function () {
   localStorage.clear();
   window.open("../Sign In/index.html", '_self');

})


const firstName = document.getElementById('firstname');
const lastName = document.getElementById('Lastname');
const email = document.getElementById('Email');
const college = document.getElementById('College');
const sscPercentage = document.getElementById('SSC');
const hscPercentage = document.getElementById('HSC');
const graduatationPercentage = document.getElementById('Graduatation');
const graduatationYear = document.getElementById('yearSelect');
const skills = document.getElementById('Skills');
const submitButton = document.getElementById('submit');


submitButton.addEventListener('click', function (e) {
   e.preventDefault();
   details();
})


function details() {


   fetch("http://localhost:1800/sendUserDetails", {

         // Adding method type
         method: "POST",

         // Adding body or contents to send
         body: JSON.stringify({
            user_id: userId,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            collegeName: college.value,
            hsc: hscPercentage.value,
            ssc: sscPercentage.value,
            graduation: graduatationPercentage.value,
            graduationYear: graduatationYear.value,
            submited: true,
            skills: skills.value

         }),

         // Adding headers to the request
         headers: {
            "Content-type": "application/json"
         }
      })
      .then(response => response.json())

      // Displaying results to console
      .then(json => {
         window.alert(json);
      })

}


document.getElementById("About").innerHTML = userName;


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
      const test1 = document.getElementById('Home');
      const newDiv = document.createElement('div');
      newDiv.id = "job";
      newDiv.innerHTML = `
      <div class="card text-center">
      <div class="card-header" style = "color:black;">
      ${company_name}
      </div>
      <div class="card-body">
        <h5 class="card-title" style = "color:black;">${designation}</h5>
        <p class="card-text" style = "color:black;">${job_description}</p>
        <a href="#" class="btn btn-primary" id = "${job_id}"  onclick="apply(this.id)">Apply For Job</a>
      </div>
      <div class="card-footer" style = "color:black;" >
      <h6 class="text-left" id ="text1" style = "color:black;">Location:${job_location}</h6>
      <h6 class="text-right"  id ="text2" style = "color:black;">hr email: ${hr_email}</h3>
      Posted On: ${date}
      </div>
      
    </div>`


      test1.appendChild(newDiv);

   }

}

if (localStorage.getItem("Role") == "user") {
   displayJobs();
}


function apply(id) {

   fetch(`http://localhost:1800/applyJob`, {

         // Adding method type
         method: "POST",

         // Adding body or contents to send
         body: JSON.stringify({

            jobId: Number(id),
            userId: Number(userId)
         }),

         // Adding headers to the request
         headers: {
            "Content-type": "application/json"
         }
      })
      .then(response => response.json())

      // Displaying results to console
      .then(json => {
            window.alert(json);
         }

      )

}


const jobsApplied = async () => {

   const fetchJobs = await fetch(`http://localhost:1800/appliedJobs/${userId}`);
   const jsonData = await fetchJobs.json();
   const test1 = document.getElementById('main');
   test1.innerHTML = "";
   console.log(jsonData);
   if (jsonData == "You have not applied for any job") {
      window.alert(jsonData);

   } else {

      for (const jobs of jsonData) {
         const {
            company_name,
            designation,
            job_location
         } = jobs;
         const newTable = document.createElement("tr");
         newTable.id = "t";
         newTable.innerHTML =
            `<td >${company_name}</td>
  <td >${designation}</td>
  <td>${job_location}</td>`
         test1.appendChild(newTable);

      }

   }
}


function openPage(pageName, elmnt, color) {

   let i, tabcontent, tablinks;
   tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
   }
   tablinks = document.getElementsByClassName("tablink");
   for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
   }
   document.getElementById(pageName).style.display = "block";
   elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();