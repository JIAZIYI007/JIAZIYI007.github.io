document.getElementById('commentForm').addEventListener('submit', function(event) {
  event.preventDefault(); // 阻止表单默认提交行为

  // 获取评论内容，如果需要用户名，可以取消注释并相应地修改代码
  // var username = document.getElementById('username').value || '匿名';
  var comment = document.getElementById('comment').value;
  
  var newComment = {
    // username: username,
    username: '匿名', // 默认匿名用户名
    comment: comment,
    timestamp: new Date().getTime()
  };

  // 存储评论到JSON
  saveComment(newComment);

  // 清空输入框
  // document.getElementById('username').value = '';
  document.getElementById('comment').value = '';
});

function saveComment(comment) {
  var comments = localStorage.getItem('comments');
  comments = comments ? JSON.parse(comments) : [];
  comments.push(comment);
  localStorage.setItem('comments', JSON.stringify(comments));
  displayComments();
}

function displayComments() {
  var comments = localStorage.getItem('comments');
  comments = comments ? JSON.parse(comments) : [];
  var commentsContainer = document.getElementById('comments');
  commentsContainer.innerHTML = ''; // 清空现有评论

  comments.forEach(function(comment) {
    var commentElement = document.createElement('p');
    commentElement.innerHTML = `<strong>${comment.username}</strong>:${comment.comment} <small>(${new Date(comment.timestamp).toLocaleString()})</small>`;
    commentsContainer.appendChild(commentElement);
  });
}

// 清除评论按钮的事件监听器
document.getElementById('clearComments').addEventListener('click', function() {
  localStorage.removeItem('comments');
  displayComments();
});

// 页面加载时显示评论
window.onload = displayComments;

document.getElementById('commentForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var comment = document.getElementById('comment').value;
  var newComment = {
    username: '匿名',
    comment: comment,
    timestamp: new Date().getTime()
  };
  saveComment(newComment);
  document.getElementById('comment').value = '';
});

function saveComment(comment) {
  var comments = localStorage.getItem('comments');
  comments = comments ? JSON.parse(comments) : [];
  comments.push(comment);
  localStorage.setItem('comments', JSON.stringify(comments));
  displayComments();
}

function displayComments() {
  var comments = localStorage.getItem('comments');
  comments = comments ? JSON.parse(comments) : [];
  var commentsContainer = document.getElementById('comments');
  commentsContainer.innerHTML = '';

  comments.forEach(function(comment, index) {
    var commentElement = document.createElement('div');
    commentElement.innerHTML = `
      <p>
        <strong>${comment.username}</strong>:${comment.comment}
        <small>(${new Date(comment.timestamp).toLocaleString()})</small>
        <button class="delete-comment" data-index="${index}">删除</button>
      </p>
    `;
    commentsContainer.appendChild(commentElement);
  });

  document.querySelectorAll('.delete-comment').forEach(button => {
    button.addEventListener('click', function() {
      var index = this.getAttribute('data-index');
      if (confirm('确定要删除这条评论吗？')) {
        deleteComment(index);
      }
    });
  });
}

function deleteComment(index) {
  var comments = localStorage.getItem('comments');
  comments = JSON.parse(comments);
  comments.splice(index, 1);
  localStorage.setItem('comments', JSON.stringify(comments));
  displayComments();
}

document.getElementById('clearComments').addEventListener('click', function() {
  if (confirm('确定要清除所有评论吗？')) {
    localStorage.removeItem('comments');
    displayComments();
  }
});

window.onload = displayComments;
