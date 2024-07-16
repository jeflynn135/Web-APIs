function showHighscores() {
    // get scores from localstorage
    var score = JSON.parse(window.localStorage.getItem('score')) || [];
  
    // display on page
    var scores = document.getElementById('scores');
    for (var i=0; i<score.length; i++){
      var li = document.createElement("li")
      li.textContent = `player ${score[i].initials} score ${score[i].score}`;
      scores.append(li)
    }
  }
    
  // run function when page loads
  showHighscores();
  