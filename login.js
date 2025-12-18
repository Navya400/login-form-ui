document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const inputs = document.querySelectorAll(".input");
    const button = document.querySelector(".button");

    const usernameInput = inputs[0];
    const passwordInput = inputs[1];

    
    const message = document.createElement("p");
    message.style.color = "white";
    message.style.fontSize = "14px";
    message.style.marginTop = "15px";
    message.style.fontFamily = "Arial, sans-serif";
    form.appendChild(message);

    const showMessage = (text, success = false) => {
        message.innerText = text;
        message.style.color = success ? "#00ff9c" : "#ffb3b3";
    };

   
    const shakeForm = () => {
        form.style.animation = "shake 0.3s";
        setTimeout(() => form.style.animation = "", 300);
    };

    
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        .popup {
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            width: 300px;
            font-family: Arial, sans-serif;
            animation: fadeIn 0.4s ease;
        }

        .popup h2 {
            color: #2e7d32;
            margin-bottom: 10px;
        }

        .popup button {
            margin-top: 20px;
            padding: 10px 25px;
            border: none;
            background: #2e7d32;
            color: white;
            border-radius: 20px;
            cursor: pointer;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    
    const showPopup = () => {
        const overlay = document.createElement("div");
        overlay.className = "overlay";

        const popup = document.createElement("div");
        popup.className = "popup";

        popup.innerHTML = `
            <h2>Login Successful ✔</h2>
            <p>You have logged in successfully.</p>
            <button>OK</button>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        popup.querySelector("button").addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
    };

   
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            showMessage("All fields are required.");
            shakeForm();
            return;
        }

        if (password.length < 6) {
            showMessage("Password must be at least 6 characters.");
            shakeForm();
            return;
        }

        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            showMessage("Password must contain a number and a capital letter.");
            shakeForm();
            return;
        }

        button.disabled = true;
        button.innerText = "Authenticating...";
        showMessage("Checking credentials...");

        setTimeout(() => {
            showMessage("Login successful ✔", true);
            showPopup();          // ✅ POPUP HERE
            form.reset();
            button.disabled = false;
            button.innerText = "Login";
        }, 1800);
    });

    
    inputs.forEach(input => {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                form.requestSubmit();
            }
        });
    });

});
