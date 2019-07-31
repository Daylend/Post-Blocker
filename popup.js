// Saves options to chrome.storage
function save_options() {
  var filters = document.getElementById('filters').value;
  chrome.storage.sync.set({
    filters: filters,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('save');
    status.value = 'Saved!';
    setTimeout(function() {
      status.value = 'Save';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    filters: 'justin, bieber, yolo, swag, anything you want, even multiple words!',
  }, function(items) {
    document.getElementById('filters').value = items.filters;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);