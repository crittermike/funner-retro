setTimeout(function() {
  const sidebar = document.querySelector('.sidebar-body');
  const button = document.createElement('button');
  button.innerHTML = '<i class="fa fa-check "></i>Show/hide votes';
  button.setAttribute('class', 'normal-button toggle-votes');
  sidebar.appendChild(button);

  button.onclick = function() {
    document.querySelectorAll('.message-votes').forEach(function(el) {
      el.classList.toggle('show-vote-count');
      el.classList.toggle('hide-vote-count');
    });
    document.querySelectorAll('.unvote-link').forEach(function(el) {
      el.classList.toggle('show-vote-count');
      el.classList.toggle('hide-vote-count');
    });
  }
}, 3000);
