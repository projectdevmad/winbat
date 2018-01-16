$(document).ready(function(){
	"use strict";
	
	// Global
	$("[data-scroll]").click(function(event){
		event.preventDefault();
		var hash = $(this).attr("data-scroll");
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 800);
		return false;
	});
	
	$(".back-to-top").click(function(event){
		event.preventDefault();
		var hash = $(this).attr("href");
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 800);
		return false;
	});
	
	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
	
	// Form
	$(".select-f").each(function(){
		$(this).attr("tabindex", "-1");
		$(this).attr("ol-title", $(this).find("span").html());
		$(this).after("<div class='select-f-list'></div>");
		$(this).siblings(".select-f-list").html($(this).siblings("select").html());
		$(this).siblings(".select-f-list").find("option").click(function(){
			$(this).closest(".select-f-list").siblings(".select-f").find("span").html($(this).html());
			$(this).closest(".select-f-list").siblings("select").find("option[value='" + $(this).attr("value") + "']").attr("selected", "true");
		});
	});
	
	// Home
	if($(".home-search").length){
		$("body").addClass("no-logo");
	}else{
		$("body").removeClass("no-logo");
	}
	
	$(".home-banner .owl-carousel").owlCarousel({
        items:1,
        merge:true,
        loop:true,
        margin:0,
        video:true,
        lazyLoad:true,
        center:true,
    	autoHeight:true,
		nav:false,
		dots:true,
		mouseDrag:false,
		autoplay:true,
		animateIn:'fadeIn',
		animateOut:'fadeOut',
		autoplayTimeout:5000,
		responsive:{
			0:{
			},
			600:{
			},
			1000:{
			}
		}
	});
	
	// Product list
	$(".product-item .merchant-more .more").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().hide().siblings(".content").show();
	});
	
	$(".pie-chart > div[data-p]").each(function(){
		var scale;
		if($(this).data("s") != null){
			scale = $(this).data("s") / 5;
		}else{
			scale = 1;
		}
		
		if($(this).prev().length){
			$(this).css("transform", "rotate(" + ($(this).prev().data("l") / 100 * 360) + "deg) scale(" + scale + ")");
			$(this).data("l", $(this).prev().data("l") + $(this).data("p"));
		}else{
			$(this).data("l", $(this).data("p")).css("transform", "scale(" + scale + ")");
		}
		
		if($(this).data("p") > 50){
			$(this).children("div").css("transform", "rotate(180deg)");
			$(this).after($(this).clone().removeAttr("data-p").data("l", $(this).data("l")));
			$(this).next().css("transform", "rotate(" + ((($(this).data("l") - $(this).data("p")) / 100 * 360) + 160) + "deg)");
			$(this).next().children("div").css("transform", "rotate(" + ((($(this).data("p") - 50) / 100 * 360) + 20) + "deg)");
		}else{
			$(this).children("div").css("transform", "rotate(" + ($(this).data("p") / 100 * 360) + "deg)");
		}
		
	});
	
	$(".pie-chart").css("opacity", "1");
	
	// Add Note
	$(".color-a > input").change(function(){
		if($(this).is(':checked')){
			$(this).parent().siblings(".color-a").hide();
			$(this).parent().siblings(".cross").addClass("open");
		}
	});
	
	$(".color-item > .cross").click(function(){
		$(this).siblings(".color-a").show();
		$(this).siblings(".color-a").children("input").attr("checked", false);
		$(this).removeClass("open");
	});
	
	$(".dot-a > input").change(function(){
		if($(this).is(':checked')){
			$(this).parent().siblings(".dot-a").children("input").removeAttr("checked");
			$(this).parent().siblings(".dot-a").removeClass("active");
			$(this).parent().addClass("active");
			$(this).parent().children("input").attr("checked", "checked");
		}
	});
	
	$(".form-tag").click(function(){
		$(this).children("input").focus();
	});
	
});