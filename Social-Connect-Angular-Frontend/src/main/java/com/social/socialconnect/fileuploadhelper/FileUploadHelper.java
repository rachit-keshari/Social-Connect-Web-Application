package com.social.socialconnect.fileuploadhelper;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import ch.qos.logback.core.net.SyslogOutputStream;

@Component
public class FileUploadHelper {
	
//	public File resource;
//	public String UPLOAD_DIR;
	
    
	public FileUploadHelper() throws IOException
	{
//		resource = new ClassPathResource("static/image/abc.txt").getFile();
//	    UPLOAD_DIR=resource.toPath().toString().substring(0, resource.toPath().toString().length() - 7);
	}
	
	public Boolean uploadFile(MultipartFile file)
	{
		Boolean flag=false;
		
		try {
		
			//read
			InputStream inputStream = file.getInputStream();
			byte data[] = new byte[inputStream.available()];
			inputStream.read(data);
			
			//write
			FileOutputStream fileOutputStream = new FileOutputStream(
					"../../../../static/image/"+File.separator+file.getOriginalFilename());
			fileOutputStream.write(data);
		    
			fileOutputStream.flush();
			fileOutputStream.close();
			flag=true;
	
			
            //using new method
//			Files.copy(
//					file.getInputStream(),
//					Paths.get(UPLOAD_DIR+File.separator+file.getOriginalFilename()),
//					StandardCopyOption.REPLACE_EXISTING);
			
		} catch (Exception e) {
		    e.printStackTrace();
		}
		
		return flag;
	}
}

