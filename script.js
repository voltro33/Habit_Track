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
    let resetEvery = parseInt(item[4], 10);
    let today = new Date();

    let daysSinceLastCompletion = (today - lastReset) / (1000 * 60 * 60 * 24);

    if (daysSinceLastCompletion >= resetEvery) {
        item[2] = 0;
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
    let newHabit = ["Go to Gym", 1, 2, today.toISOString(), 7];
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

    let today = new Date();
    let newHabit = [name, streak, total, today.toISOString(), resetEvery];
    habits.push(newHabit);
    localStorage.setItem("habits", JSON.stringify(habits));

    updateTable();
    updateAdVisibility();
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
