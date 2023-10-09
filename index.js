document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem("issues"));
  let issuesList = document.getElementById("issuesList");
  console.log(issues, issuesList);

  issuesList.innerHTML = "";

  for (let i = 0; i < issues.length; i++) {
    let id = issues[i].id;
    let subject = issues[i].subject;
    let description = issues[i].description;
    let severity = issues[i].severity;
    let assignedTo = issues[i].assignedTo;
    let status = issues[i].status;
    let statusColor = status == "Closed" ? "badge-success" : "badge-info";
    let statusColorIcon='red'

    // Browser Display HTML
  issuesList.innerHTML += `
    <div class="well-container">
      <p>Status: <span class="badge ${statusColor}">   ${status} </span></p>
      <div class="icons">
        <div class="icon">
          <p class="icon-text">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill=${statusColorIcon} class="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
              </svg>
            </span> 
            <span>Severity: ${severity}</span>
          <p/> 
        </div>

        <div class="icon">
          <p class="icon-text">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='blue' class="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
              </svg>
            </span> 
            <span>Assigned to: ${assignedTo} </span>
          </p>
        </div>
      </div>
      <div>
      <h6>Issue ID: ${id} </h6>        
      <h3>Issue:  ${subject} </h3>
      <p>Issue Details:  ${description}</p>
      </div>

      <div class="buttons">
        <a href="#" class="btn btn-warning" onclick="setStatusClosed('${id}')">Close</a>
        <a href="#" class="btn btn-danger" onclick="deleteIssue('${id}')">Delete</a>
      </div>
    </div>
  </div> 
  `;
  }
}

function saveIssue(e) {
  console.log("click");
  let issueId = chance.guid();
  let issueSubject = document.getElementById("issueSubjInput").value;
  let issueDesc = document.getElementById("issueDescInput").value;
  let issueSeverity = document.getElementById("issueSeverityInput").value;
  let issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  let issueStatus = "Open";

  let issue = {
    id: issueId,
    subject: issueSubject,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };

  if (localStorage.getItem("issues") === null) {
    let issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    let issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  document.getElementById("issueInputForm").reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed(id) {
  let issues = JSON.parse(localStorage.getItem("issues"));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues[i].status = "Closed";
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  let issues = JSON.parse(localStorage.getItem("issues"));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}
