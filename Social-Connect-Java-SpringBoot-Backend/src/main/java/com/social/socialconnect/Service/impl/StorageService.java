package com.social.socialconnect.Service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

@Service
public class StorageService {

	@Autowired
	private AmazonS3 s3Client;
	
	@Value("${application.bucket.name}")
	private String bucketName;
		
	private File convertMultiPartToFile(MultipartFile file )  {
		
		File convFile = new File( file.getOriginalFilename() );
		try {
		    
			FileOutputStream fos = new FileOutputStream( convFile );
	        fos.write( file.getBytes() );
	        fos.close();

		} catch (IOException e) {
           
			e.printStackTrace();
		}
		return convFile;
    }
	
	public String uploadFile(MultipartFile file) {
	   String fileName=System.currentTimeMillis()+"_"+file.getOriginalFilename();
	   File fileObj = convertMultiPartToFile(file);
	   s3Client.putObject(new PutObjectRequest(bucketName, fileName,fileObj));
	   fileObj.delete();
	   return fileName;
	}
	
	public byte[] downloadFile(String fileName) {
		S3Object s3Object = s3Client.getObject(bucketName, fileName);
		S3ObjectInputStream inputStream = s3Object.getObjectContent();
		try {
			byte[] content = IOUtils.toByteArray(inputStream);
			return content;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Boolean deleteFile(String fileName) {
		s3Client.deleteObject(bucketName,fileName);
		return true;
	}
	
//	public String getFileLink(String fileName) {
//		s3Client.
//		return null;
//	}
	
	 
	
}
