// src/utils/submissions.js
const SUBMISSIONS_KEY = 'halalgo_submissions';

export function getSubmissions() {
  return JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
}

export function addSubmission(submission) {
  const submissions = getSubmissions();
  submissions.push(submission);
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
}

export function updateSubmissionStatus(submissionId, status) {
  const submissions = getSubmissions();
  const index = submissions.findIndex(s => s.id === submissionId);
  if (index !== -1) {
    submissions[index].status = status;
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  }
}