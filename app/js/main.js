//Это трогать не нужно 
$(function () {

  $(".menu a, .go-top").on("click", function (e) {
    e.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 2000);
  });
  $('.menu__btn').on('click', function () {
    $('.menu__list').toggleClass('menu__list--active');
  });
  $('.reviews__slider').slick({
    arrows: false,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 815,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });
  $('.catalog__item-content-center').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });
});
$(document).ready(function($) {
	$('.request__btn, .request__btn-feedback').click(function() {
		$('.form').fadeIn();
		return false;
	});	
	
	$('.btn-close').click(function() {
		$(this).parents('.form').fadeOut();
		return false;
	});		
 
	$(document).keydown(function(e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.form').fadeOut();
		}
	});
	
	$('.form').click(function(e) {
		if ($(e.target).closest('.form__body').length == 0) {
			$(this).fadeOut();					
		}
	});
});
//Это Твоё
function send(event, php){
      console.log("Отправка запроса");
      event.preventDefault ? event.preventDefault() : event.returnValue = false;
      var req = new XMLHttpRequest();
      req.open('POST', php, true);
      req.onload = function() {
          if (req.status >= 200 && req.status < 400) {
          json = JSON.parse(this.response); // Ебанный internet explorer 11
              console.log(json);
              
              // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
              if (json.result == "success") {
                  // Если сообщение отправлено
                  alert("Сообщение отправлено");
              } else {
                  // Если произошла ошибка
                  alert("Ошибка. Сообщение не отправлено");
              }
          // Если не удалось связаться с php файлом
          } else {alert("Ошибка сервера. Номер: "+req.status);}}; 
      
      // Если не удалось отправить запрос. Стоит блок на хостинге
      req.onerror = function() {alert("Ошибка отправки запроса");};
      req.send(new FormData(event.target));
}
//Это у меня Было
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);
  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);
    let formData = new FormData(form);
    if (error === 0) {
      form.classList.add('_senting');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('._sending');
      } else {
        alert("Ошибка");
        form.classList.remove('._sending');
      }
    } else {
      alert('Заполните обязательные поля')
    }

  }
  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');
    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});