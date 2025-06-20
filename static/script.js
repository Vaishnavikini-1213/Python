function copyPassword() {
    const text = document.getElementById("password").value;
    navigator.clipboard.writeText(text).then(() => {
        alert("✅ Password copied to clipboard!");
    });
}

function downloadPassword() {
    const text = document.getElementById("password").value;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "password.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function toggleTheme() {
    document.body.classList.toggle('dark');
}

window.onload = function () {
    const password = document.getElementById("password");
    if (password) {
        const strengthBox = document.getElementById("strength");
        const val = password.value;
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[a-z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        let strength = "Weak";
        let color = "red";
        if (score >= 4) {
            strength = "Strong";
            color = "green";
        } else if (score >= 3) {
            strength = "Medium";
            color = "orange";
        }

        strengthBox.innerHTML = `<strong>Password Strength: <span style='color:${color}'>${strength}</span></strong>`;
    }
}

