// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.address = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact, address) {
  contact.id = this.assignId();
  address.id = contact.id;
  this.contacts[contact.id] = contact;
  this.address[address.id] = address;
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
}

AddressBook.prototype.findAddress = function(id) {
  if (this.address[id] != undefined) {
    return this.address[id];
  }
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}

function Address(street, city, state, zip) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber,emailAddress,) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};
 
function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  const address = addressBook.findAddress(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".street").html(address.street);
  $(".city").html(address.city);
  $(".state").html(address.state);
  $(".zip").html(address.zip);
  let buttonDelete = $("#button-delete");
  let buttonAddress = $("#button-add-address");
  buttonDelete.empty();
  buttonAddress.empty();
  buttonDelete.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
  buttonAddress.append("<button class='addAddress' id=" + contact.id + ">Add Address</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#button-delete").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();
    const inputtedStreet = $("input#new-street").val();
    const inputtedCity = $("input#new-city").val();
    const inputtedState = $("input#new-state").val();
    const inputtedZip = $("input#new-zip").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-street").val("");
    $("input#new-city").val("");
    $("input#new-state").val("");
    $("input#new-zip").val("");
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber,inputtedEmailAddress);
    let newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedZip);
    addressBook.addContact(newContact, newAddress);
    displayContactDetails(addressBook);
  });
});