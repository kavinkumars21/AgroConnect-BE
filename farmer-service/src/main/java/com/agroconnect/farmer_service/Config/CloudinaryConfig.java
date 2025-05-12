package com.agroconnect.farmer_service.Config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "difnhh5le",
                "api_key", "811598139466337",
                "api_secret", "e9QA1HHHLWxZQ2Kx8wfpBRomtw0"));
    }
}
