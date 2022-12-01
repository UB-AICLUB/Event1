// logic to use and dowmload the weights as brain .txt file

var download = document.getElementById('download'),
brain = localStorage.getItem("bestBrain")

download.addEventListener('click', function () {
var link = document.createElement('a');
link.setAttribute('download', 'brain.txt');
link.href = makeTextFile(brain);
document.body.appendChild(link);

window.requestAnimationFrame(function () {
  var event = new MouseEvent('click');
  link.dispatchEvent(event);
  document.body.removeChild(link);
});

}, false);

makeTextFile = function (text) {
  var textFile = null
  var data = new Blob([text], {type: 'text/plain'});
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }
  textFile = window.URL.createObjectURL(data);
  return textFile;
};


upload = document.getElementById('upload');
upload.addEventListener('change', function() {
  var fr=new FileReader();
  fr.onload=function(){
      console.log(fr.result);
      brain = fr.result;
      localStorage.setItem("bestBrain",brain);
  }  
  fr.readAsText(this.files[0]);
})