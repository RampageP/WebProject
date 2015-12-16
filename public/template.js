var noteTemplate_notStarred = _.template(
  "<p class='note-id' hidden><%= id %></p>" +
  "<h3><%= title %></h3>" +
  "<p>Create Time: <p class='note-create-time'><%= create_time %></p></p>" +
  // "<p>Modified Time: <%= modify_time %></p>" +
  // "<p>Reminder: <%= remind_info %></p>" +
  // "<p>Attachment: <%= attachment_path %></p>" +
  "<span class='glyphicons glyphicons-star-empty'></span>" +
  "<p class='note-content'><%= contents %></p>"
);


var noteTemplate_starred = _.template(
  "<p class='note-id' hidden><%= id %></p>" +
  "<h3><%= title %></h3>" +
  "<p>Create Time: <p class='note-create-time'><%= create_time %></p></p>" +
  // "<p>Modified Time: <%= modify_time %></p>" +
  // "<p>Reminder: <%= remind_info %></p>" +
  // "<p>Attachment: <%= attachment_path %></p>" +
  "<span class='glyphicons glyphicons-star'></span>" +
  "<p class='note-content'><%= contents %></p>"
);
