   $(document).ready(function () {
       /**
        * @description : Transaction Search and load 
        * @event:  keyUp
        * 
        */
       var transactPagerCount = 0
       var tabContent = null;
       var historyRowCount = 0
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
                       $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
                           'display': 'block'
                       });
                   },
                   success: function (response) {

                       console.log(response);
                       $("#transactPager").css({
                           'display': 'block'
                       });
                       $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
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
       $('#transactPagerFront').click(function (e) {
           e.preventDefault();
           transactPagerCount++
           window.location.hash = transactPagerCount;
           $.ajax({
               method: 'GET',
               url: $('input[name="searchTransact"]').attr('data-custom-transURL'),
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
               },
               data: "?searchTransact=" + $('input[name="searchTransact"]').val() + "&searchParam=" + $('select[name="searchTransactParam"]').val() + "&page=" + transactPagerCount,
               beforeSend: function () {
                   $("#transactPagerFront, #transactPagerBack").css({
                       'display': 'none'
                   });
                   $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
                       'display': 'block'
                   });
               },
               success: function (response) {
                   console.log(response);
                   $("#transactPagerFront, #transactPagerBack").css({
                       'display': 'block'
                   });
                   $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
                       'display': 'none'
                   });
                   //tabContent = null;
                   if (response.length === 0) {
                       $('#transactPagerFront').prop("disabled", true);
                       $('#transactPagerback').prop("disabled", false);
                   } else {
                       $('#transactBody').empty();
                       $.each(response, function (index, value) {
                           $('#transactBody').append('<tr><td><a href="#modal-id" class="viewTransact" data-row-id="' + historyRowCount + '" data-transact-id="' + value.id + '" style="margin:auto;display:block" data-toggle="modal"><button data-toggle="tooltip" title="View" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button></a></td><td><a href=""><button style="margin:auto;display: block" href="www.google.com" data-toggle="tooltip" title="Update" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td data-row-id="' + historyRowCount + '" class="transactionName">' + value.transaction_name + '</td><td data-row-id="' + historyRowCount + '">' + value.created_at + '</td><td data-row-id="' + historyRowCount + '" class="transactionTot">' + value.total_price + '</td></tr>');
                       });
                       historyRowCount++;
                       $('#transactPagerFront,#transactPagerBack').prop("disabled", false);
                   }
               },
               error: function () {
                   console.log('Could Not Connect');
               }
           });
       });
       $('#transactPagerBack').click(function (e) {
           e.preventDefault();
           if (transactPagerCount > 0) {
               transactPagerCount--
               window.location.hash = transactPagerCount;
               $.ajax({
                   method: 'GET',
                   url: $('input[name="searchTransact"]').attr('data-custom-transURL'),
                   headers: {
                       'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                   },
                   data: "?searchTransact=" + $('input[name="searchTransact"]').val() + "&searchParam=" + $('select[name="searchTransactParam"]').val() + "&page=" + transactPagerCount,
                   beforeSend: function () {
                       $("#transactPagerFront, #transactPagerBack").css({
                           'display': 'none'
                       });
                       $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
                           'display': 'block'
                       });
                   },
                   success: function (response) {
                       console.log(response);
                       $("#transactPagerFront, #transactPagerBack").css({
                           'display': 'block'
                       });
                       $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
                           'display': 'none'
                       });
                       //tabContent = null;
                       if (response.length === 0) {
                           $('#transactPagerback').prop("disabled", true);
                       } else {
                           $('#transactBody').empty();
                           $.each(response, function (index, value) {
                               $('#transactBody').append('<tr><td><a href="#modal-id" class="viewTransact" data-row-id="' + historyRowCount + '" data-transact-id="' + value.id + '" style="margin:auto;display:block" data-toggle="modal"><button data-toggle="tooltip" title="View" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button></a></td><td><a href=""><button style="margin:auto;display: block" href="www.google.com" data-toggle="tooltip" title="Update" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td data-row-id="' + historyRowCount + '" class="transactionName">' + value.transaction_name + '</td><td data-row-id="' + historyRowCount + '">' + value.created_at + '</td><td data-row-id="' + historyRowCount + '" class="transactionTot">' + value.total_price + '</td></tr>');
                           });
                           historyRowCount--;
                           $('#transactPagerBack, #transactPagerFront').prop("disabled", false);
                       }
                   },
                   error: function () {
                       console.log('Could Not Connect');
                   }
               });
           } else {
               $('#transactPagerFront').prop("disabled", false);
               $(this).prop("disabled", true)
           }
       })
       $('input[name="searchTransact"]').keyup(function (e) {
           e.preventDefault();
           transactPagerCount = 0;
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
                   $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
                       'display': 'block'
                   });
               },
               success: function (response) {
                   console.log(response);
                   $("#transactBody").empty();
                   $("#transactPager").css({
                       'display': 'block'
                   });
                   $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
                       'display': 'none'
                   });
                   $.each(response, function (index, value) {
                       $('#transactBody').append('<tr><td><a href="#modal-id" class="viewTransact" data-row-id="' + historyRowCount + '" data-transact-id="' + value.id + '" style="margin:auto;display:block" data-toggle="modal"><button data-toggle="tooltip" title="View" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button></a></td><td><a href=""><button style="margin:auto;display: block" href="www.google.com" data-toggle="tooltip" title="Update" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td data-row-id="' + historyRowCount + '" class="transactionName">' + value.transaction_name + '</td><td data-row-id="' + historyRowCount + '">' + value.created_at + '</td><td data-row-id="' + historyRowCount + '" class="transactionTot">' + value.total_price + '</td></tr>');
                       historyRowCount++;
                   });
                   //tabContent = null;
                   if (response.length === 0) {
                       $('#transactPagerFront, #transactPagerBack').prop("disabled", true);
                   } else {
                       $('#transactPagerFront, #transactPagerBack').prop("disabled", false);
                   }
               },
               error: function () {
                   console.log('Could Not Connect');
               }
           });
       })
       /**
        * @description : Product Search and load 
        * @event:  keyUp
        * @event:  click
        * @param: int prodPagerCount //product pager counter
        * @param: string prodTabContent //product table content
        * @param: 
        */
       var prodPagerCount = 0
       var prodTabContent = null;
       if ($('body').attr('data-current-page') === "product") {
           setTimeout(function () {
               $.ajax({
                   method: 'GET',
                   url: $('input[name="searchProduct"]').attr('data-custom-prodURL'),
                   headers: {
                       'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                   },
                   data: "?searchProduct=" + $('input[name="searchProduct"]').val() + "&searchParam=" + $('select[name="searchProductParam"]').val() + "&page=" + prodPagerCount,
                   beforeSend: function () {
                       $("#productPagerFront,#productPagerBack").css({
                           'display': 'none'
                       });
                       $('.load-spinner-2').css({
                           'display': 'block'
                       });
                   },
                   success: function (response) {

                       console.log(response);
                       $("#productPagerFront,#productPagerBack").css({
                           'display': 'block'
                       });
                       $('.load-spinner-2').css({
                           'display': 'none'
                       });
                       $.each(response, function (index, value) {
                           prodTabContent += '<tr><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockProduct" href="#modal-1"><button style="margin:auto;display: block" data-toggle="tooltip" title="Restock Products" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></a></td><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockBatchList" href="#modal-2"><button style="margin:auto;display: block" data-toggle="tooltip" title="View Restock batch list" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button></a></td><td class="product_name">' + value.productName + '</td><td>' + value.category.categoryName + '</td><td>' + value.quantity + '</td></tr>';
                       });
                       $('#prodBody').append(prodTabContent);
                       prodTabContent = null;
                       if (response.length === 0) {
                           $('#productPagerFront,#productPagerBack').prop("disabled", true);
                       } else {
                           $('#productPagerFront,#productPagerBack').prop("disabled", false);
                       }
                   },
                   error: function () {
                       console.log('Could Not Connect');
                   }
               });
           }, 1000);
       };
       $('#productPagerFront').click(function (e) {
           e.preventDefault();
           prodPagerCount++
           window.location.hash = prodPagerCount;
           $.ajax({
               method: 'GET',
               url: $('input[name="searchProduct"]').attr('data-custom-prodURL'),
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
               },
               data: "?searchProduct=" + $('input[name="searchProduct"]').val() + "&searchParam=" + $('select[name="searchProductParam"]').val() + "&page=" + prodPagerCount,
               beforeSend: function () {
                   $("#productPagerFront , #productPagerBack").css({
                       'display': 'none'
                   });
                   $('.load-spinner-2').css({
                       'display': 'block'
                   });
               },
               success: function (response) {
                   console.log(response);
                   $("#productPagerFront , #productPagerBack").css({
                       'display': 'block'
                   });
                   $('.load-spinner-2').css({
                       'display': 'none'
                   });
                   if (response.length === 0) {
                       $('#productPagerFront').prop("disabled", true);
                       $('#productPagerBack').prop("disabled", false);
                   } else {
                       $.each(response, function (index, value) {
                           prodTabContent += '<tr><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockProduct" href="#modal-1"><button style="margin:auto;display: block" data-toggle="tooltip" title="Restock Products" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></a></td><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockBatchList" href="#modal-2"><button style="margin:auto;display: block" data-toggle="tooltip" title="View Restock batch list" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button></a></td><td class="product_name">' + value.productName + '</td><td>' + value.category.categoryName + '</td><td>' + value.quantity + '</td></tr>';
                       });
                       $('#prodBody').empty().append(prodTabContent);
                       prodTabContent = null;
                       $('#productPagerFront').prop("disabled", false);

                   }
               },
               error: function () {
                   console.log('Could Not Connect');
               }
           });
       })
       $('#productPagerBack').click(function (e) {
           e.preventDefault();
           if (prodPagerCount > 0) {
               prodPagerCount--
               window.location.hash = prodPagerCount;
               $.ajax({
                   method: 'GET',
                   url: $('input[name="searchProduct"]').attr('data-custom-prodURL'),
                   headers: {
                       'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                   },
                   data: "?searchProduct=" + $('input[name="searchProduct"]').val() + "&searchParam=" + $('select[name="searchProductParam"]').val() + "&page=" + prodPagerCount,
                   beforeSend: function () {
                       $("#productPagerFront , #productPagerBack").css({
                           'display': 'none'
                       });
                       $('.load-spinner-2').css({
                           'display': 'block'
                       });
                   },
                   success: function (response) {
                       console.log(response);
                       $("#productPagerFront , #productPagerBack").css({
                           'display': 'block'
                       });
                       $('.load-spinner-2').css({
                           'display': 'none'
                       });
                       if (response.length === 0) {
                           $('#productPagerBack').prop("disabled", true);
                       } else {
                           $.each(response, function (index, value) {
                               prodTabContent += '<tr><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockProduct" href="#modal-1"><button style="margin:auto;display: block" data-toggle="tooltip" title="Restock Products" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></a></td><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockBatchList" href="#modal-2"><button style="margin:auto;display: block" data-toggle="tooltip" title="View Restock batch list" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button></a></td><td class="product_name">' + value.productName + '</td><td>' + value.category.categoryName + '</td><td>' + value.quantity + '</td></tr>';
                           });
                           $('#prodBody').empty().append(prodTabContent);
                           prodTabContent = null;
                           $('#productPagerBack').prop("disabled", false);
                       }
                   },
                   error: function () {
                       console.log('Could Not Connect');
                   }
               });
           } else {
               $(this).prop('disabled', true);
               $("#productPagerFront").prop('disabled', false);
           }
       })
       $('input[name="searchProduct"]').keyup(function (e) {
           e.preventDefault();
           prodPagerCount = 0;
           $.ajax({
               method: 'GET',
               url: $('input[name="searchProduct"]').attr('data-custom-prodURL'),
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
               },
               data: "?searchProduct=" + $('input[name="searchProduct"]').val() + "&searchParam=" + $('select[name="searchProductParam"]').val() + "&page=" + prodPagerCount,
               beforeSend: function () {
                   $("#productPager").css({
                       'display': 'none'
                   });
                   $('.load-spinner-2').css({
                       'display': 'block'
                   });
               },
               success: function (response) {
                   $("#prodBody").empty();
                   console.log(response);
                   $("#productPager").css({
                       'display': 'block'
                   });
                   $('.load-spinner-2').css({
                       'display': 'none'
                   });
                   $.each(response, function (index, value) {
                       prodTabContent += '<tr><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockProduct" href="#modal-1"><button style="margin:auto;display: block" data-toggle="tooltip" title="Restock Products" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></a></td><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockBatchList" href="#modal-2"><button style="margin:auto;display: block" data-toggle="tooltip" title="View Restock batch list" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button></a></td><td class="product_name">' + value.productName + '</td><td>' + value.category.categoryName + '</td><td>' + value.quantity + '</td></tr>';
                   });
                   $('#prodBody').append(prodTabContent);
                   prodTabContent = null;
                   if (response.length === 0) {
                       $(this).prop("disabled", true);
                   } else {
                       $('#productPager').prop("disabled", false);
                   }
               },
               error: function () {
                   console.log('Could Not Connect');
               }
           });
       })
       /**
        * @description: Click event to view transaction
        */
       $('#av-create-container').on('click', '.viewTransact', function (e) {
           var index = $(this).attr('data-row-id');
           var transactionId = $('.transactionName[data-row-id = ' + index + ']').text();
           var transactionTotal = $('.transactionTot[data-row-id = ' + index + ']').text();
           $('#av-transaction-body').empty();
           var tranactionId = $('.transactionName[data-row-id = ' + index + ']');
           $('#av-legend').text(transactionId);
           $('#av-transactionTotal').text(transactionTotal);
           $.ajax({
               method: 'GET',
               url: $('.table-hover').eq(0).attr('data-av-url') + '/' + $(this).attr('data-transact-id'),
               headers: {
                   'X-CSRF-TOKEN': $('meta[name=csrf_token]').attr('content')
               },
               beforeSend: function (param) {
                   $('.load-spinner-2[data-spinner-count=two]').css({
                       'display': 'block'
                   });

               },
               success: function (response) {
                   $('.load-spinner-2[data-spinner-count=two]').css({
                       'display': 'none'
                   });
                   console.log(response);
                   $.each(response, function (indexInArray, value) {
                       $('#av-transaction-body').append($('<tr><td>' + value.product.productName + '</td><td>' + value.product_restock.batch_id + '</td><td>' + value.product_restock.Vendor + '</td><td>' + value.product_quantity_pur + '</td><td>' + value.product_quantity + '</td><td>' + value.product_price + '</td></tr>'))
                   });
               },
               error: function (param) {
                   console.log('Could Not Connect, Try Again');
               }
           });
       })
       /**
        * @description: Click Event to pop up product restock menu
        * @param:var string product_name 
        */
       var product_name
       $('#prodBody').on('click', '.restockProduct', function () {
           product_name = $(this).parent().siblings(".product_name");
           $('.restockProdName').eq(0).text(" " + product_name.text());
           $('input[name="product_id"]').val($(this).attr('data-restock_prod_id'));
       });
       /**
        * @description: Click Event to pop up product batch restock list
        */
       $('#prodBody').on('click', '.restockBatchList', function () {
           product_name = $(this).parent().siblings(".product_name");
           $('.restockProdName').eq(1).text(product_name.text());
           $('.modal-title').eq(1).attr('data-restock_prod_id', $(this).attr('data-restock_prod_id'));
           $.ajax({
               type: "method",
               url: "url",
               data: "data",
               dataType: "dataType",
               success: function (response) {
                   
               }
           });
       })
       /**
        * @description: Create new batch for product restock;
        */
       $('#productRestock').submit(function (e) {
           e.preventDefault();
           console.log($(this).serialize());
           $.ajax({
               type: $(this).attr('method'),
               url: $(this).attr('action'),
               data: $(this).serialize(),
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr("content")
               },
               beforeSend: function () {
                   $("button[data-button-id=restockProduct]").css({
                       'display': 'none'
                   });
                   $(".load-spinner-2[data-spinner-id=restockProduct]").css({
                       'display': 'block'
                   });
               },
               statusCode: {
                   500: function () {
                       console.log('Internal Server error');
                       $("button[data-button-id=restockProduct]").css({
                           'display': 'block'
                       });
                       $(".load-spinner-2[data-spinner-id=restockProduct]").css({
                           'display': 'none'
                       });
                       $(".response[data-response-id=restockProduct]").text('Internal Server error').css({
                        'display': 'block'
                    }).fadeIn(1000).delay(5000).fadeOut(1000);
                   }
               },
               success: function (response) {
                   console.log('success');
                   $("button[data-button-id=restockProduct]").css({
                       'display': 'block'
                   });
                   $(".load-spinner-2[data-spinner-id=restockProduct]").css({
                       'display': 'none'
                   });
                   $(".response[data-response-id=restockProduct]").text(response).css({
                        'display': 'block'
                    }).fadeIn(1000).delay(5000).fadeOut(1000);
                   $("#productRestock")[0].reset();

               }
           });
       })
   });