import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { VideoREcorderService } from './video-recorder.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit,OnInit{
  @ViewChild("video") videoElement:ElementRef
  videoBlobUrl: any = null;
  video: any;
  constructor(private videoservices:VideoREcorderService,
    private ref:ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private Route:Router
    ){

    videoservices.GetMeadia().subscribe({
    next:(res)=>{

      this.video.srcObject=res
      this.ref.detectChanges()
      console.log(res)
    }
  })
  this.videoservices.getBlob().subscribe((data) => {
    this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data);
    this.video.srcObject = null;
    this.ref.detectChanges();
  });
    
  }
  ngOnInit(): void {
    this.LoadVideo()
  }
  ngAfterViewInit(): void {
    this.video=this.videoElement.nativeElement;
  }
  title = 'data';
  Start(){
    this.videoservices.Start();
  }

  Stop(){
    this.videoservices.Stop()

  }

  Downlaod(){
    this.videoservices.Downlaod();
  }
videos:any
  LoadVideo(){
    this.videoservices.GetVideos().subscribe({
      next:(re)=>{
        this.videos=re
        console.log(re)
      }
    })
    }
    Go(){
      this.Route.navigate(['new'])
    }
}
