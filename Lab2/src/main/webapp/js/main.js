$(function() {
  const X_VALUES = [-3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
  const Y_MIN = -3;
  const Y_MAX =3;

  let rVal;
  let canvas = $('.graph-canvas');

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  function validateX(){
    xSelected = [];
    $('.input-form__container_x input:checked').each(function(){
      xSelected.push($(this).val());
    })
    if(xSelected.length == 1){
      $('.input-form__info').text('Введите координаты точки');
      return true;
    }
    else{
      $('.input-form__info').text('Выберите одно значение X')
      return false;
    }
  }
  
  function validateY() {

    let numY = $('.input-form__text_y').val().replace(',', '.');
  
    if (isNumeric(numY) && numY >= Y_MIN && numY <= Y_MAX)
    {
      $('.input-form__info').text('Введите координаты точки')
      return true;
    } else {
      $('.input-form__info').text('Введите значение Y от -3 до 3!')
      return false;
    }
  }
  
  function validateR() {
    if (rVal !== undefined) {
      $('.input-form__info').text('Введите координаты точки')
      return true;
    } else {
      $('.input-form__info').text('Выберите значение R!')
      return false;
    }
  }
  
  function validateForm() {
    return validateX() && validateY() && validateR();
  }

  function drawPoint(x, y) {
    clearCanvas();
    if (x > canvas.width() || x < -canvas.width() || y > canvas.height() || y < -canvas.height()) return;

    let ctxAxes = canvas[0].getContext('2d');
    ctxAxes.setLineDash([2, 2]);
    ctxAxes.beginPath();
    ctxAxes.moveTo(x, 110);
    ctxAxes.lineTo(x, y);
    ctxAxes.moveTo(110, y);
    ctxAxes.lineTo(x, y);
    ctxAxes.stroke();
    ctxAxes.fillStyle = 'red';
    ctxAxes.arc(x, y, 2, 0, 2 * Math.PI);
    ctxAxes.fill();
  }

  function clearCanvas() {
    canvas[0].getContext('2d').clearRect(0, 0, canvas.width(), canvas.height());
  }

  function redrawFromInput() {
    if (validateForm()) {
      drawPoint($('.input-form__select_x option:selected').val() * 68 / rVal + 110,
          -($('.input-form__text_y').val() / rVal *  68 - 110));
    } else {
      clearCanvas();
    }
  }

  canvas.on('click', function (event) {
    if (!validateR()) return;

    let xFromCanvas = (event.offsetX - 110) / 68 * rVal;
    let minDifference = Infinity;
    let nearestXValue;

    for (let i = 0; i < X_VALUES.length; i++) {
      if (Math.abs(xFromCanvas - X_VALUES[i]) < minDifference) {
        minDifference = Math.abs(xFromCanvas - X_VALUES[i]);
        nearestXValue = X_VALUES[i];
      }
    }

    let yValue = (-event.offsetY + 110) / 68 * rVal;
    if (yValue < Y_MIN) yValue = Y_MIN;
    else if (yValue > Y_MAX) yValue = Y_MAX;

    drawPoint(nearestXValue * 68 / rVal + 110, -(yValue / rVal *  68 - 110));

    let xSelect = $('.input-form__select_x option[value="' + nearestXValue + '"]');
    xSelect.prop('selected', true);

    $('.input-form__select_x option').not(xSelect).prop('selected', false);
    $('.input-form__text_y').val(yValue.toString().substring(0, 10));
  });

  $('.input-form__control-buttons__button_submit').on('click', function(event) {
    if (!validateForm()) {
      event.preventDefault();
    } else {
      $('.input-form__hidden_r').val(rVal);
      $('.input-form__hidden_timezone').val(new Date().getTimezoneOffset());
    }
  });

  $('.input-form__control-buttons__button_reset').on('click', function (event) {
    $('.input-form__hidden_clear').val('true');
  })

  $('.input-form__button_r').on('click', function(event) {
    rVal = $(this).val();
    $(this).addClass('input-form__button_r_clicked');
    $('.input-form__button_r').not(this).removeClass('input-form__button_r_clicked');

    let svgGraph = document.querySelector(".result-graph").getSVGDocument();
    svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = (-rVal).toString();
    svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = (-rVal).toString();
    svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = (-rVal/2).toString();
    svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = (-rVal/2).toString();
    svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = (rVal).toString();
    svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = (rVal).toString();
    svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = (rVal/2).toString();
    svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = (rVal/2).toString();

    redrawFromInput();
  });

  $('.input-form__text_y').on('input', event => redrawFromInput());
  $('.input-form__select_x').on('change', event => redrawFromInput());
});
