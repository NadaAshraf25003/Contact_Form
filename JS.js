 // Localstorge
      var name_user = document.querySelector("#name");
      var email_user = document.querySelector("#email");
      var card_user = document.querySelector("#card");
      var num_users = document.querySelector(".num_users");
      var search_input = document.querySelector("#search_input").value;
      var search_button = document.querySelector("#search_button");
      var search_result = document.querySelector("#search_result");
      var contact_form = document.querySelector("#contact_form");

      // table
      var t_name = document.querySelector("#t_name");
      var t_email = document.querySelector("#t_email");
      var t_card = document.querySelector("#t_card");
      var tbody = document.querySelector("#tbody");
      var table = document.querySelector(".table");

      var index = localStorage.length;
      var ADD_USER = contact_form.addEventListener("submit", function (e) {
        e.preventDefault();
        index++;
        var user = {
          name: name_user.value,
          email: email_user.value,
          card: card_user.value,
          id: index,
        };
        localStorage.setItem(index, JSON.stringify(user));
        var user_arr = JSON.parse(localStorage.getItem(index));
        add_user(user_arr);

        tbody.innerHTML = "";
        loadAllUsers();
        contact_form.reset();
      });

      // to load all users from local storage and display them in the table
      function loadAllUsers() {
        if (localStorage.length == 0) {
          table.style.display = "none";
          console.log(0);
        } else {
          table.style.display = "block";
          num_users.innerHTML = localStorage.length;
          for (let i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var item = JSON.parse(localStorage.getItem(key));
            if (item && item.name && item.email) {
              add_user(item);
            }
          }
        }
      }
      loadAllUsers();

      // to create the row
      function add_user(user_arr) {
        tbody.innerHTML += `
    <tr data-id="${user_arr.id}">
            <td id="t_name">${user_arr.name}</td>
            <td id="t_email">${user_arr.email}</td>
            <td id="t_card">${user_arr.card}</td>
            <td><i class="${document.querySelector("#save").checked? "fa-solid fa-download" : "fa-solid fa-trash"}"></i></td>
            <td><i class="fa-solid fa-pen-to-square"></i></td>
            <td><i class="fa-solid fa-trash"></i></td>
          </tr>
    `;
      }

      
      // To delete && edit item
      tbody.addEventListener("click", function (e) {
        // Check if the clicked element is a delete icon
        if (e.target.classList.contains("fa-trash")) {
          // Get the row of the clicked icon
          var row = e.target.closest("tr");
          var userId = row.getAttribute("data-id");

          // Get the name from the first <td> (name column)
          var userName = row.cells[0].textContent;
          if (confirm(`Are you sure you want to delete user: ${userName}?`)) {
            row.remove();
            localStorage.removeItem(userId);
            console.log(userId);
          }
        }

        //   Check if the clicked element is a edit icon
        if (e.target.classList.contains("fa-pen-to-square")) {
          var row = e.target.closest("tr");
          var userId = row.getAttribute("data-id");
          var user = JSON.parse(localStorage.getItem(userId));

          // Fill form with user's data
          name_user.value = user.name;
          email_user.value = user.email;
          card_user.value = user.card;
          editId = userId; // set editing mode
          localStorage.removeItem(userId); // Call add user function to update user
          ADD_USER;
        }
      });

      // To search item
     search_button.addEventListener("click", function (e) {
  e.preventDefault();
  var item;
  var searchText = search_input.trim().toLowerCase(); // Get live input
  var found = false;

  for (let i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    item = JSON.parse(localStorage.getItem(key));

    if (
      item &&
      (item.name.toLowerCase() === searchText ||
        item.email.toLowerCase() === searchText)
    ) {
      search_result.innerHTML = `✅ <strong>Found:</strong><br>User Name: ${item.name}<br>User Email: ${item.email}`;
      found = true;
      break;
    }
  }

  if (!found) {
    search_result.innerHTML = `❌ <strong>No match found.</strong>`;
  }
});
