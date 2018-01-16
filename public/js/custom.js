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
            beforeSend:function () {  
                $(".load-spinner-2[data-spinner-id=submitProduct]").css('display','block');
                $("button[data-button-id=submitProduct]").css('display','none');
            },
            success: function (response) {
                form[0].reset();
                $(".load-spinner-2[data-spinner-id=submitProduct]").css('display','none');
                $("button[data-button-id=submitProduct]").css('display','block');
                $('.response[data-response-id=submitProduct]').text(response).fadeIn(1000).delay(4000).fadeOut(1000);
            },
            error: function () {
                console.log(action);
            }
        });
    });
    //Update category
    /*
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
                if (response === "Category Update successful") {
                    setInterval(location.reload(), 3000);
                };
            },
            error: function () {
                console.log(action);
            }

        });
    });
    */
    //Search product in DB for transaction
    var pEntities = [];

    function deleteTransaction(params, target) {
        $(params).click(function (e) {
            e.preventDefault();
            $(target).empty();
        });
    }

    function createInput(selector, arr) {
        $(selector).each(function (index, element) {
            // element == this
            $(document).on('click', element, function (e) {

                $('#transaction-body').append('<tr class="transaction-entry"><input hidden class="prod_restock_id" value="' + arr[index].id + '"/><td>' + arr[index].prodName + '</td><td><input class="quantityInput" style="color:black" type="number"></td><td>' + arr[index].prodQuantity + '</td><td>' + arr[index].prodPrice + '</td></tr>');
                $(selector).remove();
            })
        });
    }
    /**
     * @description: Disable default action of form for product search box 
     */
    $('#transAction').submit(function (e) {  
        e.preventDefault();
    })
    /*
    * @description: Keyup event listener to search for suggestions through ajax request
     */
     $('#transProductSearch').on('keyup', function (e) {
        e.preventDefault();
        if ($(this).val() !== "") {
            $.ajax({
                type: "GET",
                url: $('#transAction').attr('action'),
                data: $('#transAction').serialize(),
                success: function (response) {
                    $(".suggestion-box").remove();
                    console.log(response);
                    pEntities = [];
                    $.each(response, function (indexInArray, value) {
                        $("#suggestion-container").append($('<div>', {
                            class: "suggestion-box",
                            text: value.product.productName+" ("+value.batch_id+") ("+ value.Vendor +")"
                        }));
                        pEntities[indexInArray] = {
                            prodQuantity: "",
                            prod_restock_id: "",
                            batchId:"",
                            expiryDate:"",
                            prodPrice: "",
                            prodName: ""
                        };
                        pEntities[indexInArray].prodQuantity = value.quantity;
                        pEntities[indexInArray].prod_restock_id = value.id;
                        pEntities[indexInArray].batchId = value.batch_id;
                        pEntities[indexInArray].expiryDate = value.expiry;
                        pEntities[indexInArray].prodPrice = value.price;
                        pEntities[indexInArray].prod_id = value.product.id;
                        pEntities[indexInArray].prodName = value.product.productName;
                    });
                },
                error: function () {
                    console.log($('#transAction').val());
                }
            });
        } else {
            $('.suggestion-box').remove()
        }
    });
    /*Desc--> Click listener to create transaction entry for a selected suggestion
     */
    var chosenProduct = [0]; //Array for collecting id of selected suggestions
    var cpCount = 0; //Counter to check availability of selected suggestion in chosenProduct[];
    $('#suggestion-container').on("click", '.suggestion-box', function (e) {
        var index = $(this).index();
        for (var ch = 0; ch < chosenProduct.length; ch++) {
            if(parseInt(pEntities[index].prodQuantity) === 0){
                $('.response').css({
                    'display': 'block'
                }).text('Product Not Available');
            }
            else if (chosenProduct[ch] !== pEntities[index].prod_restock_id) {
                if (ch === chosenProduct.length - 1) {
                    $('#transaction-body').append('<tr class="transaction-entry"><td style="display:none"><input hidden value="' + pEntities[index].prod_restock_id + '" class="prod_restock_id"/><input hidden value="' + pEntities[index].prod_id + '" class="prod_id"/><input hidden value="' + pEntities[index].prodQuantity + '" class="prodQuantityStatic"/></td><td class="transactProdName">' + pEntities[index].prodName + '</td><td>'+pEntities[index].batchId+'</td><td>'+pEntities[index].expiryDate+'</td><td><input class="form-control quantityInput" style="color:black" type="number"></td><td class="prodQuantityDynamic">' + pEntities[index].prodQuantity + '</td><td class="productPrice">' + pEntities[index].prodPrice + '</td></tr>');
                    chosenProduct[cpCount] = pEntities[index].prod_restock_id;
                    $('.suggestion-box').remove();
                    $('#transAction')[0].reset();
                    $('.response').css({
                        'display': 'none'
                    }).text('');
                    cpCount++;
                    console.log($('.prod_id').val());
                }
            } else {
                break;
            }
        }
        console.log(chosenProduct.length);
    })
    
    /*Desc--> Event listener to calculate the total transactions with respect to the product quantity and price   
     */
    var quantityInput, quantityAvail = [],
        quantityPrice, productCal = [0],
        totalCal, productReduce;
    $('#transaction-body').mouseover(function (e) {
        $('.quantityInput').each(function (index, element) {
            // element == this
            if ($(element).val().length === 0) {
                $('#transactionCreate').prop('disabled', true);
            }
            $(element).keyup(function (e) {
                quantityAvail[index] = parseInt($('.prodQuantityStatic').eq(index).val()); //Old quantity available
                if ((parseInt($(this).val()) <= quantityAvail[index]) || $(this).val().length === 0) { //To check if the input quantity is lower than the available product quantity
                    if ($(this).val().length === 0) {
                        quantityInput = 0; //quantity Input
                        $('#transactionCreate').prop('disabled', true);
                    } else {
                        quantityInput = parseInt($(this).val()); //quantity Input
                        $('#transactionCreate').prop('disabled', false);
                    }
                    $('.response').css({
                        'display': 'none'
                    }).text('');
                    totalCal = 0;
                    quantityReduce = quantityAvail[index] - quantityInput; //New quantity available
                    quantityPrice = parseInt($('.productPrice').eq(index).text()); //product price
                    productCal[index] = quantityInput * quantityPrice; // Product of product-price and product-quantity
                    $('.prodQuantityDynamic').eq(index).text(quantityReduce);
                    //$('#transactionTotal').text(productCal[index]);
                    //console.log(productCal.length);
                    for (var i = 0; i < productCal.length; i++) {
                        totalCal += productCal[i];
                    }
                    $('#transactionTotal').text(totalCal);
                } else {
                    $('.response').css({
                        'display': 'block'
                    }).text('Quantity Input for ' + $('.transactProdName').eq(index).text() + ' Exceeds Quantity available');
                    $('#transactionCreate').prop('disabled', true);
                }
            });
        });
    });
    /* Click listener to delete all transaction entries 
     */
    $('#delete-transact').click(function (e) {
        e.preventDefault();
        $('#transaction-body').empty();
        $('#transactForm')[0].reset();
        $('#transactionCreate').prop('disabled',true);
        chosenProduct = [0];
        productCal = [0];
        $('#transactionTotal').text(0);
    })
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
    /**
     * Desc-> Event listener to send transaction to DB
     */
    var transactionContent = [],
        transactTotal;
    $('#transactForm').submit(function (e) {
        e.preventDefault();
        if ($('.transaction-entry').length >= 0) {
            $('.transaction-entry').each(function (index, element) {
                transactionContent[index] = {
                    product_restock_id: "",
                    product_id: "",
                    product_quantity: "",
                    product_quantity_pur: "",
                    product_price: "",
                    transaction_id:"",
                    created_at:"",
                    updated_at:""
                };
                transactionContent[index].product_id = parseInt($('.prod_id').eq(index).val());
                transactionContent[index].product_restock_id = parseInt($('.prod_restock_id').eq(index).val());
                transactionContent[index].product_quantity = parseInt($('.prodQuantityDynamic').eq(index).html());
                transactionContent[index].product_quantity_Pur = parseInt($('.quantityInput').eq(index).val());
                transactionContent[index].product_price = parseInt($('.productPrice').eq(index).html());
                transactionContent[index].transaction_id = 0;               
            });
            transactTotal = parseInt($('#transactionTotal').html());
            $.ajax({
                method: "POST",
                contentType: "application/json",
                dataType: "json",
                headers:{'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')}, 
                url: $(this).attr('action'),
                data: JSON.stringify([{
                    total: transactTotal
                }, transactionContent]),
                beforeSend: function () { 
                    $('#transaction-body').empty();
                    $('#transactForm')[0].reset();
                    $('#transactionCreate').prop('disabled',true); 
                    $('.load-spinner-2[data-spinner-id=submitTransaction]').css({'display':'block'});
                    $('button[data-button-id=submitTransaction]').css({'display':'none'});
                },
                success: function (response,responseStatus,xhr) {
                    if(xhr.status === 201){
                        $('#transactionCreate').prop('disabled',true);
                        chosenProduct = [0];
                        productCal = [0];
                        $('#transactionTotal').text(0);
                        $('.load-spinner-2[data-spinner-id=submitTransaction]').css({'display':'none'});
                        $('button[data-button-id=submitTransaction]').css({'display':'block'});
                        $('.response[data-response-id=submitTransaction]').css({
                            'display': 'block'
                        }).text('Transaction Submitted. Please wait....').delay(4000).fadeOut(1000);    
                    }
                }
            });
        }
        $("#transactBody").trigger("reload:transactHistory");
    });
    /**
     * @description: Reload Transaction History
     * @event: {object} reload:transactionHistory
     */
     
    $("#transactBody").on('reload:transactHistory', function (e) {  
        e.preventDefault();
        $(this).empty();
        transactPagerCount = 0;
        tabContent = null;
        historyRowCount = 0;
        if ($('body').attr('data-current-page') === "transaction") {
            setTimeout(function () {
                $.ajax({
                    method: 'GET',
                    url: $('input[name="searchTransact"]').attr('data-custom-transURL'),
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                    },
                    data: "?searchTransact=" + $('input[name="searchTransact"]').val() + "&searchParam=" + $('select[name="searchTransactParam"]').val() + "&page=" + transactPagerCount,
                    beforeSend: function () {
                        $("#transactPager").css({
                            'display': 'none'
                        });
                        $('.load-spinner-2').css({
                            'display': 'block'
                        });
                    },
                    success: function (response) {
 
                        console.log(response);
                        $("#transactPager").css({
                            'display': 'block'
                        });
                        $('.load-spinner-2').css({
                            'display': 'none'
                        });
                        $.each(response, function (index, value) {
                            $('#transactBody').append('<tr><td><a href="#modal-id" class="viewTransact" data-row-id="' + historyRowCount + '" data-transact-id="' + value.id + '" style="margin:auto;display:block" data-toggle="modal"><button data-toggle="tooltip" title="View" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button></a></td><td><a href=""><button style="margin:auto;display: block" href="www.google.com" data-toggle="tooltip" title="Update" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td data-row-id="' + historyRowCount + '" class="transactionName">' + value.transaction_name + '</td><td data-row-id="' + historyRowCount + '">' + value.created_at + '</td><td data-row-id="' + historyRowCount + '" class="transactionTot">' + value.total_price + '</td></tr>');
                            historyRowCount++;
                        });
 
                        //tabContent = null;
                        if (response.length === 0) {
                            $(this).prop("disabled", true);
                        } else {
                            $('#transactPager').prop("disabled", false);
                        }
                    },
                    error: function () {
                        console.log('Could Not Connect');
                    }
                });
            }, 1000);
        };
    })
    //Select all rows in the list with the 'select all' button
    /*var state_2 = 0;
    $("#select-all").click(function (e) {
        e.preventDefault();
        if (state_2 === 0) {
            $('.selectable').each(function (index, element) {
                // element == this
                $(element).addClass('selected'); //change background color of list
                $(':checkbox').eq(index).prop('checked', true); //check input;            
            })
            $(this).addClass('btn-primary'); // change 'select-all' button color
            state_2 = 1
        } else {
            $('.selectable').each(function (index, element) {
                // element == this
                $(element).removeClass('selected'); //reverse background color of list
                $(':checkbox').eq(index).prop('checked', false); //uncheck input;            
            })
            $(this).removeClass('btn-primary'); //reverse 'select-all' button color
            state_2 = 0;
        };
    });*/

})