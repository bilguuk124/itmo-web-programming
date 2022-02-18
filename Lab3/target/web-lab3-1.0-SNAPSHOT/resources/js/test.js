$(function(){

    let xval = $('.test-input-x').val();
    let yval = $('.test-input-y').val();
    let rval = 3.5;
    let canvas = $('.graph-canvas_current');
    let canone = 68;

    $('.test-button').on('click', function(){
        if(x < 20) return;
        let y = 20
        $('.test-input').val(y.toString().substring(0,10));
    });

    function clearCanvasCurrent(){
        canvas[0].getContext('2d').clearRect(0, 0, canvas.width(), canvas.height());
    }
    function isNumeric(x){
        return !isNaN(parseFloat(x)) && isFinite(x);
    }

    // function validateR(){
    //     rval = parseFloat(('.test-input-r').val());
    //     if(isNumeric(rval) && rval<=4 && rval >= 1){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // }


    function drawCurrentPoint(x,y){
        clearCanvasCurrent();
        if (x > canvas.width() || x < 0 ||
            y > canvas.height() || y < 0)
            return;

        let ctxAxes = canvas[0].getContext('2d');
        ctxAxes.setLineDash([2, 2]);
        ctxAxes.fillStyle = 'black';
        ctxAxes.beginPath();
        ctxAxes.moveTo(x, canvas.width() / 2);
        ctxAxes.lineTo(x, y);
        ctxAxes.moveTo(canvas.height() / 2, y);
        ctxAxes.lineTo(x, y);
        ctxAxes.stroke();
        ctxAxes.arc(x, y, 2, 0, 2 * Math.PI);
        ctxAxes.fill();
    }


    $('.graph-canvas_current').on('click', function(event){

        //if(!validateR()) return;
        let canvX = (event.offsetX - canvas.width()/2)/canone *rval;
        let canvY = (-event.offsetY + canvas.width()/2)/canone *rval;
        if (canvX < -2) {
            canvX = -2;
        } else if (canvX > 2) {
            canvX = 2;
        }
        if(canvY < -5){
            canvY = -5;
        } else if (canvY > 3){
            canvY = 3;
        }

        drawCurrentPoint((canvX*canone/rval + canvas.width()/2), -(canvY / rval * canone - canvas.height()/2));

        $('.test-input-x').val(canvX.toString().substring(0,10));
        $('.test-input-y').val(canvY.toString().substring(0,10));
    });

})