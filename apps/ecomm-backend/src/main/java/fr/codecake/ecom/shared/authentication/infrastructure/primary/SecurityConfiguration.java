package fr.codecake.ecom.shared.authentication.infrastructure.primary;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;


@Configuration
@EnableMethodSecurity
@EnableWebSecurity
public class SecurityConfiguration {

    public SecurityFilterChain configure(HttpSecurity http ) throws Exception {
        http.authorizeHttpRequests(authorize ->
            authorize
                .requestMatchers("/api/**").authenticated())
            .csrf(AbstractHttpConfigurer::disable)
            .oauth2ResourceServer(
                oauth2 -> oauth2.jwt( jwt -> jwt.jwtAuthenticationConverter(new KindeJwtAuthenticationConverter())));
            return http.build();  
    }
}
