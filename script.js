document.getElementById('akanForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const birthDateValue = document.getElementById('birthDate').value;
    const gender = document.getElementById('gender').value;
    const resultDiv = document.getElementById('result');
    const nameDisplay = document.getElementById('akanName');
    const errorDiv = document.getElementById('errorMessage');

    // UI Helper: Hide previous results/errors
    errorDiv.style.display = 'none';
    resultDiv.style.display = 'none';

    if (!birthDateValue || !gender) {
        errorDiv.textContent = "Please provide both date and gender.";
        errorDiv.style.display = 'block';
        return;
    }

    // Parse values for validation and Zeller's
    const dateParts = birthDateValue.split("-");
    const yearInput = parseInt(dateParts[0]);
    const monthInput = parseInt(dateParts[1]);
    const dayInput = parseInt(dateParts[2]);

    // 1. Strict Date Existence Validation
    const checkDate = new Date(yearInput, monthInput - 1, dayInput);
    if (checkDate.getFullYear() !== yearInput ||
        checkDate.getMonth() !== monthInput - 1 ||
        checkDate.getDate() !== dayInput) {
        errorDiv.textContent = "Invalid date! This date does not exist on the calendar.";
        errorDiv.style.display = 'block';
        return;
    }

    // 2. Future Date Check
    if (checkDate > new Date()) {
        errorDiv.textContent = "Birth date cannot be in the future.";
        errorDiv.style.display = 'block';
        return;
    }

    // 3. Zeller's Congruence Formula Logic
    let m = monthInput;
    let y = yearInput;
    const q = dayInput;

    if (m < 3) {
        m += 12;
        y -= 1;
    }

    const K = y % 100;
    const J = Math.floor(y / 100);

    // h: 0=Sat, 1=Sun, 2=Mon, 3=Tue, 4=Wed, 5=Thu, 6=Fri
    let h = (q + Math.floor((13 * (m + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) - (2 * J)) % 7;

    // Handle negative modulo
    if (h < 0) h = (h + 7) % 7;

    // 4. Name Mapping
    const maleNames = ["Kwame", "Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi"];
    const femaleNames = ["Ama", "Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua"];

    const akanName = (gender === "male") ? maleNames[h] : femaleNames[h];

    // 5. Display Result
    nameDisplay.textContent = akanName;
    resultDiv.style.display = 'block';
});