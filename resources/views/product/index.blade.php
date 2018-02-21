<!DOCTYPE html>
<html lang="">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf_token" content="{{ csrf_token() }}" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>All Products</title>
    <script>
        function forprint() {
            if (!window.print) {
                return
            }
            window.print()
        }
    </script>

    <!-- Bootstrap CSS -->
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootstrap-theme.css') }}" rel="stylesheet">
    <!--link href="css/non-responsive.css" rel="stylesheet"-->
    <link href="{{ asset('css/printables.css') }}" rel="stylesheet" media="print">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
</head>

<body data-spy="scroll" data-target=".navbar" data-offset="10" data-current-page="product">
    <!--Modal for New Restock-->
    <div class="modal fade" id="modal-1">
        <form action="{{URL::to('restock/store')}}" method="POST" class="form-horizontal" id="productRestock" role="form">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title"><legend>New Restock Batch for<span class="restockProdName"></span></legend></h4>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="product_id" id="vendor" class="form-control" value=""  required="required" title="">
                        <div class="form-group">
                            <label for="vendor" class="col-sm-2 control-label">Vendor: </label>
                            <div class="col-sm-10">
                                <input type="text" name="vendor" id="vendor" class="form-control" value="" required="required" title="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="quantity" class="col-sm-2 control-label">Quantity: </label>
                            <div class="col-sm-10">
                                <input type="number" name="quantity" id="quantity" class="form-control" value="" required="required" title="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="price" class="col-sm-2 control-label">Cost Price: </label>
                            <div class="col-sm-10">
                                <input type="number" name="costPrice" id="price" class="form-control" value="" required="required" title="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="price" class="col-sm-2 control-label">Selling Price: </label>
                            <div class="col-sm-10">
                                <input type="number" name="sellingPrice" id="price" class="form-control" value="" required="required" title="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="expiryDate" class="col-sm-2 control-label">Expiry Date: </label>
                            <div class="col-sm-10">
                                <input type="date" name="expiry_date" id="expiryDate" class="form-control" value="" title="">
                            </div>
                        </div>   
                    </div>
                    <div class="modal-footer">
                        <button id="" style="margin:auto;display: block" data-button-id="restockProduct" type="submit" data-toggle="tooltip" title="Submit" data-placement="bottom" class="btn btn-primary">
                            <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        </button>
                        <div class="load-spinner-2" data-spinner-id="restockProduct">
                        </div>
                        <p class="response" data-response-id="restockProduct"></p>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <!--Modal for list of Restock batches-->
    <div class="modal fade" id="modal-2">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" data-modal-title-id="restockBatchList" data-restock_list_url="{{URL::to('restock/view')}}"><legend>Restock Batches for <span class="restockProdName"></legend></span> </h4>
                </div>
                <div class="modal-body" data-modal-id="restockBatchList">
                    <div class="container-fluid">
                        <div class="row">
                                <div class="col-xs-9">
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="searchRestockBatch" id="searchRestockBatch" value="" required="required" pattern="" title="" placeholder="Search according to value of the select box">
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="form-group">
                                        <select class="form-control" name="searchRestockParam">
                                            <option value="1">Batch Id</option>
                                            <option value="2">Expiry Date</option>
                                            <option value="3">Vendor</option>
                                            <option value="4">Quantity</option>
                                        </select>
                                    </div>
                                </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead style="text-align: center;">
                                            <tr>
                                                <th>Batch ID</th>
                                                <th>Quantity</th>
                                                <th>Selling Price</th>
                                                <th>Cost Price</th>
                                                <th>Profit</th>
                                                <th>Loss</th>
                                                <th>Vendor</th>
                                                <th>Expiry Date</th>
                                                <th>Restock Date</th>
                                            </tr>
                                        </thead>
                                        <tbody id="restockListBody">
                                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="load-spinner-2" data-spinner-id="restockBatchList">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                   <span class="sr-only">Toggle navigation</span>
                   <span class="icon-bar"></span>
                   <span class="icon-bar"></span>
                   <span class="icon-bar"></span>
               </button>
            <a class="navbar-brand" href="#">Seekit</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav navbar-right">
                <form class="navbar-form pull-left form-inline">
                </form>
                <li style="padding: 15px">
                    Welcome, {{ auth()->user()->username }}
                </li>
                <li>
                    <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        {{ csrf_field() }}
                    </form>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        About
                        <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li style="padding: 20px; font-size:13px">Developed By Nkeze Sylvester Uche</li>
                        <li style="padding: 20px; font-size:13px"><a href="http://www.fIbreware.xyz" target="_blank">FIbreware 2017</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </nav>
    <div class="container-fluid">
        <div class="fixed-left">
            <div class="side-nav">
                <a href="#"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Product List</a>
            </div>
            <div class="side-nav">
                <a href="/category"><span class="glyphicon glyphicon-list" aria-hidden="true"></span> Inventory</a>
            </div>
            <div class="side-nav">
                <a href="/transaction"><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span> Transactions</a>
            </div>
            <div class="side-nav">
                <a href="/admin"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Admin</a>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 col-md-offset-2 cover-4">
                <div class="col-md-12">
                    <legend>Product List</legend>
                </div>
                <div class="col-md-12">
                    <div class="col-sm-8">
                        <div class="form-group">
                            <input type="text" data-custom-prodURL ="{{URL::to('search/product')}}" name="searchProduct" class="form-control" value="" required="required" pattern="" title="" placeholder="Search according to value of the select box">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <select class="form-control" name="searchProductParam">
                                <option value="1">Product</option>
                                <option value="2">Category</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Product Description</th>
                                </tr>
                            </thead>
                            <tbody id="prodBody">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="col-xs-6">
                        <button id="productPagerBack" style="margin:auto;display: block" type="button" data-toggle="tooltip" title="Previous" data-placement="bottom" class="btn btn-primary">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        </button>
                    </div>
                    <div class="col-xs-6">
                        <button id="productPagerFront" style="margin:auto;display: block" type="button" data-toggle="tooltip" title="Next" data-placement="bottom" class="btn btn-primary">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        </button>
                    </div>
                    <div class="col-xs-12">
                        <div class="load-spinner-2">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-btns">
            <ul>
                <li>
                    <button type="button" class="btn btn-primary" id="scroll-top">
                        <a href="#top"><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></a>
                    </button>
                </li>
                <li>
                    <button type="button" class="btn btn-primary" data-toggle="tooltip" title="Print" data-placement="right">
                        <a href="javascript:forprint()"><span class="glyphicon glyphicon-print" aria-hidden="true"></span></a>
                    </button>
                </li>
            </ul>
        </div>
        
    </div>
    <!-- jQuery -->
    <script src="{{ asset('js/jquery-2.1.4.min.js') }}"></script>
    <!-- Bootstrap JavaScript -->
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    {{--Custom Javascript--}}
    <script src="{{ asset('js/custom.js') }}"></script>
    <script src="{{ asset('js/custom2.js') }}"></script>
</body>

</html>