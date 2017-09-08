<!DOCTYPE html>
<html lang="">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Transaction Description</title>
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

<body data-spy="scroll" data-target=".navbar" data-offset="10">
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
    <div class="container-fluid">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-1 cover-2 fixed-left">
            <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="All products" data-placement="right">
                <a href="../product"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></a>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="New Product" data-placement="right">
                <a href="../product/create"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></a>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="New Category" data-placement="right">
                <a href="../new-category"><span class="glyphicon glyphicon-list" aria-hidden="true"></span></a>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="All Transactions" data-placement="right">
                <a href="transaction/"><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span></a>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="Edit Admin" data-placement="right">
                <a href="../admin"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a>
            </div>
        </div>
        <div class="col-lg-8 col-lg-push-2 cover-4" id="top">
            <div class="cover-3 ">
                <legend>Transaction Description</legend>
                <div class="cover">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity Purchased</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <a href="">sdbhshhhehhhejjekejemejj</a>
                                    </td>
                                    <td>
                                        123
                                    </td>
                                    <td>
                                        100000
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="">sdbhshhhehhhejjekejemejj</a>
                                    </td>
                                    <td>123</td>
                                    <td>
                                        100000
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Total</th>
                                    <th>3223</th>
                                    <th>772277</th>
                                </tr>
                            </tfoot>
                        </table>
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
    <script src="../js/jquery-2.1.4.min.js"></script>
    <!-- Bootstrap JavaScript -->
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/custom.js"></script>
</body>

</html>