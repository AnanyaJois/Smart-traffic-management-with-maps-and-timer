function showPage(pageId) {
    document.querySelectorAll('.page').forEach(div => div.style.display = 'none');
    const page = document.getElementById(pageId);
    if (page) page.style.display = 'block';
}

// Update traffic data every 2 seconds
setInterval(async () => {
    try {
        const response = await fetch('/api/traffic-data');
        const data = await response.json();
        if (data.length > 0) {
            document.getElementById("traffic").innerText = "Current Traffic: " + data[0].level;
        }
    } catch (error) {
        console.error('Error fetching traffic data:', error);
    }
}, 2000);

function setSignal(color) {
    const signal = document.getElementById("signal");
    signal.innerText = color;
    signal.style.color = color.toLowerCase();
}

function startTimer() {
    const seconds = parseInt(document.getElementById("timer").value);
    let counter = seconds;
    document.getElementById("timerStatus").innerText = `Timer Started: ${counter}s`;

    const interval = setInterval(() => {
        counter--;
        document.getElementById("timerStatus").innerText = `Remaining: ${counter}s`;
        if (counter <= 0) {
            clearInterval(interval);
            document.getElementById("timerStatus").innerText = "Timer Complete!";
        }
    }, 1000);
}

async function submitFeedback(e) {
    e.preventDefault();
    const message = document.getElementById("feedbackMsg").value;
    
    try {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (response.ok) {
            document.getElementById("feedbackMsg").style.display = "none";
            document.getElementById("feedbackThanks").style.display = "block";
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
    }
}

async function submitIncident(e) {
    e.preventDefault();
    const description = document.getElementById("incidentText").value;
    
    try {
        const response = await fetch('/api/incidents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
        });

        if (response.ok) {
            const list = document.getElementById("incidentList");
            const item = document.createElement("li");
            item.textContent = description;
            list.appendChild(item);
            document.getElementById("incidentText").value = "";
        }
    } catch (error) {
        console.error('Error submitting incident:', error);
    }
}