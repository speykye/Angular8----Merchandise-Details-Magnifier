import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('zoom', { static: true}) zoom: ElementRef;
  @ViewChild('Box', { static: true }) box: ElementRef;
  @ViewChild('bigBox', { static: true }) BigBox: ElementRef;
  @ViewChild('lay', { static: true }) Lay: ElementRef;
  @ViewChild('BoxImg', { static: true}) simg: ElementRef;
  @ViewChild('bigImg', { static: true}) bimg: ElementRef;
  
  constructor() { }
  
  toMove() {
    const lay = this.Lay.nativeElement;
    const Box = this.box.nativeElement;
    const bigBox = this.BigBox.nativeElement;
    const outer = this.zoom.nativeElement;
    const Bimg = this.bimg.nativeElement;
    const Simg = this.simg.nativeElement;

    //  设置遮罩层宽高
    lay.style.width = (Simg.offsetWidth / Bimg.offsetWidth) * bigBox.clientWidth + 'px';
    lay.style.height = (Simg.offsetHeight / Bimg.offsetHeight) * bigBox.clientHeight + 'px';

    //定义遮罩层最大边距
    const maxW = Simg.clientWidth - lay.offsetWidth;
    const maxH = Simg.clientHeight - lay.offsetHeight;

    //移入原图区域
    Box.onmouseenter = () => {
      lay.style.left = 0;
      bigBox.style.left = 210 + 'px';
    };
    
    //移出原图区域
    Box.onmouseleave = () => {
      lay.style.left = -10000 + 'px';
      bigBox.style.left = -10000 + 'px';
    }
    
    //原图区域内移动事件
    Box.onmousemove = (e) => {
      // 兼容处理
      e = e || window.event;
      
      //使鼠标始终处于遮罩层中间
      let nLeft = e.pageX - outer.offsetLeft - outer.clientLeft - lay.offsetWidth / 2;
      let nTop = e.pageY - outer.offsetTop - outer.clientTop - lay.offsetHeight / 2;
      
      //限制遮罩层活动范围始终在原图区域内
      nLeft = Math.min(maxW, Math.max(0, nLeft));
      nTop = Math.min(maxH, Math.max(0, nTop));


      //遮罩层位置
      lay.style.left = nLeft + 'px';
      lay.style.top = nTop + 'px';

      //放大图片最大移动位置，并跟随遮罩层按百分比移动
      Bimg.style.left = -(Bimg.offsetWidth - bigBox.clientWidth) * (nLeft / (Simg.clientWidth - lay.offsetWidth)) + 'px';
      Bimg.style.top = -(Bimg.offsetHeight - bigBox.clientHeight) * (nTop / (Simg.clientHeight - lay.offsetHeight)) + 'px';
    };
  }
  
  ngOninit() {}
  
  ngAfterViewInit() {
    this.toMove();
  }
  
}
