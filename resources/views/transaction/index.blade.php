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
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/custom.css" rel="stylesheet">
    <link href="../css/bootstrap-theme.css" rel="stylesheet">
    <link href="../css/non-responsive.css" rel="stylesheet">
    <link href="../css/printables.css" rel="stylesheet" media="print">
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
                <li>
                    <a href="#" data-toggle="tooltip" title="Logout" data-placement="bottom">
                        <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>
                    </a>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        About
                        <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>ligdhh</li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </nav>
    <div class="actionView">
        <div class="row">
            <div class="col-md-8 col-md-offset-2 cover-4">
                <div class="col-md-12">
                    <div class="col-sm-11">
                        <legend id="av-legend">New Transaction</legend>
                    </div>
                    <div class="col-sm-1">
                        <button type="button" id="actionView-zoomOut" class="btn btn-default" data-toggle="tooltip" title="Exit" data-placement="right">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product</th>
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
                                    <td id="av-transactionTotal"></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-1 cover-2 fixed-left">
            <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="All products" data-placement="right">
                <a href="../product"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></a>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="New Product" data-placement="right">
                <a href="../product/create"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span><sup>+</sup></a>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="Category" data-placement="right">
                <a href="../category"><span class="glyphicon glyphicon-list" aria-hidden="true"></span></a>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="Transactions" data-placement="right">
                <a href="/transaction"><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span></a>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="Edit Admin" data-placement="right">
                <a href="../admin"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 col-md-push-2 cover-4">
                <div class="col-md-12">
                    <div class="col-sm-11">
                        <legend>New Transaction</legend>
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
                        <div class="form-group">
                            <input type="text" name="searchItem" id="transProductSearch" class="form-control" value="" title="" placeholder="Search product">
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
                                            <th>Quantity purchased</th>
                                            <th>Quantity Available</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody id="transaction-body">
                                    </tbody>
                                    <tfoot>
                                        <tr class="tfoot">
                                            <td>Total</td>
                                            <td id="transactionTotal"></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div class="col-md-12" style="text-align:center">
                            <button id="transactionCreate" disabled="disabled" style="margin:auto;display: block" type="submit" data-toggle="tooltip"
                                title="Create transaction" data-placement="right" class="btn btn-primary">
                                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            </button>
                            <div class="load-spinner">
                            </div>
                        </div>
                        <div class="col-md-12" style="text-align:center">
                            <p class="response"></p>
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
                        <table class="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Transaction ID</th>
                                    <th>Time & Date</th>
                                    <th>Profit</th>
                                </tr>
                            </thead>
                            <tbody id="transactBody">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-12">
                    <button id="transactPager" style="margin:auto;display: block" type="button" data-toggle="tooltip" title="Next" data-placement="bottom" class="btn btn-primary">
                        <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                    </button>
                    <div class="load-spinner-2">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- jQuery -->
    <script src="../js/jquery-2.1.4.min.js"></script>
    <!-- Bootstrap JavaScript -->
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/custom.js"></script>
    <script src="../js/custom2.js"></script>
</body>

</html>