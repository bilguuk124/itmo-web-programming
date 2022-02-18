$(function(){
    const X_MIN = -2, X_MAX =2;
    const Y_MIN = -3, Y_MAX = 5;
    const R_MIN = 1, R_MAX = 4;

    let xval;
    let yval;
    let rval;

    const canone = 68;

    let canvasCurrent = $('.graph-canvas_current');
    let canvasPoints = $('.graph-canvas_points');
    let info = $('.input-form__info');

    function isNumeric(x){
        return !isNaN(parseFloat(x)) && isFinite(x) ;
    }

    function validateX(){
        xval = $('.input-form__text_x').val();

        if(isNumeric(xval) && xval >= X_MIN && xval <= X_MAX){
            info.text("Введите координаты точки")
            return true;
        }else{
            info.text(`Введите значение X от ${X_MIN} до ${X_MAX}`)
            return false;
        }
    }

    function validateY(){
        yval = $('.input-form__text_y').val();
        if(isNumeric(yval) && yval>=Y_MIN && yval <= Y_MAX){
            info.text("Введите координаты точки")
            return true;
        }else{
            info.text(`Введите значение Y от ${Y_MIN} до ${Y_MAX}`)
            return false;
        }
    }

    function validateR(){
        rval = $('.input-form__text_r').val();
        if(isNumeric(rval) && rval >= R_MIN && rval <= R_MAX){
            info.text("Введите координаты точки")
            return true
        }else{
            info.text(`Введите значение R от ${R_MIN} до ${R_MAX}`)
            return false;
        }
    }

    function validateForm(){
        return  validateX() && validateR() && validateY() ;
    }

    function drawTablePoint(x, y, r, hitResult) {
        let ctxPoints = canvasPoints[0].getContext('2d');
        ctxPoints.fillStyle = hitResult === 'Промах' ? 'red' : 'green';
        ctxPoints.beginPath();
        ctxPoints.arc(
            x / r * canone + canvasPoints.width() / 2,
            - y / r * canone + canvasPoints.height() / 2,
            2, 0, 2 * Math.PI);
        ctxPoints.fill();
    }

    function loadTablePoints() {
        let rows = [];
        let headers = $(".result-table th");

        $(".result-table tr").each(function(index) {
            let cells = $(this).find("td");
            rows[index] = {};
            cells.each(function(cellIndex) {
                rows[index][$(headers[cellIndex]).html()] = $(this).html().replace(/\s/g, "");
            });
        });

        for (let i = 0; i < rows.length; i++) {
            drawTablePoint(
                rows[i]['X'],
                rows[i]['Y'],
                rows[i]['R'],
                rows[i]['Результат']);
        }
    }

    function clearCanvasCurrent(){
        canvasCurrent[0].getContext('2d').clearRect(0, 0, canvasCurrent.width(), canvasCurrent.height());
    }

    function drawCurrentPoint(x, y) {
        clearCanvasCurrent();

        if (x > canvasCurrent.width() || x < 0 ||
            y > canvasCurrent.height() || y < 0)
            return;

        let ctxAxes = canvasCurrent[0].getContext('2d');
        ctxAxes.globalAlpha = 1;
        ctxAxes.save();
        ctxAxes.setLineDash([2, 2]);
        ctxAxes.fillStyle = 'black';
        ctxAxes.beginPath();
        ctxAxes.moveTo(x, canvasCurrent.width() / 2);
        ctxAxes.lineTo(x, y);
        ctxAxes.moveTo(canvasCurrent.height() / 2, y);
        ctxAxes.lineTo(x, y);
        ctxAxes.stroke();
        ctxAxes.arc(x, y, 2, 0, 2 * Math.PI);
        ctxAxes.fill();
    }

    function redrawCurrentFromInput() {
        if (validateForm()) {
            drawCurrentPoint(xval * canone / rval + canvasCurrent.width() / 2, -(yval / rval *  canone - canvasCurrent.height() / 2));
        } else {
            clearCanvasCurrent();
        }
    }

    $('.graph-canvas_current').on('click', function(event) {
        if(!validateR()) return;

        let canvasX = (event.offsetX - canvasCurrent.width() / 2) / canone * rval;
        if(canvasX < X_MIN){
            canvasX = X_MIN;
        } else if (canvasX > X_MAX){
            canvasX = X_MAX;
        }

        let canvasY = (-event.offsetY + canvasCurrent.height()/2)/canone*rval;
        if(canvasY < Y_MIN){
            canvasY = Y_MIN;
        } else if(canvasY > Y_MAX){
            canvasY = Y_MAX;
        }

        drawCurrentPoint((canvasX * canone/rval + canvasCurrent.width() / 2) , -(canvasY / rval * canone - canvasCurrent.height() / 2));
        $('.input-form__text_x').val(canvasX.toString().substring(0,10));
        $('.input-form__text_y').val(canvasY.toString().substring(0,10));
    });



    $('.input-form__text_y').keyup(event => redrawCurrentFromInput());
    $('.input-form__slider_x').on('mouseup' ,event => redrawCurrentFromInput());

    $('.input-form__text_x').on('input', event => redrawCurrentFromInput());
    $('.input-form__text_y').on('input', event => redrawCurrentFromInput());

    $('.input-form__slider_r').on('mouseup', function(event){
        rval =  $('.input-form__text_r').val();
        if (!validateR) return;

        let svgGraph = document.querySelector(".result-graph").getSVGDocument();
        svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = (-rval).toString();
        svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = (-rval).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = (-rval/2).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = (-rval/2).toString();
        svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = (rval).toString();
        svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = (rval).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = (rval/2).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = (rval/2).toString();

        redrawCurrentFromInput();
    })

    $('.input-form__text_r').keyup(function(){
        rval =  $('.input-form__text_r').val();
        if (!validateR) return;

        let svgGraph = document.querySelector(".result-graph").getSVGDocument();
        svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = (-rval).toString();
        svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = (-rval).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = (-rval/2).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = (-rval/2).toString();
        svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = (rval).toString();
        svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = (rval).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = (rval/2).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = (rval/2).toString();

        redrawCurrentFromInput();
    });

    $('input-form__control-buttons__button_submit').on('click',function(event){
        if(!validateForm()){
            event.preventDefault();
        }
    });

    loadTablePoints();

});
