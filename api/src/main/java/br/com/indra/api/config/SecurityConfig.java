package br.com.indra.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;

import br.com.indra.api.service.CustomUsuarioService;


@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private CustomUsuarioService usuarioService;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		CorsConfiguration cors = new CorsConfiguration();
		cors.addAllowedOrigin("*");
		cors.addAllowedMethod("*");
		cors.addAllowedHeader("*");
		
		http.cors().configurationSource(request -> cors)	
			.and().csrf().disable()
			.authorizeRequests()
			.antMatchers(HttpMethod.GET, SecurityConstants.SIGN_UP_URL).permitAll()
			.antMatchers("/v2/api-docs/**", "/swagger.json", "/swagger-resources/**",  "/configuration/**", "/swagger*/**", "/webjars/**").permitAll()
			.anyRequest().authenticated()
			.and()
			.addFilter(new JWTAuthentication(authenticationManager()))
			.addFilter(new JWTAuthorization(authenticationManager(), usuarioService));
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(usuarioService).passwordEncoder(new BCryptPasswordEncoder());
	}
	
	/*
	 * @Autowired public void configureGlobal(AuthenticationManagerBuilder auth)
	 * throws Exception { auth.inMemoryAuthentication()
	 * .withUser("ericke").password("{noop}123").roles("USER") .and()
	 * .withUser("admin").password("{noop}123").roles("USER", "ADMIN");
	 * 
	 * }
	 */
}	
