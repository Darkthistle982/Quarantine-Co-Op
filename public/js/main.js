$(document).ready(function() {
  function loadAllMedia() {
    $.get("/api/findAll", function(data) {
      $.each(data.Media, function() {
        if (data.Media.dataValues.checkedOut === false) {
          console.log("This worked.");
        }
      });
    });
  }

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
  loadAllMedia();

  function createItem() {
    let $newListItem = $("<ul>");
    $newListItem.addClass("bg-light border border-dark rounded ml-1 mb-1 p-1");
    $newListItem.append("<p>" + data.Media.dataValues.title + "</p>");
    $("#inStockList").append($newListItem);
  }
});
