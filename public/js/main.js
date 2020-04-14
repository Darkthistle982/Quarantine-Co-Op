//doc ready function to make sure js loads correctly
$(document).ready(function() {
  //main function to clear/load all content
  function loadAllMedia() {
    $.get("/api/findAll", function(data) {
      $(".inStockList").empty();
      $(".checkedOutList").empty();
      createItem(data);
    });
  }
  //onclick function ajax call to register return item route
  $(document).on("click", ".returnItem", function() {
    $.ajax({
      url: "/api/return/" + this.id,
      method: "PUT",
      data: this.id
    }).then(loadAllMedia);
  });
  //onclick function ajax call to register check out button route
  $(document).on("click", ".checkOutBtn", function() {
    $.ajax({
      url: "/api/checkout/" + this.id,
      method: "PUT",
      data: this.id
    }).then(loadAllMedia);
  });
  //post on click button to run the logic for the add item button to add item route
  $("#addItem").on("click", function() {
    event.preventDefault();
    let newMedia = {
      title: $("#item-name")
        .val()
        .trim(),
      authorCreator: $("#authorCreator")
        .val()
        .trim(),
      genre: $("#genre-type")
        .val()
        .trim(),
      rating: $("#rating")
        .val()
        .trim(),
      mediaType: $("#mediaType").val()
    };
    $.post("/api/addNew", newMedia, function() {
      loadAllMedia();
    });
  });
  //function to check if item is in stock or not and sort the items into their columns
  function createItem(data) {
    $.each(data, function(request, response) {
      if (response.checkedOut === false) {
        buildInStockListItem(response);
      } else {
        buildOutofStockListItem(response);
      }
    });
  }
  //function that dynamically builds the in stock block items and inserts them into the dom
  function buildInStockListItem(response) {
    let $newListItem = $("<li>");
    $newListItem.addClass("bg-light border border-dark rounded ml-1 mb-1 p-1");
    $newListItem.append("<p>" + response.title + "</p>");
    $newListItem.append(
      "<p>Author/Creator: " + response.authorCreator + "</p>"
    );
    $newListItem.append("<p>Genre: " + response.genre + "</p>");
    $newListItem.append("<p>Rating: " + response.rating + "</p>");
    $newListItem.append("<p>Media Type: " + response.mediaType + "</p>");
    $newListItem.append(
      "<button class='btn btn-sm btn-dark checkOutBtn' id='" +
        response.id +
        "' type='button'>Check Out</button></form>"
    );
    $(".inStockList").append($newListItem);
  }
  //function to dynamically build the checked out item blocks and insert them into the DOM
  function buildOutofStockListItem(response) {
    let $newListItem = $("<li>");
    $newListItem.addClass("bg-light border border-dark mt-1 mb-1 p-1");
    $newListItem.append("<p>" + response.title + "</p>");
    $newListItem.append(
      "<p>Author/Creator: " + response.authorCreator + "</p>"
    );
    $newListItem.append("<p>Genre: " + response.genre + "</p>");
    $newListItem.append("<p>Rating: " + response.rating + "</p>");
    $newListItem.append("<p>Media Type: " + response.mediaType + "</p>");
    $newListItem.append(
      "<button class='btn btn-sm btn-danger returnItem' id='" +
        response.id +
        "' type='button'>Return Item</button></form>"
    );

    $(".checkedOutList").append($newListItem);
  }

  /*Scroll to top when arrow up clicked BEGIN*/
  $(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
      $("#back2Top").fadeIn();
    } else {
      $("#back2Top").fadeOut();
    }
  });
  $(document).ready(function() {
    $("#back2Top").click(function(event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
  });
  /*Scroll to top when arrow up clicked END*/
  //initial call to load the main page upon arriving
  loadAllMedia();
});
