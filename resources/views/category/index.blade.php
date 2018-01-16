<!DOCTYPE html>
<html lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf_token" content="{{ csrf_token() }}">
        <title>New Category</title>
        <!-- Bootstrap CSS -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="css/custom.css">
        <link href="css/bootstrap-theme.css" rel="stylesheet">
        <link href="css/non-responsive.css" rel="stylesheet">
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
        <div class="modal fade" id="modal-categoryEdit">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" data-modal-title-id="restockBatchList"><legend>Edit Category : <span class="categoryEditHeader"></span></legend></h4>
                    </div>
                    <div class="modal-body" data-modal-id="categoryEdit">
                        <form action="" data-form-action="{{URL::to('category')}}" method="PUT" class="form-horizontal" id="categoryUpdate" role="form">
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <input type="text" name="categoryName" id="input1/(\w+)/\u\1/g" class="form-control" value="" title="" placeholder="Category Name"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <button id="submitCategoryButton" style="margin:auto;display:  block" data-button-id="categoryEditMenu" type="submit" data-toggle="tooltip"
                                    title="Update Category" data-placement="right" class="btn btn-primary">
                                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-12">
                            <div class="load-spinner-2" data-spinner-id="categoryEditMenu">
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="response" data-response-id="categoryEditMenu"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal-productEditMenu">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" data-modal-title-id="productEdit"><legend>Edit Product: <span class="productEditHeader"></span></legend></h4>
                    </div>
                    <div class="modal-body" data-modal-id="productEditMenu">
                        <form action="" method="PUT" data-form-action= "{{URL::to('/product/')}}" id="productUpdate" role="form">
                            <div class="form-group">
                                <input name="productName" type="text" class="form-control" id="" placeholder="Product Name" required="required">
                            </div>
                            <div class="form-group">
                                <select name="productCategory" data-url="{{URL::current()}}" class="form-control inputSelectCategory">
                                </select>
                            </div>
                            <div class="form-group">
                                <textarea name="productDesc" id="input " class="form-control" rows="3" placeholder="Description"></textarea>
                            </div>
                            <button id="submitProductButton" style="margin:auto;display:  block" data-button-id="productEditMenu" type="submit" data-toggle="tooltip"
                            title="Edit Product" data-placement="right" class="btn btn-primary">
                            <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            </button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-12">
                            <div class="load-spinner-2" data-spinner-id="productEditMenu">
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="response" data-response-id="productEditMenu"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-1 cover-2 fixed-left">
                <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="All products" data-placement="right">
                    <a href="/product"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></a>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="New Product" data-placement="right">
                    <a href="/product/create"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span><sup>+</sup></a>
                 </div>
                <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="Category" data-placement="right">
                    <a href="#"><span class="glyphicon glyphicon-list" aria-hidden="true"></span></a>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="Transactions" data-placement="right">
                    <a href="/transaction"><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span></a>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-12 side-nav" data-toggle="tooltip" title="Edit Admin" data-placement="right">
                    <a href="/admin"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-md-push-2 cover-4">
                    <div class="col-lg-6">
                        <form method="POST" action="{{URL::to('/product/')}}" class="form-horizontal" id="productSubmit" role="form">
                            <div class="form-group">
                                <legend>New Product</legend>
                            </div>
                            {{ csrf_field() }}
                            <div class="form-group">
                                <div class="col-sm-10">
                                    <input type="text" name="productName" id="inputProductName" class="form-control" value="" title="" placeholder="Product Name">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-10">
                                    <select name="productCategory" data-url="{{URL::current()}}" class="form-control inputSelectCategory">
                                        <option>Select Category</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-10">
                                    <textarea name="productDesc" class="form-control" placeholder="Product Description"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <button id="submitProductButton" style="margin:auto;display:  block" data-button-id="submitProduct" type="submit" data-toggle="tooltip"
                                    title="Create Product" data-placement="right" class="btn btn-primary">
                                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                    </button>
                                    <div class="load-spinner-2" data-spinner-id="submitProduct">
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="response" data-response-id="submitProduct"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-6">
                        <form action="{{URL::to('category')}}" method="POST" class="form-horizontal" id="categorySubmit" role="form">
                            <div class="form-group">
                                <legend>New Category</legend>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-10">
                                    <input type="text" name="name" id="input1/(\w+)/\u\1/g" class="form-control" value="" title="" placeholder="Category Name">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <button id="submitCategoryButton" style="margin:auto;display:  block" data-button-id="submitCategory" type="submit" data-toggle="tooltip"
                                    title="Create Category" data-placement="right" class="btn btn-primary">
                                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                    </button>
                                    <div class="load-spinner-2" data-spinner-id="submitCategory">
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="response" data-response-id="submitCategory"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-md-offset-2 cover-4" id="top">
                    <div class="col-sm-12">
                        <legend>Categories List</legend>
                    </div>
                    <div class="col-sm-12" style="margin-bottom: 10px">
                        <input type="search" name="" id="input" class="form-control" data-input-id="categoryList" value="" required="required" placeholder="Search Category by Name" title="">
                    </div>
                    <div class="col-sm-12">
                        <div class="table-responsive">
                            <table class="table categoryList" data-categoryFetch-url = "{{URL::to('category')}}">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Category Name</th>
                                    </tr>
                                </thead>
                                <tbody data-body-id = "categoryList">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-xs-6">
                            <button id="categoryPagerBack" style="margin:auto;display: block" type="button" data-toggle="tooltip" title="Previous" data-placement="bottom" class="btn btn-primary">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            </button>
                        </div>
                        <div class="col-xs-6">
                            <button id="categoryPagerFront" style="margin:auto;display: block" type="button" data-toggle="tooltip" title="Next" data-placement="bottom" class="btn btn-primary">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            </button>
                        </div>
                        <div class="col-xs-12">
                            <div class="load-spinner-2" data-spinner-id="categoryList">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-md-push-2 cover-4" id="top">
                    <div class="col-sm-12">
                        <legend>Product List</legend>
                    </div>
                    <div class="col-sm-12" style="margin-bottom: 10px">
                        <input type="search" class="form-control" data-input-id="productEdit" value="" required="required" placeholder="Search Product by Product or Category name" title="">
                    </div>
                    <div class="col-sm-12">
                        <div class="table-responsive">
                            <table class="table productEdit" data-productFetch-url = "{{URL::to('product')}}">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Product Description</th>
                                    </tr>
                                </thead>
                                <tbody data-body-id = "productEdit">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-xs-6">
                            <button id="productEPrev" style="margin:auto;display: block" type="button" data-toggle="tooltip" title="Previous" data-placement="bottom" class="btn btn-primary">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            </button>
                        </div>
                        <div class="col-xs-6">
                            <button id="productENext" style="margin:auto;display: block" type="button" data-toggle="tooltip" title="Next" data-placement="bottom" class="btn btn-primary">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            </button>
                        </div>
                        <div class="col-xs-12">
                            <div class="load-spinner-2" data-spinner-id="productEdit">
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
                </ul>
            </div>
        </div>
        <!-- jQuery -->
        <script src="js/jquery-2.1.4.min.js"></script>
        <!-- Bootstrap JavaScript -->
        <script src="js/bootstrap.min.js"></script>
        <script src="js/custom.js"></script>
        <script src="js/custom2.js"></script>
    </body>
</html>