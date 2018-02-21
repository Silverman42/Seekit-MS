$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('body').scrollspy({
        target: ".navbar",
        offset: 10
    });
    // Add smooth scrolling to all links inside a navbar
    $("#scroll-top a").on('click', function(event) {

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash (#)
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area (the speed of the animation)
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 500, function() {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    });
    //Submit product creation form
    $("#productSubmit").submit(function(e) {
        e.preventDefault();
        var method = $(this).attr('method');
        var action = $(this).attr('action');
        var data = $(this).serialize();
        var form = $(this);

        $.ajax({
            type: method,
            url: action,
            data: data,
            beforeSend: function() {
                $(".load-spinner-2[data-spinner-id=submitProduct]").css('display', 'block');
                $("button[data-button-id=submitProduct]").css('display', 'none');
            },
            success: function(response) {
                form[0].reset();
                $(".load-spinner-2[data-spinner-id=submitProduct]").css('display', 'none');
                $("button[data-button-id=submitProduct]").css('display', 'block');
                $('.response[data-response-id=submitProduct]').text(response).fadeIn(1000).delay(4000).fadeOut(1000);
            },
            error: function() {
                console.log(action);
            }
        });
    });
    var dataCalc = (function() {
        var obj, //transactCalc Object
            inputData, // Data form input element
            dataValue = [], //Data value of data selectors i.e data attr of element
            dataSelector = [], //Data selector i.e target element;
            newData, //New Data Value
            totalCalcData = 0; //Total calculated Data of each data column
        return {
            check: 'ok',
            totalSelector: '', //Selector array for each targetData's total element;
            rowSelector: null, //Selector for each row of data table;
            targetData: '',
            updateRow: function(body, inputSelector) { //function to update each row according to change in input
                obj = this;
                $(body).on('keyup', inputSelector, function(e) {
                    e.preventDefault();
                    //Check if input value. if true, initialize the input data to 1
                    if ($(this).val().length === 0) {
                        inputData = 1;
                    } else {
                        inputData = parseInt($(this).val());
                    }
                    for (var i = obj.targetData.length - 1; i >= 0; i--) {
                        dataSelector[i] = $(this).parent().siblings(obj.targetData[i].selector);
                        dataValue[i] = parseInt(dataSelector[i].data(obj.targetData[i].data));
                        if (obj.targetData[i].processType === 'decrease' && dataValue[i] >= inputData) {
                            newData = dataValue[i] - inputData;
                            dataSelector[i].text(newData);
                        } else if (obj.targetData[i].processType === 'multiply') {
                            newData = dataValue[i] * inputData;
                            dataSelector[i].text(newData);
                        }
                    }
                    obj.updateTotal();

                })
            },
            updateTotal: function() { //Update each targetData's total element;
                obj = this;
                for (var i = obj.totalSelector.length - 1; i >= 0; i--) {
                    totalCalcData = 0;
                    for (var j = $(obj.rowSelector).length - 1; j >= 0; j--) {
                        totalCalcData += parseInt($(obj.targetData[i].selector).eq(j).text());
                    }
                    $(obj.totalSelector[i]).text(totalCalcData);
                }
            }
        }
    });
    (function() {
        /*
        / @description: calculate total of each transaction column
        */
        var transaction = new dataCalc();
        var target = [{
            selector: '.batchProfit',
            data: 'batch-profit',
            processType: 'multiply'
        }, {
            selector: '.batchLoss',
            data: 'batch-loss',
            processType: 'multiply'
        }, {
            selector: '.productPrice',
            data: 'product-price',
            processType: 'multiply'
        }, {
            selector: '.prodQuantity',
            data: 'prod-quantity',
            processType: 'decrease'
        }];
        transaction.targetData = target;
        transaction.rowSelector = '.transaction-entry';
        transaction.totalSelector = ['#totalProfit', '#totalLoss', '#transactionTotal'];
        transaction.updateRow('#transaction-body', '.quantityInput'); //update each row of transaction table according to change in input 
        /**
         * @description: Disable default action of form for product search box
         */
        $('#transAction').submit(function(e) {
            e.preventDefault();
        });
        var pEntities = []; // Transaction Entities from database
        /*
         * @description: Keyup event listener to search for suggestions through ajax request
         */
        $('#transProductSearch').on('keyup', function(e) {
            e.preventDefault();
            if ($(this).val() !== "") {
                $.ajax({
                    type: "GET",
                    url: $('#transAction').attr('action'),
                    data: $('#transAction').serialize(),
                    success: function(response) {
                        $(".suggestion-box").remove();
                        console.log(response);
                        pEntities = [];
                        $.each(response, function(indexInArray, value) {
                            $("#suggestion-container").append($('<div>', {
                                class: "suggestion-box",
                                text: value.product.productName + " (" + value.batch_id + ") (" + value.Vendor + ")"
                            }));
                            pEntities[indexInArray] = {
                                prodQuantity: "",
                                prod_restock_id: "",
                                batchId: "",
                                expiryDate: "",
                                prodPrice: "",
                                prodName: "",
                                profit: "",
                                loss: "",
                            }
                            pEntities[indexInArray].prodQuantity = value.quantity;
                            pEntities[indexInArray].prod_restock_id = value.id;
                            pEntities[indexInArray].batchId = value.batch_id;
                            pEntities[indexInArray].expiryDate = value.expiry;
                            pEntities[indexInArray].prodPrice = value.selling_price;
                            pEntities[indexInArray].prod_id = value.product.id;
                            pEntities[indexInArray].prodName = value.product.productName;
                            pEntities[indexInArray].profit = value.profit;
                            pEntities[indexInArray].loss = value.loss;
                        });
                    },
                    error: function() {
                        console.log($('#transAction').val());
                    }
                });
            } else {
                $('.suggestion-box').remove()
            }
        });
        /*
         *@description : Click listener to create transaction entry for a selected suggestion
         */
        var chosenProduct = [0]; //Array for collecting id of selected suggestions
        var cpCount = 0; //Counter to check availability of selected suggestion in chosenProduct[];
        $('#suggestion-container').on("click", '.suggestion-box', function(e) {
            var index = $(this).index();
            for (var ch = 0; ch < chosenProduct.length; ch++) {
                if (parseInt(pEntities[index].prodQuantity) === 0) {
                    $('.response').css({
                        'display': 'block'
                    }).text('Product quantity is exhausted. Please Restock');
                } else if (chosenProduct[ch] !== pEntities[index].prod_restock_id) {
                    if (ch === chosenProduct.length - 1) {
                        $('#transaction-body').append('<tr class="transaction-entry"><td data-restock-id="' + pEntities[index].prod_restock_id + '" data-product-id="' + pEntities[index].prod_id + '" class="transactProdName">' + pEntities[index].prodName + '</td><td>' + pEntities[index].batchId + '</td><td>' + pEntities[index].expiryDate + '</td><td><input class="form-control quantityInput" style="color:black" value="1" type="number"></td><td class="prodQuantity" data-prod-quantity="' + pEntities[index].prodQuantity + '">' + pEntities[index].prodQuantity + '</td><td class="productPrice" data-product-price="' + pEntities[index].prodPrice + '">' + pEntities[index].prodPrice + '</td><td class="batchProfit" data-batch-profit="' + pEntities[index].profit + '">' + pEntities[index].profit + '</td><td class="batchLoss" data-batch-loss="' + pEntities[index].loss + '">' + pEntities[index].loss + '</td><td><button type="button" class="btn btn-primary delete-transact-entry"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>');
                        //chosenProduct[cpCount] = pEntities[index].prod_restock_id; <--Adding a product restock id to chosen Product to check if the existence of data entry is >= 0
                        $('.suggestion-box').remove();
                        $('#transactionCreate').prop('disabled', false);
                        $('#transAction')[0].reset();
                        $('.response').css({
                            'display': 'none'
                        }).text('');
                        transaction.updateTotal(); //Update total of each column in transaction table
                        cpCount++;
                    }
                } else {
                    break;
                }
            }
        });
        /*
        /@description : Click listener to delete all transaction entry
        */
        $('#delete-transact').click(function(e) {
            e.preventDefault();
            $('#transaction-body').empty();
            $('#transactForm')[0].reset();
            $('#transactionCreate').prop('disabled', true);
            chosenProduct = [0];
            productCal = [0];
            cpCount = 0;
            $('#transactionTotal, #totalProfit, #totalLoss').text(0); //Empty Total slots
        });
        /*
        /@description : Click listener to delete single transaction entry
        */
        $('#transaction-body').on('click', '.delete-transact-entry', function(e) {
            e.preventDefault();
            var restockId = $(this).parent().siblings('.transactProdName').data('restock-id');
            var restockIdIndex = chosenProduct.indexOf(restockId); //index of product restock id in the chosen product array;
            delete chosenProduct[restockIdIndex];
            $(this).parent().parent().remove();
            transaction.updateTotal(); //Update total of each column in transaction table
        });
    })();
    //Select and deselect items from tables with "selectable" class
    $(".selectable").each(function(index, element) {
        var state = 0;
        $(element).click(function(e) {
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
        transactTotal,
        totalProfit, totalLoss,
        getDate = new Date(),
        errorState = 0,
        errorMessage = '';
    transactionId = getDate.getTime();
    $('#transactionId').text('(transaction_' + transactionId + ')');
    $('#transactForm').submit(function(e) {
        e.preventDefault();
        if ($('.transaction-entry').length >= 0) {
            $('.transaction-entry').each(function(index, element) {
                if (parseInt($('.quantityInput').eq(index).val()) === undefined || NaN) { //Check if input is Number
                    errorState = 1;
                    errorMessage = "Quantity purchased for " + $('transactProdName').eq(index).text() + " is not a number";
                    $('.response[data-response-id=submitTransaction]').css({
                        'display': 'block'
                    }).text(errorMessage).delay(4000).fadeOut(1000);
                    return false;
                } else if (parseInt($('.quantityInput').eq(index).val()) > parseInt($('.prodQuantity').eq(index).data('prod-quantity'))) { // Check if quantity purchased is greater than quantity available;
                    errorState = 2;
                    errorMessage = "Quantity purchased for " + $('transactProdName').eq(index).text() + " is greater than its available quantity";
                    $('.response[data-response-id=submitTransaction]').css({
                        'display': 'block'
                    }).text(errorMessage).delay(4000).fadeOut(1000);
                    return false;
                } else { //if previous checks are passed
                    transactionContent[index] = {
                        product_restock_id: "",
                        product_id: "",
                        product_quantity: "",
                        product_quantity_pur: "",
                        product_price: "",
                        transaction_id: "",
                        created_at: "",
                        updated_at: ""
                    };
                    transactionContent[index].product_id = parseInt($('.transactProdName').eq(index).data('product-id'));
                    transactionContent[index].product_restock_id = parseInt($('.transactProdName').eq(index).data('restock-id'));
                    transactionContent[index].product_quantity = parseInt($('.prodQuantity').eq(index).text());
                    transactionContent[index].product_quantity_Pur = parseInt($('.quantityInput').eq(index).val());
                    transactionContent[index].product_price = parseInt($('.productPrice').eq(index).text());
                    transactionContent[index].batch_profit = parseInt($('.batchProfit').eq(index).text());
                    transactionContent[index].batch_loss = parseInt($('.batchLoss').eq(index).text());
                    transactionContent[index].transaction_id = 0;
                    errorState = 0;
                }

            });
            if (errorState === 0) { //AJAX request after check pass is successful
                transactTotal = parseInt($('#transactionTotal').html());
                totalProfit = parseInt($('#totalProfit').text());
                totalLoss = parseInt($('#totalLoss').text());
                $.ajax({
                    method: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                    },
                    url: $(this).attr('action'),
                    data: JSON.stringify([{
                        total: transactTotal,
                        transaction_id: 'transaction_' + transactionId,
                        totalProfit: totalProfit,
                        totalLoss: totalLoss
                    }, transactionContent]),
                    beforeSend: function() {
                        $('#transactForm')[0].reset();
                        $('.load-spinner-2[data-spinner-id=submitTransaction]').css({
                            'display': 'block'
                        });
                        $('button[data-button-id=submitTransaction]').css({
                            'display': 'none'
                        });
                    },
                    success: function(response, responseStatus, xhr) {
                        if (xhr.status === 201) {
                            $('.load-spinner-2[data-spinner-id=submitTransaction]').css({
                                'display': 'none'
                            });
                            $('button[data-button-id=submitTransaction]').css({
                                'display': 'block'
                            });
                            $('.response[data-response-id=submitTransaction]').css({
                                'display': 'block'
                            }).text('Transaction Submitted.').delay(4000).fadeOut(1000);
                            getDate = new Date();
                            $('#transactionId').text('(transaction_' +getDate.getTime()+ ')'); //Change transactid identification
                        }
                    },
                    error: function() {
                        // body...
                        $('#transactionCreate').prop('disabled', false);
                        $('.load-spinner-2[data-spinner-id=submitTransaction]').css({
                            'display': 'none'
                        });
                        $('button[data-button-id=submitTransaction]').css({
                            'display': 'block'
                        });
                        $('.response[data-response-id=submitTransaction]').css({
                            'display': 'block'
                        }).text('Internal server error occured').delay(4000).fadeOut(1000);
                    }
                });
                $("#transactBody").trigger("reload:transactHistory"); // trigger custom event 'reload:transactionHistory'
            }
        }
    });
    /**
     * @description: Reload Transaction History
     * @event: {object} reload:transactionHistory
     */

    $("#transactBody").on('reload:transactHistory', function(e) {
            e.preventDefault();
            transactPagerCount = 0;
            tabContent = null;
            historyRowCount = 0;
            if ($('body').attr('data-current-page') === "transaction") {
                setTimeout(function() {
                    $.ajax({
                        method: 'GET',
                        url: $('input[name="searchTransact"]').attr('data-custom-transURL'),
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                        },
                        data: "?searchTransact=" + $('input[name="searchTransact"]').val() + "&searchParam=" + $('select[name="searchTransactParam"]').val() + "&page=" + transactPagerCount,
                        beforeSend: function() {
                            $("#transactPager").css({
                                'display': 'none'
                            });
                            $('.load-spinner-2').css({
                                'display': 'block'
                            });
                        },
                        success: function(response) {
                            $('#transactBody').empty();
                            //console.log(response);
                            $("#transactPager").css({
                                'display': 'block'
                            });
                            $('.load-spinner-2').css({
                                'display': 'none'
                            });
                            $.each(response, function(index, value) {
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
                        error: function() {
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