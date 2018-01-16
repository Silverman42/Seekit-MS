   $(document).ready(function() {
       /**
        * @description : Transaction Search and load//
        * @event:  keyUp//
        *
        */
       var transactPagerCount = 0;
       var tabContent = null;
       var historyRowCount = 0;
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
                       $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
                           'display': 'block'
                       });
                   },
                   success: function(response) {

                       console.log(response);
                       $("#transactPager").css({
                           'display': 'block'
                       });
                       $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
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
       }
       $('#transactPagerFront').click(function(e) {
           e.preventDefault();
           transactPagerCount++;
           window.location.hash = transactPagerCount;
           $.ajax({
               method: 'GET',
               url: $('input[name="searchTransact"]').attr('data-custom-transURL'),
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
               },
               data: "?searchTransact=" + $('input[name="searchTransact"]').val() + "&searchParam=" + $('select[name="searchTransactParam"]').val() + "&page=" + transactPagerCount,
               beforeSend: function() {
                   $("#transactPagerFront, #transactPagerBack").css({
                       'display': 'none'
                   });
                   $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
                       'display': 'block'
                   });
               },
               success: function(response) {
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
                       $.each(response, function(index, value) {
                           $('#transactBody').append('<tr><td><a href="#modal-id" class="viewTransact" data-row-id="' + historyRowCount + '" data-transact-id="' + value.id + '" style="margin:auto;display:block" data-toggle="modal"><button data-toggle="tooltip" title="View" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button></a></td><td><a href=""><button style="margin:auto;display: block" href="www.google.com" data-toggle="tooltip" title="Update" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td data-row-id="' + historyRowCount + '" class="transactionName">' + value.transaction_name + '</td><td data-row-id="' + historyRowCount + '">' + value.created_at + '</td><td data-row-id="' + historyRowCount + '" class="transactionTot">' + value.total_price + '</td></tr>');
                       });
                       historyRowCount++;
                       $('#transactPagerFront,#transactPagerBack').prop("disabled", false);
                   }
               },
               error: function() {
                   console.log('Could Not Connect');
               }
           });
       });
       $('#transactPagerBack').click(function(e) {
           e.preventDefault();
           if (transactPagerCount > 0) {
               transactPagerCount--;
               window.location.hash = transactPagerCount;
               $.ajax({
                   method: 'GET',
                   url: $('input[name="searchTransact"]').attr('data-custom-transURL'),
                   headers: {
                       'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                   },
                   data: "?searchTransact=" + $('input[name="searchTransact"]').val() + "&searchParam=" + $('select[name="searchTransactParam"]').val() + "&page=" + transactPagerCount,
                   beforeSend: function() {
                       $("#transactPagerFront, #transactPagerBack").css({
                           'display': 'none'
                       });
                       $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
                           'display': 'block'
                       });
                   },
                   success: function(response) {
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
                           $.each(response, function(index, value) {
                               $('#transactBody').append('<tr><td><a href="#modal-id" class="viewTransact" data-row-id="' + historyRowCount + '" data-transact-id="' + value.id + '" style="margin:auto;display:block" data-toggle="modal"><button data-toggle="tooltip" title="View" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button></a></td><td><a href=""><button style="margin:auto;display: block" href="www.google.com" data-toggle="tooltip" title="Update" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td data-row-id="' + historyRowCount + '" class="transactionName">' + value.transaction_name + '</td><td data-row-id="' + historyRowCount + '">' + value.created_at + '</td><td data-row-id="' + historyRowCount + '" class="transactionTot">' + value.total_price + '</td></tr>');
                           });
                           historyRowCount--;
                           $('#transactPagerBack, #transactPagerFront').prop("disabled", false);
                       }
                   },
                   error: function() {
                       console.log('Could Not Connect');
                   }
               });
           } else {
               $('#transactPagerFront').prop("disabled", false);
               $(this).prop("disabled", true)
           }
       });
       $('input[name="searchTransact"]').keyup(function(e) {
           e.preventDefault();
           transactPagerCount = 0;
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
                   $('.load-spinner-2[data-spinner-id=transactHistoryReload]').css({
                       'display': 'block'
                   });
               },
               success: function(response) {
                   console.log(response);
                   $("#transactBody").empty();
                   $("#transactPager").css({
                       'display': 'block'
                   });
                   $('.load-spinner-2[data-spinner-id=transactHistoryReload]    ').css({
                       'display': 'none'
                   });
                   $.each(response, function(index, value) {
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
               error: function() {
                   console.log('Could Not Connect');
               }
           });
       });
       /**
        * @description : Product Search and load
        * @event:  keyUp
        * @event:  click
        * @param: int prodPagerCount //product pager counter
        * @param: string prodTabContent //product table content
        */
       var prodPagerCount = 0;
       var prodTabContent = null;
       if ($('body').attr('data-current-page') === "product") {
           setTimeout(function() {
               $.ajax({
                   method: 'GET',
                   url: $('input[name="searchProduct"]').attr('data-custom-prodURL'),
                   headers: {
                       'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                   },
                   data: "?searchProduct=" + $('input[name="searchProduct"]').val() + "&searchParam=" + $('select[name="searchProductParam"]').val() + "&page=" + prodPagerCount,
                   beforeSend: function() {
                       $("#productPagerFront,#productPagerBack").css({
                           'display': 'none'
                       });
                       $('.load-spinner-2').css({
                           'display': 'block'
                       });
                   },
                   success: function(response) {

                       console.log(response);
                       $("#productPagerFront,#productPagerBack").css({
                           'display': 'block'
                       });
                       $('.load-spinner-2').css({
                           'display': 'none'
                       });
                       $.each(response, function(index, value) {
                           prodTabContent += '<tr><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockProduct" href="#modal-1"><button style="margin:auto;display: block" data-toggle="tooltip" title="Restock Products" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></a></td><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockBatchList" href="#modal-2"><button style="margin:auto;display: block" data-toggle="tooltip" title="View Restock batch list" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button></a></td><td class="product_name">' + value.productName + '</td><td>' + value.category.categoryName + '</td><td>' + value.product_desc + '</td></tr>';
                       });
                       $('#prodBody').append(prodTabContent);
                       prodTabContent = null;
                       if (response.length === 0) {
                           $('#productPagerFront,#productPagerBack').prop("disabled", true);
                       } else {
                           $('#productPagerFront,#productPagerBack').prop("disabled", false);
                       }
                   },
                   error: function() {
                       console.log('Could Not Connect');
                   }
               });
           }, 1000);
       }
       $('#productPagerFront').click(function(e) {
           e.preventDefault();
           prodPagerCount++;
           window.location.hash = prodPagerCount;
           $.ajax({
               method: 'GET',
               url: $('input[name="searchProduct"]').attr('data-custom-prodURL'),
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
               },
               data: "?searchProduct=" + $('input[name="searchProduct"]').val() + "&searchParam=" + $('select[name="searchProductParam"]').val() + "&page=" + prodPagerCount,
               beforeSend: function() {
                   $("#productPagerFront , #productPagerBack").css({
                       'display': 'none'
                   });
                   $('.load-spinner-2').css({
                       'display': 'block'
                   });
               },
               success: function(response) {
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
                       $.each(response, function(index, value) {
                           prodTabContent += '<tr><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockProduct" href="#modal-1"><button style="margin:auto;display: block" data-toggle="tooltip" title="Restock Products" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></a></td><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockBatchList" href="#modal-2"><button style="margin:auto;display: block" data-toggle="tooltip" title="View Restock batch list" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button></a></td><td class="product_name">' + value.productName + '</td><td>' + value.category.categoryName + '</td><td>' + value.product_desc + '</td></tr>';
                       });
                       $('#prodBody').empty().append(prodTabContent);
                       prodTabContent = null;
                       $('#productPagerFront').prop("disabled", false);

                   }
               },
               error: function() {
                   console.log('Could Not Connect');
               }
           });
       });
       $('#productPagerBack').click(function(e) {
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
                   beforeSend: function() {
                       $("#productPagerFront , #productPagerBack").css({
                           'display': 'none'
                       });
                       $('.load-spinner-2').css({
                           'display': 'block'
                       });
                   },
                   success: function(response) {
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
                           $.each(response, function(index, value) {
                             prodTabContent += '<tr><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockProduct" href="#modal-1"><button style="margin:auto;display: block" data-toggle="tooltip" title="Restock Products" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></a></td><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockBatchList" href="#modal-2"><button style="margin:auto;display: block" data-toggle="tooltip" title="View Restock batch list" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button></a></td><td class="product_name">' + value.productName + '</td><td>' + value.category.categoryName + '</td><td>' + value.product_desc + '</td></tr>';
                           });
                           $('#prodBody').empty().append(prodTabContent);
                           prodTabContent = null;
                           $('#productPagerBack').prop("disabled", false);
                       }
                   },
                   error: function() {
                       console.log('Could Not Connect');
                   }
               });
           } else {
               $(this).prop('disabled', true);
               $("#productPagerFront").prop('disabled', false);
           }
       });
       $('input[name="searchProduct"]').keyup(function(e) {
           e.preventDefault();
           prodPagerCount = 0;
           $.ajax({
               method: 'GET',
               url: $('input[name="searchProduct"]').attr('data-custom-prodURL'),
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
               },
               data: "?searchProduct=" + $('input[name="searchProduct"]').val() + "&searchParam=" + $('select[name="searchProductParam"]').val() + "&page=" + prodPagerCount,
               beforeSend: function() {
                   $("#productPager").css({
                       'display': 'none'
                   });
                   $('.load-spinner-2').css({
                       'display': 'block'
                   });
               },
               success: function(response) {
                   $("#prodBody").empty();
                   console.log(response);
                   $("#productPager").css({
                       'display': 'block'
                   });
                   $('.load-spinner-2').css({
                       'display': 'none'
                   });
                   $.each(response, function(index, value) {
                       prodTabContent += '<tr><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockProduct" href="#modal-1"><button style="margin:auto;display: block" data-toggle="tooltip" title="Restock Products" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></a></td><td><a data-toggle="modal" data-restock_prod_id="' + value.id + '" class="restockBatchList" href="#modal-2"><button style="margin:auto;display: block" data-toggle="tooltip" title="View Restock batch list" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button></a></td><td class="product_name">' + value.productName + '</td><td>' + value.category.categoryName + '</td><td>' + value.product_desc + '</td></tr>';
                   });
                   $('#prodBody').append(prodTabContent);
                   prodTabContent = null;
                   if (response.length === 0) {
                       $(this).prop("disabled", true);
                   } else {
                       $('#productPager').prop("disabled", false);
                   }
               },
               error: function() {
                   console.log('Could Not Connect');
               }
           });
       });
       /**
        * @description: Click event to view transaction
        */
       $('#av-create-container').on('click', '.viewTransact', function(e) {
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
               beforeSend: function(param) {
                   $('.load-spinner-2[data-spinner-count=two]').css({
                       'display': 'block'
                   });

               },
               success: function(response) {
                   $('.load-spinner-2[data-spinner-count=two]').css({
                       'display': 'none'
                   });
                   console.log(response);
                   $.each(response, function(indexInArray, value) {
                       $('#av-transaction-body').append($('<tr><td>' + value.product.productName + '</td><td>' + value.product_restock.batch_id + '</td><td>' + value.product_restock.Vendor + '</td><td>' + value.product_quantity_pur + '</td><td>' + value.product_quantity + '</td><td>' + value.product_price + '</td></tr>'))
                   });
               },
               error: function(param) {
                   console.log('Could Not Connect, Try Again');
               }
           });
       });
       /**
        * @description: Click Event to pop up product restock menu
        * @param:var string product_name 
        */
       var product_name;
       $('#prodBody').on('click', '.restockProduct', function() {
           product_name = $(this).parent().siblings(".product_name");
           $('.restockProdName').eq(0).text(" " + product_name.text());
           $('input[name="product_id"]').val($(this).attr('data-restock_prod_id'));
       });
       /**
        * @description: Click Event to pop up product batch restock list
        * @param: {integer} restock_id
        * @param: {integer} paginator
        */
       /*
       (function () {  
           $.fn.dataTable = function(param){
               var options = $.extend({
                   ajaxUrl: null,
                   ajaxType: 'GET',
                   ajaxDataParam: [0,0],
                   bodySelector: null,
                   appendedData: null,
                   eventStatus: 0,
               },param)
               return this.each(function (index,el) {  
                   var paginator = options.ajaxDataParam[1];
                   var id = options.ajaxDataParam[0];
                   var element = el
                   function ajaxLoad(options){
                       $.ajax({
                           type: options.ajaxType,
                           url: options.ajaxUrl,
                           data: '?id='+id+'&page='+paginator,
                           dataType: options.ajaxData,
                           success: function (response) {
                               console.log(response);
                               $.each(response, function (indexInArray, value) { 
                                   options.appendedData = value;
                                   $('#restockListBody').append(options.appendedData);
                               });
                               console.log('paginator = '+ paginator+ ' '+value);
                           },
                           error:function () {  
                               console.log('error')
                           }
                       });
                   }
                   if(options.eventStatus === 0){
                       ajaxLoad(options);
                   }
                   else if(options.eventStatus === 1){
                       ajaxLoad(options);
                       paginator++;
                   }
               })
           }
       }(jQuery))*/
       var restock_id;
       var paginator = 0;
       var restockSearchInput = $('#searchRestockBatch').val();
       var restockSearchParam = $('select[name=searchRestockParam]').val();
       $('#prodBody').on('click', '.restockBatchList', function() {
           product_name = $(this).parent().siblings(".product_name");
           $('.restockProdName').eq(1).text(product_name.text());
           restock_id = $(this).attr('data-restock_prod_id');
           $('#searchRestockBatch').val('');
           $('.modal-body[data-modal-id = restockBatchList]').trigger("load:restockBatchList");
       });
       $('.modal-body[data-modal-id = restockBatchList]').on('load:restockBatchList', function() {
               var url = $('.modal-title[data-modal-title-id = restockBatchList]').attr('data-restock_list_url');
               paginator = 0;
               $.ajax({
                   type: "GET",
                   url: url,
                   data: "?id=" + restock_id + "&page=" + paginator + "&searchInput=" + restockSearchInput + "&searchParam=" + restockSearchParam,
                   statusCode: {
                       500: function() {
                           console.log('internal server error');
                       }
                   },
                   success: function(response) {
                       //console.log(response);
                       $('#restockListBody').empty();
                       $.each(response, function(indexInArray, value) {
                           $('#restockListBody').append('<tr><td>' + value.batch_id + '</td><td>' + value.quantity + '</td><td>' + value.price + '</td><td>' + value.Vendor + '</td><td>' + value.expiry + '</td><td>' + value.created_at + '</td></tr>');
                       });
                   }
               });
               /*var value = {batch_id:"3",quantity:"3",price:"3",Vendor:"3",expiry:"3",created_at:"3"};
               $(this).dataTable({ajaxUrl:url, ajaxDataParam:[restock_id,0], appendedData:'<tr><td>'+value.batch_id+'</td><td>'+value.quantity+'</td><td>'+value.price +'</td><td>'+value.Vendor+'</td><td>'+value.expiry+'</td><td>'+value.created_at+'</td></tr>'});*/
           })
           /**
            * @description: keyup event to search for product Description Batch
            */
       $('#searchRestockBatch').keyup(function(e) {
           e.preventDefault();
           paginator = 0;
           var restockSearchInput = $(this).val();
           var url = $('.modal-title[data-modal-title-id = restockBatchList]').attr('data-restock_list_url');
           $.ajax({
               type: "GET",
               url: url,
               data: "?id=" + restock_id + "&page=" + paginator + "&searchInput=" + restockSearchInput,
               statusCode: {
                   500: function() {
                       console.log('internal server error');
                   }
               },
               success: function(response) {
                   //console.log(response);
                   $('#restockListBody').empty();
                   $.each(response, function(indexInArray, value) {
                       $('#restockListBody').append('<tr><td>' + value.batch_id + '</td><td>' + value.quantity + '</td><td>' + value.price + '</td><td>' + value.Vendor + '</td><td>' + value.expiry + '</td><td>' + value.created_at + '</td></tr>');
                       console.log(value);
                   });
               }
           });
       });
       /**
        * @description: Create new batch for product restock;
        */
       $('#productRestock').submit(function(e) {
           e.preventDefault();
           console.log($(this).serialize());
           $.ajax({
               type: $(this).attr('method'),
               url: $(this).attr('action'),
               data: $(this).serialize(),
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr("content")
               },
               beforeSend: function() {
                   $("button[data-button-id=restockProduct]").css({
                       'display': 'none'
                   });
                   $(".load-spinner-2[data-spinner-id=restockProduct]").css({
                       'display': 'block'
                   });
               },
               statusCode: {
                   500: function() {
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
               success: function(response) {
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
       var dataPagination = (function() {
           // body...
           var previousButton, nextButton, spinAnimate, options, appendTarget;
           return {
               previousButton: null,
               nextButton: null,
               spinAnimate: null,
               paginate: 0,
               appendTarget: null,
               ajaxOps: function(param1, succeessAction) {
                   // body...
                   options = $.extend({
                       url: null,
                       method: null,
                       data: null,
                       callback: function(param) {}
                   }, param1)
                   previousButton = this.previousButton;
                   nextButton = this.nextButton;
                   spinAnimate = this.spinAnimate;
                   appendTarget = this.appendTarget;
                   paginate = this.paginate;
                   $.ajax({
                       url: options.url,
                       type: options.method,
                       data: options.data + "&paginate=" + paginate,
                       headers: {
                           'X-CSRF-TOKEN': $("meta[name=csrf_token]").attr('content')
                       },
                       beforeSend: function() {

                           // body..
                           $(previousButton + ',' + nextButton).css({
                               'display': 'none'
                           });
                           $(spinAnimate).css({
                               'display': 'block'
                           });
                           console.log(previousButton + ' ' + nextButton + ' ' + spinAnimate)
                       },
                       success: function(response) {
                           $(appendTarget).empty();
                           $.each(response, function(index, value) {
                               // body...
                               options.callback(value);
                           })
                           succeessAction(response);
                       }
                   });
               },
               dataLoad: function(param) {
                   console.log(param);
                   this.ajaxOps(param, function() {
                       $(previousButton + ',' + nextButton).css({
                           'display': 'block'
                       });
                       $(spinAnimate).css({
                           'display': 'none'
                       });
                   });
                   return this.paginate;
               },
               prevLoad: function(param) {
                   if (this.paginate > 0) {
                       this.paginate--;
                       console.log(this.paginate);
                       this.ajaxOps(param, function(response) {
                           $(previousButton + ',' + nextButton).css({
                               'display': 'block'
                           });
                           $(spinAnimate).css({
                               'display': 'none'
                           });
                           if (response.length == 0) {
                               $(previousButton).prop('disabled', true);
                               $(nextButton).prop('disabled', false);

                           } else {
                               $(previousButton).prop('disabled', false);
                               $(nextButton).prop('disabled', false);
                           }
                       });
                   } else {
                       $(previousButton).prop('disabled', true);
                   }
                   return this.paginate;
               },
               nextLoad: function(param) {
                   this.paginate++;
                   this.ajaxOps(param, function(response) {
                       $(previousButton + ',' + nextButton).css({
                           'display': 'block'
                       });
                       $(spinAnimate).css({
                           'display': 'none'
                       });
                       if (response.length == 0) {
                           $(nextButton).prop('disabled', true);
                           $(previousButton).prop('disabled', false);
                       } else {
                           $(nextButton).prop('disabled', false);
                           $(previousButton).prop('disabled', false);
                       }
                   });
                   console.log(this.paginate);
                   return this.paginate;
               },
           }
       });
       var formSubmit = (function() { //template for form submit and auto trigger of cutsom event
           var optionNew, triggerParam = [],
               obj, triggerAct;
           return {
               formSelector: null,
               triggerState: 0,
               triggerTarget: null,
               triggerName: null,
               ajaxProcess: function(param) {
                       //Process form submition;
                       obj = this.formSelector;
                       optionNew = $.extend({
                           spinAnimate: null,
                           responseSelector: null,
                           responseMess: ['Submit successfull', 'Submit failed, try again'],
                           submitSelector: null,
                           triggerAction: function() {},
                           callback: function() {}
                       }, param);
                       triggerParam[0] = this.triggerState;
                       triggerParam[1] = this.triggerTarget;
                       triggerParam[3] = this.triggerName;
                       $(this.formSelector).submit(function(e) {
                           e.preventDefault();
                           $.ajax({
                               url: $(obj).attr('action'),
                               type: $(obj).attr('method'),
                               data: $(obj).serialize(),
                               headers: {
                                   'X-CSRF-TOKEN': $('meta[name=csrf_token]').attr('content')
                               },
                               beforeSend: function() {
                                   $(optionNew.submitSelector).css({
                                       "display": "none"
                                   });
                                   $(optionNew.spinAnimate).css({
                                       'display': 'block'
                                   });
                               },
                               success: function(data) {
                                   optionNew.responseMess[0] = data;
                                   $(optionNew.submitSelector).css({
                                       "display": "block"
                                   });
                                   $(optionNew.spinAnimate).css({
                                       'display': 'none'
                                   });
                                   $(optionNew.responseSelector).css({
                                       'display': 'block'
                                   }).text(optionNew.responseMess[0]).delay(4000).fadeOut(1000);
                                   if (triggerParam[0] === 1) {
                                       $(triggerParam[1]).trigger(triggerParam[3]);
                                       $(triggerParam[1]).on(triggerParam[3], optionNew.triggerAction());
                                   }
                               },
                               error: function() {
                                   $(optionNew.submitSelector).css({
                                       "display": "block"
                                   });
                                   $(optionNew.responseSelector).css({
                                       'display': 'block'
                                   }).text(optionNew.responseMess[1]).delay(4000).fadeOut(1000);
                                   $(optionNew.spinAnimate).css({
                                       'display': 'none'
                                   });
                               }
                           });
                           optionNew.callback();
                       });

                   }
                   // body...
           }
       });
       //Create category
       var categoryListState = (function() { //state variable to check if new category have been added or deleted
           return {
               variable: 0
           };
       })();
       $("#categorySubmit").submit(function(e) {
           e.preventDefault();
           var method = $(this).attr('method');
           var action = $(this).attr('action');
           var data = $(this).serialize();
           var form = $(this);

           $.ajax({
               type: method,
               url: action,
               data: data,
               headers: {
                   'X-CSRF-TOKEN': $('meta[name=csrf_token]').attr("content")
               },
               success: function(response, status, xhr) {
                   if (xhr.status === 201) {
                       $('.response[data-response-id=submitCategory]').text(response).fadeIn(1000).delay(4000).fadeOut(1000);
                   } else if (xhr.status === 200) {
                       $('.response[data-response-id=submitCategory]').text(response).fadeIn(1000).delay(4000).fadeOut(1000);
                   } else if (xhr.status === 202) {
                       form[0].reset();
                       output = "Submit successful";
                       $('.response[data-response-id=submitCategory]').text(response).fadeIn(1000).delay(4000).fadeOut(1000);
                       categoryListState.variable = 1;
                   }
                   console.log(xhr);
                   //$('.')
               },
               error: function() {
                   console.log(action);
               }
           });
       });
       /**
        * @description: Select Category;
        */
       $(".inputSelectCategory").click(function(e) {
           e.preventDefault();
           if (categoryListState.variable === 0 || categoryListState.variable === 1) {
               var url = $(this).attr('data-url');
               var thisObj = $(".inputSelectCategory");
               $.ajax({
                   type: "GET",
                   url: url,
                   success: function(response) {
                        thisObj.empty();
                       $.each(response, function(index, value) {
                           thisObj.append("<option value=" + value.id + ">" + value.categoryName + "</option>");
                       });
                       categoryListState.variable = 2;
                   }
               });
           }
       });
       (function() {
           // Paginate Category List in Saved category View
           var method = "GET";
           var url = $('.categoryList').attr("data-categoryFetch-url");
           var categoryPaginate = new dataPagination;
           var data = "?state=ok";
           var appendTarget = 'tbody[data-body-id = categoryList]';
           var ajaxParam = {
               url: url,
               method: method,
               data: data,
               callback: function(output) {
                   $(appendTarget).append('<tr><td><a data-toggle="modal" data-edit-category-id="' + output.id + '" href="#modal-categoryEdit" class="categoryEditMenuButton"><button style="margin:auto;display: block" data-toggle="tooltip" title="Edit category" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td class="categoryEditName">' + output.categoryName + '</td>');
                   //console.log(output);
               }
           };
           categoryPaginate.appendTarget = appendTarget;
           categoryPaginate.previousButton = "#categoryPagerBack";
           categoryPaginate.nextButton = "#categoryPagerFront";
           categoryPaginate.spinAnimate = ".load-spinner-2[data-spinner-id=categoryList]";
           categoryPaginate.paginate = 0;
           categoryPaginate.dataLoad(ajaxParam);
           $('#categoryPagerBack').click(function(event) {
               // body...
               event.preventDefault();
               categoryPaginate.prevLoad(ajaxParam);
           });
           $('#categoryPagerFront').click(function(event) {
               // body...
               event.preventDefault();
               categoryPaginate.nextLoad(ajaxParam);
           });
           $('input[data-input-id="categoryList"]').keyup(function(event) {
               // body...
               event.preventDefault();
               categoryPaginate.paginate = 0;
               console.log($(this).val());
               data = "?searchParam=" + $(this).val();
               ajaxParam.data = data;
               categoryPaginate.dataLoad(ajaxParam);
           });
           //Category Edit and Update;
           var categoryEdit = new formSubmit;
           categoryEdit.triggerState = 1;
           categoryEdit.triggerName = "reload:categoryList";
           categoryEdit.triggerTarget = "tbody[data-body-id=categoryList]";
           categoryEdit.formSelector = "#categoryUpdate";
           categoryEdit.ajaxProcess({
               spinAnimate: '.load-spinner-2[data-spinner-id="categoryEditMenu"]',
               responseSelector: '.response[data-response-id=categoryEditMenu]',
               submitSelector: 'button[data-button-id = categoryEditMenu]',
               triggerAction: function() {
                   categoryPaginate.dataLoad(ajaxParam);
               },
               callback: function() {
                   // Refresh the category list in all <select> tags after each category related ajax request using the `categoryListState` variable.
                   categoryListState.variable = 1;
               }
           });
           //console.log(categoryListState.variable);
       })();
       (function() {
           // Object to fetch product list for Editing
           var method = "GET";
           var url = $('.productEdit').attr("data-productFetch-url");
           var productPaginate = new dataPagination;
           var data = "?state=ok";
           var appendTarget = 'tbody[data-body-id = productEdit]';
           var ajaxParam = {
               url: url,
               method: method,
               data: data,
               callback: function(output) {
                   $(appendTarget).append('<tr><td><a data-toggle="modal" data-edit-prod-id="' + output.id + '" href="#modal-productEditMenu" class="productEditMenuButton"><button style="margin:auto;display: block" data-toggle="tooltip" title="Edit Product" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td class="productEditName">' + output.productName + '</td><td>' + output.category.categoryName + '</td><td class="productEditDesc">' + output.product_desc + '</td></tr>');
                   //console.log(output);
               }
           };
           productPaginate.appendTarget = appendTarget;
           productPaginate.previousButton = "#productEPrev";
           productPaginate.nextButton = "#productENext";
           productPaginate.spinAnimate = ".load-spinner-2[data-spinner-id=productEdit]"
           productPaginate.paginate = 0;
           productPaginate.dataLoad(ajaxParam);
           $('#productEPrev').click(function(event) {
               // body...
               event.preventDefault();
               productPaginate.prevLoad(ajaxParam);
           });
           $('#productENext').click(function(event) {
               // body...
               event.preventDefault();
               productPaginate.nextLoad(ajaxParam);
           });
           $('input[data-input-id="productEdit"]').keyup(function(event) {
               // body...
               event.preventDefault();
               productPaginate.paginate = 0;
               console.log($(this).val());
               data = "?searchParam=" + $(this).val();
               ajaxParam.data = data;
               productPaginate.dataLoad(ajaxParam);
           });

           //Product Edit and Update;
           var productEdit = new formSubmit;
           productEdit.triggerState = 1;
           productEdit.triggerName = "reload:productList";
           productEdit.triggerTarget = "tbody[data-body-id=productEdit]";
           productEdit.formSelector = "#productUpdate";
           productEdit.ajaxProcess({
               spinAnimate: '.load-spinner-2[data-spinner-id="productEditMenu"]',
               responseSelector: '.response[data-response-id=productEditMenu]',
               submitSelector: 'button[data-button-id = productEditMenu]',
               triggerAction: function() {
                   productPaginate.dataLoad(ajaxParam);
                   console.log('good');
               }
           });
       })();
       (function() {
           $('tbody[data-body-id = productEdit]').on('click', 'a.productEditMenuButton', function(e) {
               e.preventDefault();
               var productEditURL = $('#productUpdate').attr('data-form-action') + '/' + $(this).attr('data-edit-prod-id');
               var productName = $(this).parent().siblings(".productEditName").text();
               var productDesc = $(this).parent().siblings(".productEditDesc").text();
               $('#productUpdate').attr('action', productEditURL);
               $('.productEditHeader').text(productName);
               $('#productUpdate>div>input[name=productName]').val(productName);
               $('#productUpdate>div>textarea[name=productDesc]').val(productDesc);
               console.log($('#productUpdate').attr('action'));
               // body...
           });
       })();
       (function() {
           $('tbody[data-body-id = categoryList]').on('click', 'a.categoryEditMenuButton', function(e) {
               e.preventDefault();
               var categoryEditURL = $('#categoryUpdate').attr('data-form-action') + '/' + $(this).attr('data-edit-category-id');
               var categoryName = $(this).parent().siblings(".categoryEditName").text();
               $('#categoryUpdate').attr('action', categoryEditURL);
               $('.categoryEditHeader').text(categoryName);
               $('#categoryUpdate>div>div>input[name=categoryName]').val(categoryName);
               console.log($('#categoryUpdate').attr('action'));
               // body...
           });
       })();
   });