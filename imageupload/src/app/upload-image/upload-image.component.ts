import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../shared/upload-image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
  providers:[UploadImageService]
})
export class UploadImageComponent implements OnInit {
  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  image=[];
  idata=[];
  dupl=[];
  constructor(private imageService : UploadImageService) { }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    // console.log('File to upload: ',this.fileToUpload);
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    // console.log('reader ',reader.readAsText(this.fileToUpload));
  }

  OnSubmit(Image){
   this.imageService.postFile(this.fileToUpload).subscribe(
     data =>{console.log(this.fileToUpload.type);
      // console.log("######################################");
      //  console.log('done',data);
      //  Caption.value = null;
       Image.value = null;
       this.imageUrl = "/assets/img/default-image.png";
     }
   );
  }
  read(){
    this.imageService.readFile().subscribe(
      res=>{
        console.log('done',res);
        res.forEach(element => {
          // console.log(element);
        this.image.push(element); 
        });       
        this.image.forEach(element => {
          
        console.log('Image: ',element._id);
        this.idata.push("data:image/jpeg;base64,"+element.Image.data);
        // this.idata.forEach(ele => {
        // if (ele!=element.Image.data) {
        //   this.dupl.push("data:image/jpeg;base64,"+element.Image.data)
        // }
        // });
        
        });
        // console.log('Image: ',this.idata);
        // this.idata="data:image/jpeg;base64,"+// console.log('Image: ',this.image[0].Image.data);
      }
    );
  }

}
