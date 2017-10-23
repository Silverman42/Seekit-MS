$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('body').scrollspy({
        target: ".navbar",
        offset: 10
    });
    // Add smooth scrolling to all links inside a navbar
    $("#scroll-top a").on('click', function (event) {

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash (#)
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area (the speed of the animation)
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 500, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    });
    //Submit product creation form
  $("#productSubmit").submit(function (e) {
        e.preventDefault();
        var method = $(this).attr('method');
        var action = $(this).attr('action');
        var data = $(this).serialize();
        var form = $(this);
        
        $.ajax({
            type: method,
            url: action,
            data: data,
            success: function (response) {
                form[0].reset();
                $('.response').text(response).fadeIn(1000).delay(4000).fadeOut(1000);
            },
            error: function () {
                console.log(action);
            }
        });
    });
    //Update products
    $("#productUpdate").submit(function (e) {
        e.preventDefault();
        var method = $(this).attr('method');
        var action = $(this).attr('action');
        var data = $(this).serialize();
        var form = $(this);
        
        $.ajax({
            type: method,
            url: action,
            data: data,
            success: function (response) {
                form[0].reset();
                $('.response').text(response).fadeIn(1000).delay(4000).fadeOut(1000);
                if(response === 'Product details updated'){
                    setInterval(location.reload(),3000);
                }
            },
            error: function () {
                console.log(action);
            }
        });
    });
    //Create category
    $("#categorySubmit").submit(function (e) {
        e.preventDefault();
        var method = $(this).attr('method');
        var action = $(this).attr('action');
        var data = $(this).serialize();
        var form = $(this);
        
        $.ajax({
            type: method,
            url: action,
            data: data,
            success: function (response) {
                form[0].reset();
                $('.response').text(response).fadeIn(1000).delay(4000).fadeOut(1000);
            },
            error: function () {
                console.log(action);
            }
        });
    });
    //Create category
    $("#categoryUpdate").submit(function (e) {
        e.preventDefault();
        var method = $(this).attr('method');
        var action = $(this).attr('action');
        var data = $(this).serialize();
        var form = $(this);
        
        $.ajax({
            type: method,
            url: action,
            data: data,
            success: function (response) {
                form[0].reset();
                $('.response').text(response).fadeIn(1000).delay(4000).fadeOut(1000);
                if(response === "Category Update successful"){
                    setInterval(location.reload(), 3000);
                };
            },
            error: function () {
                console.log(action);
            }

        });
    });
    //Search product in DB for transaction
    var pEntities = [];
    function deleteTransaction(params,target) {
        $(params).click(function (e) {  
            e.preventDefault();
            $(target).empty();
        }); 
    }
    function createInput(selector,arr){
        $(selector).each(function (index, element) {
            // element == this
            $(document).on('click',element,function (e) {

                $('#transaction-body').append('<tr class="transaction-entry"><input hidden class="prodId" value="'+arr[index].id+'"/><td>'+arr[index].prodName+'</td><td><input class="quantityInput" style="color:black" type="number"></td><td>'+arr[index].prodQuantity +'</td><td>'+arr[index].prodPrice +'</td></tr>');
                $(selector).remove();
            })
        });
    }
    function transactCalculate(selector){
        $(selector).keyup(function (e) {  
            e.preventDefault();
            console.log($(this).val());
        })
    }
    $('#transProductSearch').on('keyup',function (e) { 
        e.preventDefault();
        if($(this).val() !== ""){
            $.ajax({
                type: "POST",
                url: $('#transAction').attr('action'),
                data: $('#transAction').serialize(),
                success: function (response) {
                    $(".suggestion-box").remove();
                    pEntities = [];
                    response = jQuery.parseJSON(response);
                    $.each(response, function (indexInArray, value) { 
                         $("#suggestion-container").append($('<div>',{class:"suggestion-box", text:value.productName}));
                         pEntities[indexInArray] = {prodQuantity:"",prodId:"",prodPrice:"",prodName:""};
                         pEntities[indexInArray].prodQuantity = value.quantity;
                         pEntities[indexInArray].prodId = value.id;
                         pEntities[indexInArray].prodPrice = value.price;
                         pEntities[indexInArray].prodName = value.productName;
                    });
                },
                error: function () { 
                    console.log($('#transAction').val());
                }
            });
        }
        else{
            $('.suggestion-box').remove()
        } 
    });
    $('#suggestion-container').on("click",'.suggestion-box', function (e) {
        var index = $(this).index();
        $('#transaction-body').append('<tr class="transaction-entry"><input hidden class="prodId" value="'+pEntities[index].id+'"/><td class="transactProdName">'+pEntities[index].prodName+'</td><td><input class="quantityInput" style="color:black" type="number"></td><td class="quantityAvail">'+pEntities[index].prodQuantity +'</td><td class="productPrice">'+pEntities[index].prodPrice +'</td></tr>');
        $('.suggestion-box').remove();
        $('#transAction')[0].reset();
    })
    $('#delete-transact').click(function (e) {  
        e.preventDefault();
        $('#transaction-body').empty();
    })
    var quantityInput, quantityAvail, quantityPrice, productCal = [], totalCal;
    $('#transaction-body').mouseover(function (e) {
        $('.quantityInput').each(function (index, element) {
            // element == this
            $(element).keyup(function (e) {
                if($(this).val() <= parseInt($('.quantityAvail').eq(index).text())){
                    $('.response').css({'display':'none'}).text('');
                    totalCal = 0;
                    quantityInput = $(this).val();
                    quantityPrice = parseInt($('.productPrice').eq(index).text());
                    productCal[index] = quantityInput * quantityPrice;
                    //$('#transactionTotal').text(productCal[index]);
                    //console.log(productCal.length);
                    for (var i = 0; i < productCal.length; i++) {
                        totalCal += productCal[i];
                   }
                   $('#transactionTotal').text(totalCal);
                }
                else{
                    $('.response').css({'display':'block'}).text('Quantity Input for '+$('.transactProdName').eq(index).text()+' Exceeds Quantity available');
                }  
            });
        }); 
    });
    //Select and deselect items from tables with "selectable" class
    $(".selectable").each(function (index, element) {
        var state = 0;
        $(element).click(function (e) {
            //e.preventDefault();
            if (state === 0) { // check list if state is equal to 0 
                state = 1;
                $(":checkbox").eq(index).prop('checked', true);
                $(element).addClass("selected");
                console.log($(this).attr('class') + " " + index + " " + state);
            } else { //Uncheck list if state is equal to one
                state = 0;
                $(":checkbox").eq(index).prop('checked', false);
                $(element).removeClass("selected");
                console.log($(this).attr('class') + " " + index + " " + state);
            }
        });
    });
    //Select all rows in the list with the 'select all' button
    var state_2 = 0;
    $("#select-all").click(function (e) {
        e.preventDefault();
        if (state_2 === 0) {
            $('.selectable').each(function (index, element) {
                // element == this
                $(element).addClass('selected'); //change background color of list
                $(':checkbox').eq(index).prop('checked', true); //check input;            
            })
            $(this).addClass('btn-primary');// change 'select-all' button color
            state_2 = 1
        }else{
            $('.selectable').each(function (index, element) {
                // element == this
                $(element).removeClass('selected'); //reverse background color of list
                $(':checkbox').eq(index).prop('checked', false); //uncheck input;            
            })
            $(this).removeClass('btn-primary'); //reverse 'select-all' button color
            state_2 = 0;
        };
    });
});