$(function(){
console.log('inside jquery doc ready');
$('#book-form').on('submit',addBook);
getBooks();
});


function getBooks(){

  $.ajax({
    url:'/books',
    type:'GET',
    success:displayBooks
  });
}
function addBook(){
event.preventDefault();
var formData=$(this).serialize();
console.log('formData',formData);
$.ajax({
  url:'/books',
  type:'POST',
  data:formData,
  success:getBooks
});

}



function displayBooks(books) {
  console.log('Got books from the server', books);
  $('#book-list').empty();
  books.forEach(function(book) {
    var $li = $('<li></li>');
    $li.append('<p><strong>' + book.title + '</strong></p>');
    $li.append('<p><em>' + book.author + '</em></p>');
    var date = new Date(book.publication_date).toDateString();
    $li.append('<p><time>' + date + '</time></p>');
    $li.append('<p>' + book.edition + '</p>')
    $li.append('<p>' + book.publisher + '</p>')

   $('#book-list').append($li);
  }); // end forEach
}// end displayBooks
