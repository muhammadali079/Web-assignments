function openTab(evt, tabName) {
    const tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function validatePhoneNumber(phone) {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    return phonePattern.test(phone);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const form = document.getElementById('job-application-form');
const viewTableBtn = document.getElementById('view-table');


let applications = JSON.parse(localStorage.getItem('applications')) || [];

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('first-name')?.value.trim();
    const lastName = document.getElementById('last-name')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const educationLevel = document.getElementById('education-level')?.value;
    const schoolName = document.getElementById('school-name')?.value.trim();
    const jobTitle = document.getElementById('job-title')?.value.trim();
    const companyName = document.getElementById('company-name')?.value.trim();
    const skills = document.getElementById('skills')?.value;
    const resume = document.getElementById('resume')?.files[0]?.name || 'No file uploaded';
    const coverLetter = document.getElementById('cover-letter')?.value.trim();
    const startDate = document.getElementById('start-date')?.value;
    const referenceName = document.getElementById('reference-name')?.value.trim();
    const whyCompany = document.getElementById('why-company')?.value.trim();
    const agreeTerms = document.getElementById('agree-terms')?.checked;

    if (!firstName || !lastName || !validatePhoneNumber(phone) || !validateEmail(email) || !agreeTerms) {
        alert('Please ensure all required fields are filled out correctly.');
        return;
    }

    const application = {
        firstName,
        lastName,
        phone,
        email,
        educationLevel,
        schoolName,
        jobTitle,
        companyName,
        skills,
        resume,
        coverLetter,
        startDate,
        referenceName,
        whyCompany,
    };

    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));

    form.reset();
    alert('Application submitted successfully!');
 
});

const modal = document.getElementById("applicationModal");
const span = document.getElementsByClassName("close")[0];


function displayApplications() {
    const sliderContent = document.getElementById('sliderContent');
    sliderContent.innerHTML = ''; 

    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    console.log("Retrieved applications:", applications); 

    if (applications.length === 0) {
        sliderContent.innerHTML = `<p>No applications submitted yet.</p>`;
        console.log("No applications found.");
    } else {
        console.log("applications found.");
        applications.forEach((app, index) => {
            const appDiv = document.createElement('div');
            appDiv.className = 'application-slide'; 
            appDiv.innerHTML = `
                <h3>Application ${index + 1}</h3>
                <p><strong>Name:</strong> ${app.firstName || 'N/A'} ${app.lastName || 'N/A'}</p>
                <p><strong>Phone:</strong> ${app.phone || 'N/A'}</p>
                <p><strong>Email:</strong> ${app.email || 'N/A'}</p>
                <p><strong>Education:</strong> ${app.educationLevel || 'N/A'}, ${app.schoolName || 'N/A'}</p>
                <p><strong>Previous Job:</strong> ${app.jobTitle || 'N/A'} at ${app.companyName || 'N/A'}</p>
                <p><strong>Skills:</strong> ${app.skills || 'N/A'}</p>
                <p><strong>Resume:</strong> ${app.resume || 'N/A'}</p>
                <p><strong>Cover Letter:</strong> ${app.coverLetter || 'N/A'}</p>
                <p><strong>Preferred Start Date:</strong> ${app.startDate || 'N/A'}</p>
                <p><strong>Reference:</strong> ${app.referenceName || 'N/A'}</p>
                <p><strong>Why this Company:</strong> ${app.whyCompany || 'N/A'}</p>
            `;
            sliderContent.appendChild(appDiv); 
            console.log("App div added for:", app.firstName);
        });
        showSlide(0); 
    }

    modal.style.display = "block"; 
    console.log("Modal displayed with applications.");
}

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('#sliderContent > .application-slide'); 
    if (index >= slides.length) currentSlide = 0; 
    if (index < 0) currentSlide = slides.length - 1; 

    slides.forEach(slide => slide.style.display = "none");

    if (slides.length > 0) {
        slides[currentSlide].style.display = "block"; 
        console.log('Showing slide index:', currentSlide);
    }
}

document.getElementById('nextButton').addEventListener('click', function () {
    currentSlide++;
    showSlide(currentSlide);
});

document.getElementById('prevButton').addEventListener('click', function () {
    currentSlide--;
    showSlide(currentSlide);
});

span.onclick = function () {
    modal.style.display = "none";
};

