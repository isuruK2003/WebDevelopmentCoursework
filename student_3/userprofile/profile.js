
var ul = document.getElementById('ul');
var btn1 = document.getElementById('button2');
var scoreCard = document.getElementById('scoreCard');
var quizBox = document.getElementById('questionBox');
var op1 = document.getElementById('op1');
var indicator = document.getElementById('myBar');


var mark = 0;
var count = 0;
var app = {
    questions: [
        { q: 'Enter Your First Name', placeholder: 'First Name' },

        { q: 'Enter Your Last Name', placeholder: 'Last Name' },

        { q: 'Enter Your Email Address', placeholder: 'Email Address' },

        { q: 'Enter Your Contact Number', placeholder: 'Contact No.' },
    
         { q: 'Enter your Age?'  },

        { q: 'Enter your Gender?',placeholder:'Male or Female' },

        { q: 'what Industries you have experience employed with?' },

        { q: 'what is your Good professional skills?' },

        {q:'what is your Communicated languages?'},

        { q: 'What Is Your Payment Method', placeholder: 'E.g. Credit' },

        { q:'The greatest time of day to offer assistance? (Afternoon/Evening/Morning): Is such a short-term or long-term dedication?' },

        { q: 'Qualifications or specialized education?' },

        { q: 'Do you like to collaborate in a team or alone?' }


    ],
    answers: [],
    sample: ["First Name: ", "Last Name: ", "Email: ", "Contact No.: ", "Age: ", "Gender: ", "Experience: ", "Skills: ", "Languages: ", "Payment Method  : ", "Time Dedication: ", "Preferred product category: ","Education Qulification:","collaborate:"],
    index: 0,
    load: function () {
        if (this.index <= this.questions.length - 1) {
            document.getElementById('op1').value = '';
            quizBox.innerHTML = this.index + 1 + ". " + this.questions[this.index].q;
            op1.placeholder = this.questions[this.index].placeholder;


        }
        else {
            count++;
            quizBox.innerHTML = "Successfully Build your Profile, Thank You!";
            document.querySelector('.options').style.display = "none";
            document.querySelector('.score_section').style.display = 'none';
            this.displayProfile();

        }
    },
    next: function () {
        if (this.validate()) {
            this.answers.push(document.getElementById('op1').value.trim());
            this.index++;
            this.load();
            var progress = (this.index / this.questions.length) * 100;
            document.getElementById("myBar").style.width = progress + "%";
        } else {
            alert("Please fill in all required fields before proceeding.");
        }
    },
    validate: function () {
        var requiredIndices = [0, 1, 2, 3, 8, 10]; // Indices of required questions
        var currentIndex = this.index;
        if (requiredIndices.includes(currentIndex)) {
            var value = document.getElementById('op1').value.trim();
            if (value === '') {
                return false;
            }
            // Check email format for question index 2
            if (currentIndex === 2 && !this.isValidEmail(value)) {
                alert("Invalid email format. Please enter a valid email address.");
                return false;
            }
            // Check if input consists of numbers only for question index 3
            if (currentIndex === 3 && !this.isNumeric(value)) {
                alert("Please enter numbers only for the contact number.");
                return false;
            }
        }
        return true;
    },
    displayProfile: function () {
        var profileDetails = document.getElementById('profileDetails');
        profileDetails.innerHTML = "<p><strong>Profile Details:</strong></p>";
        for (var i = 0; i < this.answers.length; i++) {
            profileDetails.innerHTML += "<p><strong>" + this.questions[i].q + ":</strong> " + this.answers[i] + "</p>";
        }
        document.querySelector('.quiz_section').style.display = "none";
        document.querySelector('.heading').style.display = "none";
        document.querySelector('.profile_section').style.display = "block";
    },
    isValidEmail: function (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    isNumeric: function (input) {
        return /^\d+$/.test(input);
    },

    displayProfile: function () {
        var profileDetails = document.getElementById('profileDetails');
        for (var i = 0; i < this.questions.length; i++) {
            profileDetails.innerHTML += "<p><strong>" + this.sample[i] + "</strong>" + this.answers[i] + "</p>";
        }
        document.querySelector('.quiz_section').style.display = "none";
        document.querySelector('.heading').style.display = "none";
        document.querySelector('.profile_section').style.display = "block";
    }


}


window.onload = app.load();


function next() {
    app.next();
}



var num = 0,
    test, QuestionNo, question, choice, choices, chA, chB, chC, chD, correct = 0;
var marks = 0;
var correctarr01 = new Array(10); //this array will hold the quetion that the user got right.



