$(document).ready(function() {
  function loadAllMedia() {
    $.get("/api/findAll", function(data) {
      console.log(data);
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
      mediaType: $("#dropdownMenu2")
        .val()
        .trim()
    };
    $.post("/api/addNew", newMedia, function(data) {
      console.log(data);
    });
  });
  loadAllMedia();
});
