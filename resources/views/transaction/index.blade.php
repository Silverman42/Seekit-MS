<!DOCTYPE html>
<html lang="">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf_token" content="{{ csrf_token() }}" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Transactions</title>
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
    <!--link href="../css/non-responsive.css" rel="stylesheet"-->
    <link href="{{ asset('css/printables.css') }}" rel="stylesheet" media="print">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
</head>

<body data-spy="scroll" data-target=".navbar" data-offset="10" data-current-page="transaction">
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
    <!--Transaction Description Modal -->
    <div class="modal fade" id="modal-id">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title"><legend>Transaction id : <span id="av-legend"></span> </legend></h4>
                </div>
                <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-hover" data-av-url="{{URL::to('transaction/')}}">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Batch_id</th>
                                        <th>Vendor</th>
                                        <th>Quantity purchased</th>
                                        <th>Quantity Available</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody id="av-transaction-body">
                                </tbody>
                                <tfoot>
                                    <tr class="tfoot">
                                        <td>Total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td id="av-transactionTotal"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" style="display:block; margin: auto; margin-bottom: 5px" onclick="forprint()"><span class="glyphicon glyphicon-print" aria-hidden="true"></span></button>
                    <div class="load-spinner-2" data-spinner-count="two">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="fixed-left">
            <div class="side-nav">
                <a href="../product"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Product List</a>
            </div>
            <div class="side-nav" >
                <a href="../category"><span class="glyphicon glyphicon-list" aria-hidden="true"></span> Inventory</a>
            </div>
            <div class="side-nav">
                <a href="#"><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span> Transactions</a>
            </div>
            <div class="side-nav">
                <a href="../admin"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Admin</a>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 col-md-push-2 cover-4">
                <div class="col-md-12">
                    <div class="col-sm-11">
                        <legend>New Transaction <span id="transactionId"></span></legend>
                    </div>
                    <div class="col-sm-1">
                        <button type="button" id="delete-transact" class="btn btn-default" data-toggle="tooltip" title="Delete All Entries" data-placement="right">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <div class="col-md-12">
                <form method="POST" action="{{URL::to('/search/transproduct')}}" id="transAction">
                    {{ csrf_field() }}
                    <div class="col-md-8">
                        <div class="form-group">
                            <input type="text" name="searchItem" id="transProductSearch" class="form-control" value="" title="" placeholder="Search according to value of the select box">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <select name="search_param" class="form-control">
                                <option value="1">Product Name</option>
                                <option value="2">Batch ID</option>
                                <option value="3">Vendor</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div id="suggestion-container"></div>
                    </div>
                </form>
                </div>
                <div class="col-md-12">
                    <form id="transactForm" action="{{URL::to('/transaction')}}">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Batch_id</th>
                                            <th>Expiry Date</th>
                                            <th>Quantity purchased</th>
                                            <th>Quantity Available</th>
                                            <th>Price (#)</th>
                                            <th>Profit (#)</th>
                                            <th>Loss (#)</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="transaction-body">
                                    </tbody>
                                    <tfoot>
                                        <tr class="tfoot">
                                            <td>Total</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td id="transactionTotal">0</td>
                                            <td id="totalProfit">0</td>
                                            <td id="totalLoss">0</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div class="col-md-12" style="text-align:center">
                            <button id="transactionCreate" style="margin:auto;display:  block" disabled="disabled" data-button-id="submitTransaction" type="submit" data-toggle="tooltip"
                                title="Create transaction" data-placement="right" class="btn btn-primary">
                                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            </button>
                            <div class="load-spinner-2" data-spinner-id="submitTransaction">
                            </div>
                        </div>
                        <div class="col-md-12" style="text-align:center">
                            <p class="response" data-response-id="submitTransaction"></p>
                        </div>    
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 col-md-push-2 cover-4">
                <div class="col-md-12">
                    <div class="col-sm-12">
                        <legend>Transaction History</legend>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="col-sm-8">
                        <div class="form-group">
                            <input data-custom-transURL ="{{URL::to('search/transaction')}}" type="text" name="searchTransact" class="form-control" value="" required="required" pattern="" title="" placeholder="Search according to value of the select box">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <select class="form-control" name="searchTransactParam">
                                <option value="1">Transaction id</option>
                                <option value="2">Date & time </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table" id="av-create-container">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Transaction ID</th>
                                    <th>Time & Date</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody id="transactBody">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="col-xs-6">
                        <button id="transactPagerBack" style="margin:auto;display: block" type="button" data-toggle="tooltip" title="Previous" data-placement="bottom" class="btn btn-primary">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        </button>
                    </div>
                    <div class="col-xs-6">
                        <button id="transactPagerFront" style="margin:auto;display: block" type="button" data-toggle="tooltip" title="Next" data-placement="bottom" class="btn btn-primary">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        </button>
                    </div>
                    <div class="col-xs-12">
                        <div class="load-spinner-2" data-spinner-id="transactHistoryReload">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- jQuery -->
    <script src="{{ asset('js/jquery-2.1.4.min.js') }}"></script>
    <!-- Bootstrap JavaScript -->
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('js/custom.js') }}"></script>
    <script src="{{ asset('js/custom2.js') }}"></script>
</body>

</html>