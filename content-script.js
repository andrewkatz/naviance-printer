function modifyPageForPrinting() {
  // Find the student name
  const studentNameElement = document.querySelector('h5[variant="studentName"]');
  const studentName = studentNameElement ? studentNameElement.textContent.trim() : 'Unknown Student';

  // Find the target element
  const targetElement = document.getElementById('StudentFolderContentWell');

  if (!targetElement) {
    console.error('Element with id "StudentFolderContentWell" not found');
    return;
  }

  // Clone the target element
  const clonedTarget = targetElement.cloneNode(true);

  // Clear the body and add the cloned target
  document.body.innerHTML = '';
  document.body.appendChild(clonedTarget);

  // Replace textareas with p tags within the target element
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
    const p = document.createElement('p');
    p.textContent = textarea.value;
    p.style.whiteSpace = 'pre-wrap';
    textarea.parentNode.replaceChild(p, textarea);
  });

  // Add a custom header with the student name
  const header = document.createElement('h1');
  header.textContent = studentName;
  header.style.marginBottom = '20px';
  document.body.insertBefore(header, document.body.firstChild);

  const forDraft = document.getElementById('forDraft');
  forDraft.style.display = 'none';

  // Set background color of first child of "student-staff-ui" to white
  const studentStaffUi = document.querySelector('.survey-staff-ui');
  if (studentStaffUi && studentStaffUi.firstElementChild) {
    studentStaffUi.firstElementChild.style.backgroundColor = 'white';
  }

  // Add print-specific CSS
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      body {
        font-family: Arial, sans-serif;
        font-size: 12pt;
        line-height: 1.5;
        margin: 1in;
      }
      .page-number:before {
        content: "Page " counter(page);
      }
      @page {
        counter-increment: page;
        @bottom-right {
          content: counter(page);
        }
      }
    }
  `;
  document.head.appendChild(style);

  // Print the page
  window.print();
}

modifyPageForPrinting();
