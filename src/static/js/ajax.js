(() => {

const form = document.querySelector('.form');

const action = form.action;
const method = form.method; 

if (!action || !method) return;

form.addEventListener('submit', XMLHttpRequestHandler);

function XMLHttpRequestHandler(e) {
  e.preventDefault(); // Отменяем событие по умолчанию для предотвращения отправки формы.
  
  const require = new XMLHttpRequest(); // Создаем экземпляр объекта - XMLHttpRequestHandler.

  const self = this; // cохраняем ссылку на форму в переменную.

  require.onerror = (e) => console.log('Error ' + e.target.status + ' occurred while receiving the document.'); // Прицепляем событие которое сработает при возникновении ошибки.

  require.open(method, action, true); // Уставливаем true для асинхронной работы.
  require.send(new FormData(self)); // Отпправляем запрос на сервер.

  this.reset(); // Очищаем форму после отправки.

  return false;
}

})();