// TODO: when removing, subtract item price from total
// TODO: seat booking

// TICKET BOOKING //
var extrasGrid = document.querySelector(".grid-extras");
var itemContainer = document.querySelector(".item-container");
var total = document.querySelector(".total");

var tempTotal = 0;

//Add Extras
extrasGrid.addEventListener("click", function(e) {
  if (e.target.classList.contains("popcorn")) {
    console.log("popcorn clicked");
    AddItem("popcorn", "popcorn", "25");
    // CalcTotal();
  }
  if (e.target.classList.contains("coke")) {
    console.log("coke clicked");
    AddItem("coke", "Coke", 12);
    // CalcTotal();
  }
});

//Remove Item
itemContainer.addEventListener("click", function(e) {
  if (e.target.classList.contains("remove")) {
    var li = e.target.parentElement;
    li.remove();
  }
});

function AddItem(id, item_Name, item_price) {
  //Parent
  var itemList = document.querySelector(".items-list");

  //Children

  var li = document.createElement("li");
  li.className = "item";
  li.id = id;

  var itemName = document.createElement("span");
  itemName.className = "item-name";

  var remove = document.createElement("span");
  remove.className = "remove";

  var price = document.createElement("span");
  price.className = "price";

  //Construct Li
  itemName.appendChild(document.createTextNode(`${item_Name}: `));
  remove.appendChild(document.createTextNode("x"));
  price.appendChild(document.createTextNode(`R${item_price}.00`));
  li.appendChild(itemName);
  li.appendChild(remove);
  li.appendChild(price);
  itemList.append(li);

  CalcTotal();
}

function CalcTotal() {
  var itemList = document.querySelector(".items-list");
  var items = itemList.querySelectorAll(".item");
  var price = 0;
  Array.from(items).forEach(function(item) {
    itemName = item.id;
    console.log(itemName);
    console.log(tempTotal);
    switch (itemName) {
      case "popcorn":
        price = 25;
        break;
      case "coke":
        price = 12;
        break;
    }
  });

  tempTotal += price;

  var totalPrice = document.querySelector(".total .price");
  totalPrice.textContent = `R${tempTotal}.00`;
}
