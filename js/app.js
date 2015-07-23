var main = function (toDoObjects) {

	var toDos = toDoObjects.map(function(toDo) {
		return toDo.description;
	});

 	$('.tabs a span').toArray().forEach(function (element) {

 		var $element = $(element);

 		$(element).on('click', function () {
 			var $content,
 				$input,
 				$button,
 				i;

 			var delIcon = $('<span>').text('X').addClass('delete-icon');

 			$('.tabs a span').removeClass('active');
 			$element.addClass('active');
 			$('main .content').empty();

 			if ($element.parent().is(':nth-child(1)')) {

 				$content = $('<ul>');
 				for (i=toDos.length-1; i>=0; i--) {
 					$content.append($('<li>').text(toDos[i]));
 				}

 			} else if ($element.parent().is(':nth-child(2)')) {

 				$content = $('<ul>');
 				toDos.forEach(function(todo) {
 					$content.append($('<li>').text(todo));
 				});

 			} else if ($element.parent().is(':nth-child(3)')) {

 				console.log("Click on tags tab");
 				var $tagName, $content;
 				var organizedByTag = [
 					{
 						"name": "покупки",
 						"toDos": ["Купить продукты "]
 					},
 					{
 						"name": "рутина",
 						"toDos": ["Купить продукты", "Вывести Грейси на прогулку в парк "]
 					}
 				];

 				organizedByTag.forEach(function(tag) {
 					$tagName = $('<h3>').text(tag.name);
 					$content = $('<ul>');

 					tag.toDos.forEach(function(description) {
 						var $li = $('<li>').text(description);
 						$content.append($li);
 					});
 				});

 				$('main .content').append($tagName);
 				$('main .content').append($content);

 			} else if ($element.parent().is(':nth-child(4)')) {

 				$input = $('<input>').addClass('input');
 				$button = $('<button>').text('+').addClass('input-button');

 				$button.on('click', function() {
 					if ($input.val() !== '') {
 						toDos.push($input.val());
 						$input.val('');
 					}
 				});

 				$content = $('<div>').append($input, $button);
 			}

 			$('main .content').append($content);
 			$('.content li').append(delIcon);

 			//animation
 			$('.content li').mouseenter(function() {
 				$(this).find('span').fadeIn(100);
 			});

 			$('.content li').mouseleave(function() {
 				$(this).find('span').fadeOut(100);
 			});

 			//delete list item
 			$('.delete-icon').on('click', function() {

 				var text = $(this).parent().contents().filter(function() {
  					return this.nodeType == 3;
				}).text();

 				var taskIndex = toDos.indexOf(text);

 				console.log(taskIndex);

 				if (taskIndex != -1) {
 					toDos.splice(taskIndex, 1);
 				}
 				console.log(toDos);
 				$(this).parent().remove();
 			});

 			return false;
 		});
 	});

 	$('.tabs a:first-child span').trigger('click');

};

$(document).ready(function() {
	$.getJSON('js/todos.json', function(toDoObjects) {
		main(toDoObjects);
	});
});