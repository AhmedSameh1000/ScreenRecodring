import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as RecordRTC from "recordrtc"
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VideoREcorderService {

  constructor(private httpclient: HttpClient) { }

  GetMeadia() {
    return this._MeadiaStream.asObservable()
  }
  private meadiastream: any
  private _MeadiaStream = new Subject<any>()
  private recorder: any
  private blob: any;
  private _blob = new Subject<any>();


  getBlob() {
    return this._blob.asObservable();
  }

  async Start() {
    debugger
    this.meadiastream = await navigator.mediaDevices.getDisplayMedia({
      audio: false,
      video: {
        displaySurface: "window",
      }

    })
    this._MeadiaStream.next(this.meadiastream)
    this.recorder = new RecordRTC(this.meadiastream, { type: "video" });
    this.recorder.startRecording();
    
    setTimeout(() => {
      debugger
      this.Stop();
      this.Downlaod();
    }, 1000);
  }


  Stop() {
    if (!this.recorder) {
      return;
    }
    this.recorder.stopRecording(() => {
      this.blob = this.recorder.getBlob();
      this._blob.next(URL.createObjectURL(this.blob));
      this.meadiastream.stop();
      this.recorder.destroy();
      this.meadiastream = null;
      this.recorder = null;
    })
  }

  Downlaod() {
    RecordRTC.invokeSaveAsDialog(this.blob, `${Date.now()}.mp4`);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Do something with the base64String, such as sending it to an API or saving it locally
      console.log(base64String);
      var base = {
        base64: base64String
      }
      console.log(base)
      this.CreateVideo(base)
    };
    reader.readAsDataURL(this.blob);

  }


  CreateVideo(str) {
    this.httpclient.post(`https://localhost:7213/api/video/Create`, str).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  GetVideos() {
    return this.httpclient.get("https://localhost:7213/api/video/GetAll")
  }
}
