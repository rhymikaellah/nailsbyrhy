const designs = [
  { id: 1, name: "Classic French Tip", price: 300 },
  { id: 2, name: "Glitter Ombre", price: 400 },
  { id: 3, name: "Marble Design", price: 450 },
  { id: 4, name: "Matte Finish", price: 350 },
  { id: 5, name: "Floral Art", price: 500 },
  { id: 6, name: "Rhinestone Glam", price: 600 },
  { id: 7, name: "Chrome Nails", price: 550 },
  { id: 8, name: "Animal Print", price: 480 },
  { id: 9, name: "Geometric Patterns", price: 420 },
  { id: 10, name: "Minimalist Lines", price: 380 }
];

let queue = [];
let receipts = [];

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
  document.getElementById("message").textContent = "";

  if (sectionId === "designs") showDesigns();
  if (sectionId === "queue") updateQueueDisplay();
  if (sectionId === "receipts") updateReceiptsDisplay();
  if (sectionId === "addCustomer") loadDesignChoices();
}

function showDesigns() {
  const ul = document.getElementById("nail-designs");
  ul.innerHTML = "";
  designs.forEach(d => {
    const li = document.createElement("li");
    li.textContent = `${d.id}. ${d.name} - ₱${d.price}`;
    ul.appendChild(li);
  });
}

function loadDesignChoices() {
  const select = document.getElementById("design-choice");
  select.innerHTML = "";
  designs.forEach(d => {
    const option = document.createElement("option");
    option.value = d.id;
    option.textContent = `${d.name} - ₱${d.price}`;
    select.appendChild(option);
  });
}

function addCustomer() {
  const name = document.getElementById("customer-name").value;
  const designId = parseInt(document.getElementById("design-choice").value);
  const design = designs.find(d => d.id === designId);

  if (!name || !design) return alert("Enter name and choose a design.");

  const customer = { name, design };
  queue.push(customer);

  const now = new Date();
  const receipt = `
    <pre>
=== RECEIPT ===
Customer Name : ${customer.name}
Nail Design   : ${customer.design.name}
Price         : ₱${customer.design.price}
Date          : ${now.toLocaleString()}
==========================
Thank you for choosing our nail salon!
    </pre>
  `;

  receipts.push(receipt);
  document.getElementById("receipt-output").innerHTML = receipt;
  document.getElementById("customer-name").value = "";
}

function updateQueueDisplay() {
  const ul = document.getElementById("customer-queue");
  ul.innerHTML = "";
  queue.forEach((c, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${c.name} - ${c.design.name} (₱${c.design.price})`;
    ul.appendChild(li);
  });
}

function updateReceiptsDisplay() {
  const div = document.getElementById("receipts-output");
  div.innerHTML = receipts.join("<hr>");
}

function exitSystem() {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById("message").textContent = "Thank you for using the system!";
}
