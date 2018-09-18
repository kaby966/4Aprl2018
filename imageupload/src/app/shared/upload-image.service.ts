import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UploadImageService {
  constructor(private http : HttpClient) { }

  postFile(fileToUpload: File) {
    const endpoint = 'http://localhost:7896/upload';
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    // formData.append('ImageCaption', caption);
    return this.http
      .post(endpoint, formData).pipe(map((response:Response)=>{
        return response}));
  }
  readFile():Observable<any>{
    return this.http.get('http://localhost:7896/read')
    .pipe(map((response:Response)=>{
      // console.log("######################################");
      // console.log(response);

      return response;
      // return new Blob([response["_body"]], {
      //   type: 'image/png'
      // })
    }));
  }
}
