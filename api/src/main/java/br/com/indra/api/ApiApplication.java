package br.com.indra.api;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import br.com.indra.api.entity.Usuario;
import br.com.indra.api.model.UsuarioModel;

@SpringBootApplication
public class ApiApplication {
	private UsuarioModel usuarioModel;
	
	public ApiApplication(UsuarioModel usuarioModel) {
		this.usuarioModel = usuarioModel;
	}

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}
	
	@PostConstruct
	private void init() throws Exception {
		Usuario usuario = new Usuario();
		usuario.setNome("Admin");
		usuario.setUsername("admin");
		usuario.setPassword("admin");
		usuario.setTipo("Administrador");
		
		usuarioModel.salvar(usuario);
	}

}
