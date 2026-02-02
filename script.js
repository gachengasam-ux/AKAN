document.getElementById('akanForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve user input
    const birthDateInput = document.getElementById('birthDate').value; 
    const gender = document.getElementById('gender').value; 

    // Validate basic input
    if (!birthDateInput || !gender) {
        alert('Please select both birth date and gender');
        return;
    }

    // Parse date components
    const birthDate = new Date(birthDateInput);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1; // Months are zero-based
    const year = birthDate.getFullYear();   

    // Validate user input
    if (!isValidDate(day, month, year)) {
        alert('Invalid date entered');
        return;
    }

    if (!isValidGender(gender)) {
        alert('Invalid gender selected');
        return;
    }   

    // Calculate day of the week using the formula
    const dayOfWeek = calculateDayOfWeek(day, month, year); 
    const akanName = getAkanName(dayOfWeek, gender);
    displayResult(akanName);
});

function isValidDate(day, month, year) {
    // Check ranges
    if (year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }
    // Check if date is valid
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && 
           date.getMonth() + 1 === month && 
           date.getDate() === day;
}

function isValidGender(gender) {
    return gender === 'male' || gender === 'female';
}

function calculateDayOfWeek(day, month, year) { 
    // Adjust month for Zeller's formula (Jan/Feb treated as 13/14 of previous year)
    let mm = month;
    let yy = year;
    
    if (month < 3) {
        mm += 12;
        yy--;
    }
    
    // Extract CC and YY
    const CC = Math.floor(yy / 100);
    const YY = yy % 100;
    
    // Apply Zeller's Congruence formula: d=((4CC−2×CC−1)+(5YY/4)+(26(MM+1)/10)+DD)mod7
    const h = (
        (4 * CC - 2 * CC - 1) +           // Century term
        Math.floor(5 * YY / 4) +           // Year term 
        Math.floor(26 * (mm + 1) / 10) +   // Month term 
        day
    ) % 7;
    
    return h;
}

function getAkanName(dayOfWeek, gender) {
    // Akan names by Zeller's day numbering (h=0=Saturday, 1=Sunday, etc.)
    const dayNames = {
        0: { male: 'Kwadwo', female: 'Adwoa' },    // Saturday
        1: { male: 'Kwabena', female: 'Abena' },   // Sunday  
        2: { male: 'Kwaku', female: 'Akua' },      // Monday
        3: { male: 'Yaw', female: 'Yaa' },         // Tuesday
        4: { male: 'Kofi', female: 'Afua' },       // Wednesday
        5: { male: 'Kwame', female: 'Ama' },       // Thursday
        6: { male: 'Kwasi', female: 'Akosua' }     // Friday
    };
    return dayNames[dayOfWeek]?.[gender] || 'Invalid day';
}

function displayResult(akanName) {
    document.getElementById('akanName').textContent = akanName; 
    document.getElementById('result').style.display = 'block'; 
   
    // Scroll to result
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}



