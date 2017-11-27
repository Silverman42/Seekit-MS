   $(document).ready(function () {
       /**
        * @description : Transaction Search and load 
        * @event:  keyUp
        * 
        */
       var transactPagerCount = 0
       var tabContent = null;
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
                           tabContent += '<tr><td><button style="margin:auto;display: block" type="button" data-toggle="tooltip" title="View" data-placement="bottom" class="btn btn-primary av-create"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button></td><td><a href=""><button style="margin:auto;display: block" href="www.google.com" data-toggle="tooltip" title="Update" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td class="transactionName">' + value.transaction_name + '</td><td>' + value.created_at + '</td><td class="transactionTot">' + value.total_price + '</td></tr>';
                       });
                       $('#transactBody').append(tabContent);
                       tabContent = null;
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
       $('#transactPager').click(function (e) {
           e.preventDefault();
           transactPagerCount++
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
                       tabContent += '<tr><td><button style="margin:auto;display: block" type="button" data-toggle="tooltip" title="View" data-placement="bottom" class="btn btn-primary av-create"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button></td><td><a href=""><button style="margin:auto;display: block" href="www.google.com" data-toggle="tooltip" title="Update" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td class="transactionName">' + value.transaction_name + '</td><td>' + value.created_at + '</td><td class="transactionTot">' + value.total_price + '</td></tr>';
                   });
                   $('#transactBody').append(tabContent);
                   tabContent = null;
                   if (response.length === 0) {
                       $('#transactPager').prop("disabled", true);
                   }
               },
               error: function () {
                   console.log('Could Not Connect');
               }
           });
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
                   $('.load-spinner-2').css({
                       'display': 'block'
                   });
               },
               success: function (response) {
                   console.log(response);
                   $("#transactBody").empty();
                   $("#transactPager").css({
                       'display': 'block'
                   });
                   $('.load-spinner-2').css({
                       'display': 'none'
                   });
                   $.each(response, function (index, value) {
                       tabContent += '<tr><td><button style="margin:auto;display: block" type="button" data-toggle="tooltip" title="View" data-placement="bottom" class="btn btn-primary av-create"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button></td><td><a href=""><button style="margin:auto;display: block" href="www.google.com" data-toggle="tooltip" title="Update" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td class="transactionName">' + value.transaction_name + '</td><td>' + value.created_at + '</td><td class="transactionTot">' + value.total_price + '</td></tr>';
                   });
                   $('#transactBody').append(tabContent);
                   tabContent = null;
                   if (response.length === 0) {
                       $('#transactPager').prop("disabled", true);
                   } else {
                       $('#transactPager').prop("disabled", false);
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
       if ( $('body').attr('data-current-page') === "product") {
           setTimeout(function () {
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

                       console.log(response);
                       $("#productPager").css({
                           'display': 'block'
                       });
                       $('.load-spinner-2').css({
                           'display': 'none'
                       });
                       $.each(response, function (index, value) {
                           prodTabContent += '<tr><td><a href="'+window.location.href+'/'+value.id+'/edit/'+'"><button style="margin:auto;display: block" data-toggle="tooltip" title="Update Products" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td>' + value.productName + '</td><td>' + value.category.categoryName + '</td><td>' + value.quantity + '</td><td>' + value.price + '</td></tr>';
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
           }, 1000);
       };
       $('#productPager').click(function (e) {
           e.preventDefault();
           prodPagerCount++
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

                   console.log(response);
                   $("#productPager").css({
                       'display': 'block'
                   });
                   $('.load-spinner-2').css({
                       'display': 'none'
                   });
                   $.each(response, function (index, value) {
                       prodTabContent += '<tr><td><a href="'+window.location.href+'/'+value.id+'/edit/'+'"><button style="margin:auto;display: block" data-toggle="tooltip" title="Update Products" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td>' + value.productName + '</td><td>' + value.category.categoryName + '</td><td>' + value.quantity + '</td><td>' + value.price + '</td></tr>';
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
                       prodTabContent += '<tr><td><a href="'+window.location.href+'/'+value.id+'/edit/'+'"><button style="margin:auto;display: block" data-toggle="tooltip" title="Update Products" data-placement="bottom" class="btn btn-primary"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td><td>' + value.productName + '</td><td>' + value.category.categoryName + '</td><td>' + value.quantity + '</td><td>' + value.price + '</td></tr>';
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
       $('body').click(function (e) {
            $('.av-create').each(function (index, element) {
                // element == this
                $(element).click(function (e) {
                    $('.actionView').addClass('actionView-zoomIn');
                    $('#av-legend').text($('.transactionName').eq(index).text());
                    $('#av-transactionTotal').text($('.transactionTot').eq(index).text());
                    $.ajax({
                        
                    })
                })
            })
        })
       $('#actionView-zoomOut').click(function(e){
        e.preventDefault();
        $('.actionView').removeClass('actionView-zoomIn');
        //$(this).index()
    })
   });