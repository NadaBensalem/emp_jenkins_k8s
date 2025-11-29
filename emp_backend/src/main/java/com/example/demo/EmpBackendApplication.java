package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// ✨ Ajout: config CORS globale via WebMvcConfigurer (dans ce même fichier)
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class EmpBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmpBackendApplication.class, args);
    }

    // ✅ CORS global: autorise toutes origines, méthodes, en-têtes (sans credentials)
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(false)   // doit rester false si origins="*"
                        .maxAge(3600);
            }
        };
    }
}
