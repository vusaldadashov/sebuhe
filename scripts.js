var currentStep = 0; // Initial step
const steps = document.querySelectorAll('.step');
const stepslider = document.querySelector(".steps-slider");
const indicators = document.querySelectorAll('.indicator');

// Function to move to the next step
function showStep(stepIndex) {
    // steps.forEach((step) => step.classList.remove('active' + stepIndex));
    stepslider.scrollLeft = steps[stepIndex].offsetLeft

    indicators.forEach((indicator) => indicator.classList.remove('active'));
    indicators[stepIndex].classList.add('active');
}

// Event listener for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentStep = index;
        showStep(currentStep);
    });
});

showStep(currentStep)

// Set interval to automatically change slides (optional)
//setInterval(nextStep, 25000); // Change slide every 5 seconds

//Adding touch support for mobile

const slider = document.querySelector("#stepst"); // Ensure this targets the container with steps

let startX;

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX > endX) {
        // Swipe left
        if (currentStep == 5) return
        currentStep += 1;
        showStep(currentStep)
    } else if (startX < endX) {
        // Swipe right
        if (currentStep == 0) return
        currentStep -= 1
        showStep(currentStep)
    }
    else if (startX == endX) {
        if (startX > 180) {
            if (currentStep == 5) return
            currentStep += 1;
            showStep(currentStep)
        }
        else {
            if (currentStep == 0) return
            currentStep -= 1
            showStep(currentStep)
        }
    }
});




document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = new FormData(this); // Collect form data

    // Replace with your Google Form's POST URL
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSdKV8n9WHagI0oKdpV3Mw5RKEU4ZNpzjT1zy9PxZLn2_aIsBQ/formResponse';

    console.log(form)

    fetch(url, {
        method: 'POST',
        body: form
    })
        .then(response => {
            console.log('Form submitted successfully');
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });

    this.style.opacity = "0";
    this.style.visibility = "hidden";
    setTimeout(function () {
        document.getElementById("signmessage").style.display = "block";
        const icon = document.getElementById("done-icon");
        icon.querySelector("circle").style.animation = "drawCircle 1s ease forwards";
        icon.querySelector("path").style.animation = "drawCheckmark 1s ease 0.5s forwards";
    }, 500);
});
