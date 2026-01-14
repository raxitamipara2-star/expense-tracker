let data = JSON.parse(localStorage.getItem("data")) || [];

function add() {
  let date = document.getElementById("date").value;
  let desc = document.getElementById("desc").value;
  let cat = document.getElementById("cat").value;
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;

  if (date === "" || desc === "" || cat === "" || amount === "") {
    alert("Please fill all fields");
    return;
  }

  let obj = {
    date,
    desc,
    cat,
    amt: Number(amount),
    type
  };

  data.push(obj);
  localStorage.setItem("data", JSON.stringify(data));
  render();
}

function del(i) {
  data.splice(i, 1);
  localStorage.setItem("data", JSON.stringify(data));
  render();
}

function render() {
  let income = 0, expense = 0;
  let list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((d, i) => {
    if (d.type === "income") income += d.amt;
    else expense += d.amt;

    list.innerHTML += `
      <tr>
        <td>${d.date}</td>
        <td>${d.desc}</td>
        <td>${d.cat}</td>
        <td>${d.amt}</td>
        <td>${d.type}</td>
        <td><button onclick="del(${i})">Delete</button></td>
      </tr>
    `;
  });

  document.getElementById("income").innerText = income;
  document.getElementById("expense").innerText = expense;
  document.getElementById("balance").innerText = income - expense;
}

render();
