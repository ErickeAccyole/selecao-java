package br.com.indra.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import br.com.indra.api.entity.Usuario;
import br.com.indra.api.model.UsuarioModel;

@Component
public class CustomUsuarioService implements UserDetailsService {
	private UsuarioModel usuarioModel;
	
	@Autowired
	public CustomUsuarioService(UsuarioModel usuarioModel) {
		this.usuarioModel = usuarioModel;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException  {
			Usuario usuario = null;
			try {
				usuario = usuarioModel.getUsuarioPorUsername(username); 
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			if (usuario == null) {
				throw new UsernameNotFoundException("Usuário não encontrado!");
			}
			
			List<GrantedAuthority> authorityListAdmin = AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN");
			return new org.springframework.security.core.userdetails.User(usuario.getUsername(), usuario.getPassword(), authorityListAdmin);				
	}
}
