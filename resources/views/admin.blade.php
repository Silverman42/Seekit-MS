<!DOCTYPE html>
<html lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf_token" content="{{ csrf_token() }}">
        <title>Admin Panel</title>
        <!-- Bootstrap CSS -->
        <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="{{ asset('css/custom.css') }}">
        <link href="{{ asset('css/bootstrap-theme.css') }}" rel="stylesheet">
        <!--link href="css/non-responsive.css" rel="stylesheet"-->
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
                    <a href="/product"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Product List</a>
                </div>
                <div class="side-nav">
                    <a href="/category"><span class="glyphicon glyphicon-list" aria-hidden="true"></span> Inventory</a>
                </div>
                <div class="side-nav">
                    <a href="/transaction"><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span> Transactions</a>
                </div>
                <div class="side-nav">
                    <a href="#"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Admin</a>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-md-push-2 cover-4">
                    <div class="col-sm-12">
                        <legend>Add New User</legend>
                    </div>
                    <form method="POST" action="{{URL::to('/admin/store')}}" class="form-horizontal" id="productSubmit" role="form">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <div class="col-sm-12">
                                <input type="text" name="username" id="username" required class="form-control" value="" title="" placeholder="Username">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                <input type="email" name="email" id="email" required class="form-control" value="" title="" placeholder="Email">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                <select name="role" data-url="{{URL::current()}}" class="form-control inputSelectRole">
                                    <option>Select Role</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                <input type="password" name="password" id="password" required class="form-control" value="" title="" placeholder="Password">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                <button id="submitProductButton" style="margin:auto;display:  block" data-button-id="submitProduct" type="submit" data-toggle="tooltip"
                                title="Create New User" data-placement="right" class="btn btn-primary">
                                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                </button>
                                <div class="load-spinner-2" data-spinner-id="submitNewUser">
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="response" data-response-id="submitNewUser"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-md-push-2 cover-4" id="top">
                    <div class="col-sm-12">
                        <legend>User List</legend>
                    </div>
                    <div class="col-sm-12" style="margin-bottom: 10px">
                        <input type="search" class="form-control" data-input-id="userEdit" value="" required="required" placeholder="Search User by Username or Email" title="">
                    </div>
                    <div class="col-sm-12">
                        <div class="table-responsive">
                            <table class="table productEdit" data-productFetch-url = "{{URL::to('/admin')}}">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody data-body-id = "userEdit">
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
        <script src="{{ asset('js/jquery-2.1.4.min.js') }}"></script>
        <!-- Bootstrap JavaScript -->
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>
        <script src="{{ asset('js/custom.js') }}"></script>
        <script src="{{ asset('js/custom2.js') }}"></script>
    </body>
</html>