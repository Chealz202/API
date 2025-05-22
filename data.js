const API_URL = 'http://localhost:3000/grades';
const form = document.getElementById('grade-form');
const gradeSelect = document.getElementById('grade');
const commentInput = document.getElementById('comment');
const nameInput = document.getElementById('name');
const gradesContainer = document.getElementById('grades-container');

// READ: Fetch and display all grades//
async function fetchGrades() {
  const res = await fetch(API_URL);
  const grades = await res.json();
  gradesContainer.innerHTML = ''; 
  grades.forEach(renderGrade);
}

// CREATE: Submit a new grade//
async function addGrade(e) {
  e.preventDefault();
  const newGrade = {
    name: nameInput.value.trim(),
    grade: gradeSelect.value,
    comment: commentInput.value.trim()
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newGrade)
  });

  const createdGrade = await res.json();
  renderGrade(createdGrade); 
  form.reset(); // Clear form//
}

// DELETE: Remove a grade from the UI only (not from db.json)//
function deleteGradeFromUI(id) {
  const gradeDiv = document.getElementById(`grade-${id}`);
  if (gradeDiv) {
    gradeDiv.remove(); 
  }
}

// RENDER: Show a single grade entry//
function renderGrade(grade) {
  const div = document.createElement('div');
  div.className = 'grade-entry';
  div.id = `grade-${grade.id}`;
  div.innerHTML = `
    <strong>Name:</strong> ${grade.name}<br/>
    <strong>Grade:</strong> ${grade.grade}<br/>
    <strong>Comment:</strong> ${grade.comment}<br/>
  `;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';

  // only remove the grade from the UI//
  deleteButton.addEventListener('click', () => deleteGradeFromUI(grade.id));

  div.appendChild(deleteButton);
  gradesContainer.appendChild(div);
}

// Event Listeners//
form.addEventListener('submit', addGrade);

// Load existing grades on startup//
fetchGrades();
