import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor() {}
  screenWidth = 0;

  ngOnInit(): void {
    this.screenWidth = $(window).width(); 
    $(window).resize(() => {
      this.screenWidth = $(window).width();
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function() {
      if ($(window).width() < 768) {
        $(".sidebar .collapse").collapse("hide");
      }
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function(
      e
    ) {
      if ($(window).width() >= 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });


    // Smooth scrolling using jQuery easing
    $(document).on("click", "a.scroll-to-top", function(e) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top
          },
          1000,
          "easeInOutExpo"
        );
      e.preventDefault();
    });

    if(this.screenWidth < 768){
      this.toggleSideBar();
    }
  }

  toggled = false;
  toggleSideBar(){
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $(".sidebar .collapse").collapse("hide");
      this.toggled = true;
    }else{
      this.toggled = false;
    }
  }
}
