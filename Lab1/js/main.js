$(function() {
    function isNumeric(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function validateX(){
        const X_MAX = 5;
        const X_MIN = -5;
    
        let xField = $('#x-value');
        let numX = xField.val().replace(',','.');
    
        if (isNumeric(xField) && numX >= X_MIN && numX <= X_MAX){
            xField.removeClass('text-error');
            return true;
        } else {
            xField.addClass('text-error');
            return false;
        }
    }
    
    function validateY(){
        if ($('.y-checkbox').is(':checked')){
            $('ybox-label').removeClass('box-error');
            return true;
        } else {
            $('ybox-label').addClass('box-error');
            return false
        }
    }

    function validateR(){
        if ($('.r-checkbox').is(':checked')){
            $('rbox-label').removeClass('box-error');
            return true;
        } else {
            $('rbox-label').addClass('box-error');
            return false
        }
    }

    function validateForm(){
        return validateR & validateX & validateY;
    }

    $('#input-form').on('submit', function(event){
        event.preventDefault();
        if(!validateForm()) return;
        $.ajax({
            URL: 'php/main.php',
            method: 'POST',
            data: $(this).serialize() + '&timezone=' + new Date().getTimezoneOffset,
            dataType: "json",
            beforeSend: function(){
                $('.button').attr('disabled','disabled');
            },
            success: function(data){
                $('.button').attr('disabled',false);
                if (data.validate){
                    newRow = '<tr>';
                    newRow += '<td>' + data.xval + '</td>';
                    newRow += '<td>' + data.yval + '</td>';
                    newRow += '<td>' + data.rval + '</td>';
                    newRow += '<td>' + data.curtime + '</td>';
                    newRow += '<td>' + data.exectime + '</td>';
                    newRow += '<td>' + data.hitres + '</td>';
                    $('#result-table').append(newRow)
                }
            }
        });
    });
});

