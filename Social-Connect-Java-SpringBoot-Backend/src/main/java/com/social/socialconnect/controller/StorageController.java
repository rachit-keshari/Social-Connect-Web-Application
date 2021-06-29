package com.social.socialconnect.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

import javax.imageio.ImageIO;
import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.social.socialconnect.Service.impl.StorageService;

@RestController
@RequestMapping("/user")
public class StorageController {

	@Autowired
	private StorageService storageService;
	
	@PostMapping("/upload")
	public String uploadFile(@RequestParam(value="file") MultipartFile file) {
		return this.storageService.uploadFile(file);
	}
	
	@GetMapping("/download/{fileName}")
	public ResponseEntity<?> downloadFile(@PathVariable String fileName) {
		byte[] data = this.storageService.downloadFile(fileName);
		ByteArrayResource resource = new ByteArrayResource(data);
		return ResponseEntity
				.ok()
				.contentLength(data.length)
				.header("content-type","image/jpg")
				.header("content-type","image/jpeg")
				.header("content-disposition","inline; filename=\""+fileName+"\"")
				.body(resource);
	}
	
	@DeleteMapping("/delete/{fileName}")
	public Boolean deleteFile(@PathVariable String fileName) {
		return this.storageService.deleteFile(fileName);
	}
	
}
