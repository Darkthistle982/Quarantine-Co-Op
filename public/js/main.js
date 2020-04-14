$(document).ready(function() {
  function loadAllMedia() {
    $.get("/api/findAll", function(data) {
      $(".inStockList").empty();
      $(".checkedOutList").empty();
      createItem(data);
    });
  }

  $(document).on("click", ".returnItem", function() {
    $.ajax({
      url: "/api/return/" + this.id,
      method: "PUT",
      data: this.id
    }).then(loadAllMedia);
  });

  $(document).on("click", ".checkOutBtn", function() {
    $.ajax({
      url: "/api/checkout/" + this.id,
      method: "PUT",
      data: this.id
    }).then(loadAllMedia);
  });

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

  function createItem(data) {
    $.each(data, function(request, response) {
      if (response.checkedOut === false) {
        buildInStockListItem(response);
      } else {
        buildOutofStockListItem(response);
      }
    });
  }

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

  loadAllMedia();
});
