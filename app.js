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
    { id: 10, name: "Minimalist Lines", price: 380 },
  ];
  
  let customerQueue = [];
  let receipts = [];
  
  function showTab(tabId) {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => tab.style.display = "none");
    document.getElementById(tabId).style.display = "block";
  
    if (tabId === "designs") showNailDesigns();
    if (tabId === "addCustomer") loadDesignOptions();
    if (tabId === "queue") showCustomerQueue();
    if (tabId === "receipts") showPrintedReceipts();
  }
  
  function showNailDesigns() {
    const list = document.getElementById("nail-designs");
    list.innerHTML = "";
    designs.forEach(design => {
      const li = document.createElement("li");
      li.textContent = `${design.id}. ${design.name} - ₱${design.price}`;
      list.appendChild(li);
    });
  }
  
  function loadDesignOptions() {
    const select = document.getElementById("design-choice");
    select.innerHTML = "";
    designs.forEach(design => {
      const option = document.createElement("option");
      option.value = design.id;
      option.textContent = `${design.name} - ₱${design.price}`;
      select.appendChild(option);
    });
  }
  
  function addCustomer() {
    const name = document.getElementById("customer-name").value.trim();
    const designId = parseInt(document.getElementById("design-choice").value);
  
    if (!name || isNaN(designId)) {
      alert("Please enter customer name and choose a design.");
      return;
    }
  
    const customer = { name, designChoice: designId };
    customerQueue.push(customer);
    printReceipt(customer);
  
    document.getElementById("customer-name").value = "";
  }
  
  function printReceipt(customer) {
    const design = designs.find(d => d.id === customer.designChoice);
    const date = new Date().toLocaleString();
    const receipt = `=== RECEIPT ===
  Customer Name : ${customer.name}
  Nail Design   : ${design.name}
  Price         : ₱${design.price}
  Date          : ${date}
  ==========================
  Thank you for choosing our nail salon!`;
  
    receipts.push(receipt);
    document.getElementById("receipt-output").textContent = receipt;
  }
  
  function showCustomerQueue() {
    const list = document.getElementById("customer-queue");
    list.innerHTML = "";
    if (customerQueue.length === 0) {
      list.innerHTML = "<li>No customers in queue.</li>";
      return;
    }
    customerQueue.forEach((customer, i) => {
      const design = designs.find(d => d.id === customer.designChoice);
      const li = document.createElement("li");
      li.textContent = `${i + 1}. ${customer.name} - ${design.name} (₱${design.price})`;
      list.appendChild(li);
    });
  }
  
  function showPrintedReceipts() {
    const output = document.getElementById("receipts-output");
    output.innerHTML = "";
    if (receipts.length === 0) {
      output.textContent = "No printed receipts yet.";
      return;
    }
    receipts.forEach((receipt, i) => {
      const div = document.createElement("div");
      div.textContent = `Receipt ${i + 1}:\n${receipt}`;
      div.style.marginBottom = "20px";
      output.appendChild(div);
    });
  }
  
 
  window.onload = () => showTab("home");
  