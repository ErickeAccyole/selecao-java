package br.com.indra.api.model;

import org.springframework.stereotype.Component;

import br.com.indra.api.config.SecurityConstants;
import br.com.indra.api.entity.Usuario;
import io.jsonwebtoken.Jwts;

@Component
public class AutorizacaoModel {
	private final UsuarioModel usuarioModel;

	public AutorizacaoModel(UsuarioModel usuarioModel) {
		this.usuarioModel = usuarioModel;
	}

	public Usuario getInfoByToken(String token) throws Exception {
		String username = Jwts.parser().setSigningKey(SecurityConstants.SECRET)
				.parseClaimsJws(token.replace(SecurityConstants.TOKEN_PREFIX, "")).getBody().getSubject();

		return usuarioModel.getUsuarioPorUsername(username);
	}

}
