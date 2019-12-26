document.addEventListener('DOMContentLoaded', function () {    
    var dragged = null;
    var dragStart = null;

    document.querySelectorAll('.time').forEach(function (elementTime) {
        elementTime.addEventListener('dragover', dragoverContainer);
        elementTime.addEventListener('drop', dropContainer);
    });

    document.querySelectorAll('.dragElement').forEach(function (dragElement) {
        dragElement.addEventListener('dragstart', dragstart);
        dragElement.addEventListener('dragend', dragend);
        dragElement.addEventListener('drop', drop);
    });

    function dragstart(event) {
        dragged = this;
    }
    function dragend(event) {
        dragged = null;
    }    
    function drop(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    function dragoverContainer(event) {
        event.preventDefault();
    }
    function dropContainer(event) {
        event.stopPropagation();

        this.appendChild(dragged);        
        console.log('drop: ' + this.getAttribute('data-timeline-second'));      
    }    

    document.querySelector('.button-start').addEventListener('click', function () {
        var buttonStart = this;
        var container = this.closest('.container');
        var timeline = container.querySelector('.auto');        
        var dragElement = container.querySelector('.dragElement');      
        var time = dragElement.parentNode;          

        if (buttonStart.classList.contains('start')) {
            buttonStart.classList.remove('start');            
            buttonStart.innerHTML = 'Старт';
            clearInterval(dragStart);
        } else {
            buttonStart.classList.add('start');
            buttonStart.innerHTML = 'Стоп';

            dragStart = setInterval(() => {
                time = dragElement.parentNode;

                if (time.nextElementSibling) {
                    time.nextElementSibling.appendChild(dragElement);
                    console.log('start: ' + time.nextElementSibling.getAttribute('data-timeline-second'));
                } else {
                    timeline.firstElementChild.appendChild(dragElement);
                    buttonStart.classList.remove('start');                    
                    buttonStart.innerHTML = 'Старт';
                    clearInterval(dragStart);
                }
            }, 500);
        }

        console.log('start: ' + time.getAttribute('data-timeline-second'));
    });

    function waitFunc (source, callback, options = {count: 5, time: 1000}) {
        var counter = options.count;
        var time = options.time;

        (function check() {
            var result = source();

            if (result) {
                callback(result);
                return;
            }

            if (counter == 0) {                
                console.log('timeout');
                return;
            }

            console.log('counter: ' + counter);            
            counter -= 1;  
            setTimeout(check, time);           
        }());
    };

    waitFunc(
        function () {
            var buttonStart = document.querySelector('.button-start');
            var container = buttonStart.closest('.container');
            var timeline = container.querySelector('.auto');
            var dragElement = container.querySelector('.dragElement');
            var time = dragElement.parentNode;
            time = dragElement.parentNode;

            if (time.nextElementSibling) {
                time.nextElementSibling.appendChild(dragElement);
            } else {
                timeline.firstElementChild.appendChild(dragElement);
                return true;
            }
        },
        function () {
            console.log('true');
        },
        {
            count: 20,
            time: 100
        }
    );
});