let habits = JSON.parse(localStorage.getItem("habits")) || [];

document.addEventListener("DOMContentLoaded", function () {
    let list = document.getElementById("tbodyId");

    updateAdVisibility();

    for (let item of habits) {
        let listItem = document.createElement("tr");
        let count = 0;
        for (let smallItem of item) {
            let listSmallItem = document.createElement("td");

            if (count === 3 && new Date(smallItem) !== "Invalid Date") {
                let lastCompletionDate = new Date(item[3]);
                let today = new Date();

                if (today.toDateString() !== lastCompletionDate.toDateString()) {
                    let button = document.createElement("button");
                    button.innerText = "Mark Complete";
                    button.addEventListener("click", function () {
                        markComplete(item, habits.indexOf(item));
                    });
                    listSmallItem.appendChild(button);
                } else {
                    listSmallItem.innerText = "Complete";
                }
            } else {
                listSmallItem.innerText = smallItem;
            }
            listItem.appendChild(listSmallItem);
            count++;
            if(count == 4) break;
        }
        list.appendChild(listItem);
    }

    document.getElementById("counterValue").innerText = habits.length;
});

function markComplete(item, index) {
    let lastReset = new Date(item[3]);
    let resetInterval = item[4];
    let today = new Date();

    today.setHours(0, 0, 0, 0);
    lastReset.setHours(0, 0, 0, 0);

    let daysSinceLastReset = (today - lastReset) / (1000 * 60 * 60 * 24);

    if (daysSinceLastReset > resetInterval && daysSinceLastReset > 1) {
        item[1] = 0;
    }

    item[1]++;
    item[2]++;
    item[3] = today.toISOString();

    habits[index] = item;
    localStorage.setItem("habits", JSON.stringify(habits));
    location.reload();
}



function incrementCounter() {
    let today = new Date();
    today.setDate(today.getDate() - 1);
    let newHabit = ["Go to Gym", 1, 2, today.toISOString(), 1];
    habits.push(newHabit);
    localStorage.setItem("habits", JSON.stringify(habits));
    document.getElementById("counterValue").innerText = habits.length;
    location.reload();
}

function decrementCounter() {
    if (habits.length > 0) {
        habits.pop();
        localStorage.setItem("habits", JSON.stringify(habits));
        document.getElementById("counterValue").innerText = habits.length;
        location.reload();
    }
}

function updateAdVisibility() {
    const adContainer = document.getElementById("adContainer");
    if (habits.length === 0) {
        adContainer.style.display = "block";
    } else {
        adContainer.style.display = "none";
    }
}

function createHabit() {
    let name = document.getElementById("Name").value;
    let total = parseInt(document.getElementById("Total").value, 10);
    let streak = parseInt(document.getElementById("Streak").value, 10);
    let resetEvery = parseInt(document.getElementById("resetEvery").value, 10);

    if (!name || isNaN(total) || isNaN(streak) || isNaN(resetEvery)) {
        alert("Please fill in all fields");
        return;
    }

    if (Math.min(total, Math.min(streak, resetEvery) <0)) {
        alert("Please don't put a negative number");
        return;
    }

    if (streak > total) {
        alert("You can't have a streak number higher than the total number of days attempted.");
        return;
    }


    let today = new Date();
    today.setDate(today.getDate() - 1);
    let newHabit = [name, streak, total, today.toISOString(), resetEvery];
    habits.push(newHabit);
    localStorage.setItem("habits", JSON.stringify(habits));

    updateTable();
    updateAdVisibility();

    document.getElementById("counterValue").innerText = habits.length;

    document.getElementById("Name").value = '';
    document.getElementById("Total").value = '';
    document.getElementById("Streak").value = '';
    document.getElementById("resetEvery").value = '';
    location.reload();
}

function updateTable() {
    let list = document.getElementById("tbodyId");
    list.innerHTML = ""; 

    for (let item of habits) {
        let listItem = document.createElement("tr");
        let count = 0;
        for (let smallItem of item) {
            let listSmallItem = document.createElement("td");

            if (count === 3 && new Date(smallItem) !== "Invalid Date") {
                let lastCompletionDate = new Date(item[3]);
                let today = new Date();

                if (today.toDateString() !== lastCompletionDate.toDateString()) {
                    let button = document.createElement("button");
                    button.innerText = "Mark Complete";
                    button.addEventListener("click", function () {
                        markComplete(item, habits.indexOf(item));
                    });
                    listSmallItem.appendChild(button);
                } else {
                    listSmallItem.innerText = "Complete";
                }
            } else {
                listSmallItem.innerText = smallItem;
            }
            listItem.appendChild(listSmallItem);
            count++;
            if (count == 4) break;
        }
        list.appendChild(listItem);
    }

    document.getElementById("counterValue").innerText = habits.length;
}
