// navigation

document.addEventListener('DOMContentLoaded', function () {

    const headerMenu = document.querySelector('#header-menu');
    const navIcon = document.querySelector('#nav-icon');
    const bodyEl = document.body;
    const menuItems = headerMenu.querySelectorAll('li');

    navIcon.addEventListener('click', function () {
        this.classList.toggle('nav-icon--active');
        headerMenu.classList.toggle('header-menu--active');
        bodyEl.classList.toggle('lock');

        // появление ссылок по очереди
        let delay = 0;
        for (let i = 0; i < menuItems.length; i++) {
            setTimeout(function () {
                menuItems[i].classList.toggle('li--animate');
            }, 50 + delay);
            delay += 100
        }
    });

    headerMenu.addEventListener('click', function () {
        this.classList.remove('header-menu--active');
        navIcon.classList.remove('nav-icon--active');
        bodyEl.classList.remove('lock');
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('li--animate');
        }
    })
});


// перемещение фейкплейсхолдера, плейсхолдер в фокусе и нет

const formItems = document.querySelectorAll('.form-input');

for (let item of formItems) {
    const thisParent = item.closest('.form-item');
    const thisPlaceholder = thisParent.querySelector('.fake-placeholder');

    // если input в фокусе
    item.addEventListener('focus', function () {
        thisPlaceholder.classList.add('active');
    });

    // если input теряет фокус
    item.addEventListener('blur', function () {
        if (item.value.length > 0) {
            thisPlaceholder.classList.add('active');
        }
        else {
            thisPlaceholder.classList.remove('active');
        }
    })
}

// FORM VALIDATE

$('.contact-form').validate({
    rules: {
        email: {
            required: true,
            email: true
        },

        message: {
            required: true
        }
    },
    messages: {
        email: {
            required: 'Введите email',
            email: 'Отсутствует символ @'
        },

        message: {
            required: 'Поле не должно быть пустым'
        }
    },
    submitHandler: function (form) {
        ajaxFormSubmit();
    }
});

//*************************************************** */
// Функция AJAX запрса на сервер

function ajaxFormSubmit() {

    let string = $(".contact-form").serialize(); // Соханяем данные введенные в форму в строку.

    //Формируем ajax запрос
    $.ajax({
        type: "POST", // Тип запроса - POST
        url: "php/mail.php", // Куда отправляем запрос
        data: string, // Какие даные отправляем, в данном случае отправляем переменную string

        // Функция если все прошло успешно
        success: function (html) {
            $(".contact-form").slideUp(800);
            $('#answer').html(html);
        }
    });
    // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
    return false;
}


// BACK TOP ICON
const backTopBtn = document.querySelector('#backtop');

backTopBtn.style.opacity = 0;

document.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        backTopBtn.style.opacity = 1;
    } else {
        backTopBtn.style.opacity = 0;
    }
});