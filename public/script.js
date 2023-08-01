var checkbox = $(".checkbox");
checkbox.on("change", function () {
  if ($(this).is(":checked")) {
    $(".task-content" + $(this).attr("id")).addClass("check-pressed");
  } else {
    $(".task-content" + $(this).attr("id")).removeClass("check-pressed");
  }
});
