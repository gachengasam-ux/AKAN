document.getElementById('akanForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const birthDateInput = document.getElementById('birthDate').value;
    const gender = document.getElementById('gender').value;
    
    // Arrays for names mapping: Index 0 is Sunday, 1 is Monday, etc.
    const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
    const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

    if (birthDateInput && gender) {
        const date = new Date(birthDateInput);
        
        // getDay() returns 0 for Sunday, 1 for Monday, etc.
        const dayOfWeek = date.getDay();
        
        let akanName = "";
        if (gender === "male") {
            akanName = maleNames[dayOfWeek];
        } else {
            akanName = femaleNames[dayOfWeek];
        }

        // Display results
        const resultDiv = document.getElementById('result');
        const nameDisplay = document.getElementById('akanName');
        
        nameDisplay.textContent = akanName;
        resultDiv.style.display = 'block';
        
        // Smooth scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    } else {
        alert("Please fill in all fields.");
    }
});