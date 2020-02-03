// DONE: when removing, subtract item price from total
//
// TODO: seat booking
// TODO: add price when hover over extra

// TICKET BOOKING //
var extrasGrid = document.querySelector('.grid-extras');
var itemContainer = document.querySelector('.item-container');
var total = document.querySelector('.total');
var seatsGrid = document.querySelector('.grid-seats');
var btnCheckout = document.querySelector('.btn-checkout');

var tempTotal = 0;
var checkout = false;

//Add Extras
extrasGrid.addEventListener('click', function(e) {
  if (!checkout) {
    if (
      e.target.classList.contains('popcorn') ||
      e.target.id == 'popcorn-price'
    ) {
      AddItem('popcorn', 'Popcorn', '25');
      CalcTotal();
    }
    if (e.target.classList.contains('coke') || e.target.id == 'coke-price') {
      AddItem('coke', 'Coke', 12);
      CalcTotal();
    }
  }
});

//Remove Item
itemContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('remove')) {
    //checks which item was removed then subtracts accordingly
    if (e.target.parentElement.id == 'popcorn') {
      console.log('POPCOOOOORRRRNNNN');
      tempTotal -= 25;
      var totalPrice = document.querySelector('.total .price');
      totalPrice.textContent = `R${tempTotal}.00`;
    }
    if (e.target.parentElement.id == 'coke') {
      console.log('COOOOOOKKKKEEEE');
      tempTotal -= 12;
      var totalPrice = document.querySelector('.total .price');
      totalPrice.textContent = `R${tempTotal}.00`;
    }
    if (e.target.parentElement.id == 'ticket') {
      console.log('TIIIIICCCKKKKEEEETTT');
      tempTotal -= 60;
      var totalPrice = document.querySelector('.total .price');
      totalPrice.textContent = `R${tempTotal}.00`;
      //Remove Reserved Seats
      seats = document.querySelectorAll('.seats');
      var found = false;
      var i = 0;
      while (!found) {
        if (seats[i].classList.contains('reserved-seat')) {
          seats[i].classList.remove('reserved-seat');
          seats[i].classList.add('available');
          found = true;
        }
        i++;
      }
    }
    //remove item
    var li = e.target.parentElement;
    li.remove();
  }

  //checks if array is empty then returns R0.00
  var itemList = document.querySelector('.items-list');
  var items = itemList.querySelectorAll('.item');
  if (items.length == 0) {
    tempTotal = 0;
    var totalPrice = document.querySelector('.total .price');
    totalPrice.textContent = `R${tempTotal}.00`;
  }
});

//Reserve Seat
seatsGrid.addEventListener('click', function(e) {
  if (!checkout) {
    if (e.target.classList.contains('available')) {
      e.target.classList.add('reserved-seat');
      e.target.classList.remove('hover');
      e.target.classList.remove('available');
      AddItem('ticket', 'Ticket', '60');
      CalcTotal();
    }
  }
});

//Checkout
btnCheckout.addEventListener('click', function(e) {
  var itemList = document.querySelector('.items-list');
  var items = itemList.querySelectorAll('.item');

  if (items.length > 0 && !checkout) {
    CheckoutAnimation();
    //Set seats to taken
    var seatList = document.querySelector('.grid-seats');
    var seats = seatList.querySelectorAll('.seats');
    Array.from(seats).forEach(function(seat) {
      if (seat.classList.contains('reserved-seat')) {
        seat.classList.remove('reserved-seat');
        seat.classList.add('taken-seat');
      }
    });
    //Remove the delete button from the item list
    Array.from(items).forEach(function(item) {
      temp = item.querySelector('.remove');
      temp.remove();
    });
    checkout = true;
  }
});

function AddItem(id, item_Name, item_price) {
  //Parent
  var itemList = document.querySelector('.items-list');

  //Children

  var li = document.createElement('li');
  li.className = 'item';
  li.id = id;

  var itemName = document.createElement('span');
  itemName.className = 'item-name';

  var remove = document.createElement('span');
  remove.className = 'remove';

  var price = document.createElement('span');
  price.className = 'price';

  //Construct Li
  itemName.appendChild(document.createTextNode(`${item_Name}: `));
  remove.appendChild(document.createTextNode('x'));
  price.appendChild(document.createTextNode(`R${item_price}.00`));
  li.appendChild(itemName);
  li.appendChild(remove);
  li.appendChild(price);
  itemList.append(li);
}

function CalcTotal() {
  var itemList = document.querySelector('.items-list');
  var items = itemList.querySelectorAll('.item');
  var price = 0;
  if (items.length > 0) {
    Array.from(items).forEach(function(item) {
      itemName = item.id;
      switch (itemName) {
        case 'popcorn':
          price = 25;
          break;
        case 'coke':
          price = 12;
          break;
        case 'ticket':
          price = 60;
      }
    });
  } else {
    tempTotal = 0;
  }

  tempTotal += price;

  var totalPrice = document.querySelector('.total .price');
  totalPrice.textContent = `R${tempTotal}.00`;
}

function CheckoutAnimation() {
  //Play Checkkout animtion
  btnCheckout.classList.add('checkout-animation');
  //Dot animation
  btnCheckout.firstElementChild.textContent = '.';
  setTimeout(() => {
    btnCheckout.firstElementChild.textContent = '..';
  }, 500);
  setTimeout(() => {
    btnCheckout.firstElementChild.textContent = '...';
  }, 1000);
  setTimeout(() => {
    btnCheckout.firstElementChild.textContent = '....';
  }, 1500);
  setTimeout(() => {
    btnCheckout.firstElementChild.textContent = '...';
  }, 2000);
  setTimeout(() => {
    btnCheckout.firstElementChild.textContent = '..';
  }, 2500);
  setTimeout(() => {
    btnCheckout.firstElementChild.textContent = '...';
  }, 3000);
  setTimeout(() => {
    btnCheckout.firstElementChild.textContent = '....';
  }, 3500);
  setTimeout(() => {
    btnCheckout.firstElementChild.textContent = '...';
  }, 4000);
  //Paid
  setTimeout(() => {
    btnCheckout.firstElementChild.textContent = 'paid';
  }, 4000);
}
