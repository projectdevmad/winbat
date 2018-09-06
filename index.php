<<<<<<< HEAD
<? 
print_r($_GET);
?><!doctype html>
=======
<!doctype html>
>>>>>>> 3684e81b585623973728aba3410f66033c8f9359
<html ng-app="app">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Rootstock</title>
    <link rel="stylesheet" href="./app-content/css/bootstrap.css">
    <link rel="stylesheet" href="./app-content/css/bootstrap-theme.css">
    <link rel="stylesheet" href="./app-content/css/animate.css">
    <link rel="stylesheet" href="./app-content/css/owl.carousel.min.css">
    <link rel="stylesheet" href="./app-content/css/owl.theme.default.min.css">
    <link rel="stylesheet" href="./app-content/css/utility-classes.css">
    <link rel="stylesheet" href="./app-content/css/custom-bootstrap-margin-padding.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Merriweather" rel="stylesheet">
    <link rel="stylesheet" href="./app-content/css/style.css">
    <link rel="stylesheet" href="./app-content/css/responsive.css">
    <link type="text/css" rel="stylesheet" href="./app-content/css/angular-busy.css" />
    <script src="./app-content/js/jquery-3.1.1.min.js"></script>
    <script src="./app-content/js/bootstrap.js"></script>
    <base href="/madcradle/winebat/">
</head>

<body>
    <div class="loading"></div>
    <div class="wrapper">
        <header>
            <div class="container-fluid pl-30 pl-md-15 pr-30 pr-md-15">
                <div class="collapse navbar-collapse mt-md-50 mt-sm-0" id="menu">
                    <ul class="nav navbar-nav navbar-left pt-sm-15">
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown">HKD
					<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">USD</a></li>
                                <li><a href="#">RMB</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown">EN
					<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">繁</a></li>
                                <li><a href="#">簡</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right mr-0 pb-sm-15">
                        <li><a href="#">Sign Up</a></li>
                        <li><a href="#">Login</a></li>
                        <li><a href="#/merchant">Merchants</a></li>
                        <li><a href="#/about">About Us</a></li>
                        <li><a href="#/contact">Contact Us</a></li>
                    </ul>
                </div>
                <div class="navbar-header">
                    <div class="logo text-center pt-30 pt-xs-10 mt-sm-5"><a href="./">Rootstock</a></div>
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#menu">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
            </div>
        </header>
        <div ng-view></div>
        <footer class="pb-60 pb-sm-40 pb-xs-5">
            <div class="container-fluid pl-30 pl-md-15 pr-30 pr-md-15 clearfix">
                <div class="pull-left">
                    <ul class="footer-links pl-15 pl-sm-0 pr-15 pr-sm-0">
                        <li><a href="#/contact">Contact Us</a></li>
                        <li><a href="#/about">About Us</a></li>
                        <li><a href="#">Sell My Wines</a></li>
                        <li><a href="#">Terms and Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div class="pull-right">
                    <ul class="footer-social mb-60 mb-sm-50 mb-xs-30 mr-10 mr-xs-0 pt-xs-5 text-right">
                        <li class="mr-15 ml-xs-5 mr-xs-5"><a href="#"><i class="fa fa-facebook"></i></a></li>
                        <li class="ml-xs-5 mr-xs-5"><a href="#"><i class="fa fa-instagram"></i></a></li>
                    </ul>
                    <p class="copyright mr-10 hidden-xs">Copyright
                        2017 Winebat | All rights reserved.</p>
                </div>
                <p class="copyright ml-5 visible-xs">Copyright
                    2017 Winebat | All rights reserved.</p>
            </div>
        </footer>
    </div>
    <script src="./app-content/js/owl.carousel.min.js"></script>
    <script src="./app-content/js/wow.min.js"></script>
    
    <script src="./app-content/js/bootstrap.min.js"></script>
    <script src="./app-content/js/angular.js"></script>
    <script src="./app-content/js/angular-route.js"></script>
    <script src="./app-content/js/angular-cookies.js"></script>
    <script src="./app-content/js/angular-translate.js"></script>
    <script src="./app-content/js/angular-translate-loader.js"></script>
    <script src="./app-content/js/angular-paging.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.0-beta.1/angular-sanitize.js"></script>
    <script src="./app-content/js/angular-strap.js"></script>
    <script src="./app-content/js/angular-strap.tpl.js"></script>
    <script src="./app-content/js/angular-busy.js"></script>
    
    <!-- App Core -->
    <script src="app.js"></script>
    <!-- App Service -->
    <script src="app-services/search.service.js"></script>
    <!-- App Controller -->
    <script src="./app-controller/search.controller.js"></script>
    <script src="./app-controller/home.controller.js"></script>
    <script src="./app-controller/about.controller.js"></script>
    <script src="./app-controller/contact.controller.js"></script>
    <script src="./app-controller/merchant.controller.js"></script>
    <script src="./app-controller/addMyTastingNote.controller.js"></script>
    <script src="./app-controller/product.controller.js"></script>

    
    <!-- Addition Plugin -->
<script src="./app-content/js/typeahead.js"></script>
    <script src="./app-content/js/typeahead.tpl.js"></script>
    <script src="./app-content/js/ng-infinite-scroll.js"></script>
    <script>
    new WOW().init();
	$(document).ready(function(){
	$(document).on("click", ".product-item .merchant-more .more", function(e) {
	  console.log("click");
	  e.preventDefault();
	  e.stopPropagation();
	  $(this).attr("href","javascript:void();");
	  $(this).parent().hide().siblings(".content").show();
	  return false;
	});
	})
    </script>
</body>

</html>