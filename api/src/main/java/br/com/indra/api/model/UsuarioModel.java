package br.com.indra.api.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.indra.api.entity.Usuario;
import br.com.indra.api.repository.UsuarioRepository;
import br.com.indra.api.utils.Funcao;

@Component
public class UsuarioModel {
	private final UsuarioRepository usuarioRepository;

	@Autowired
	public UsuarioModel(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}

	public Usuario salvar(Usuario usuario) throws Exception {
		Usuario usuarioConsulta = getUsuarioPorUsername(usuario.getUsername());

		if (usuarioConsulta != null) {
			throw new Exception("Já existe usuário com mesmo login cadastrado na base de dados!");
		}
		
		if (Usuario.USUARIO_ADMINISTRADOR.equals(usuario.getTipo())) {
			usuario.setAdmin(true);
		} else {
			usuario.setAdmin(false);
		}
		
		usuario.setPassword(Funcao.passwordEncoder(usuario.getPassword()));

		usuarioRepository.save(usuario);

		return usuario;
	}

	public void remove(long usuarioId) throws Exception {
		Usuario usuario = getById(usuarioId);

		if (usuario == null) {
			throw new Exception("Erro ao remover, usuario não encontrada!");
		}

		usuarioRepository.deleteById(usuarioId);
	}

	public Usuario update(Usuario usuario) throws Exception {
		Usuario usuarioConsulta = getUsuarioPorUsername(usuario.getUsername());

		if (usuarioConsulta != null && usuarioConsulta.getId() != usuario.getId()) {
			throw new Exception("Já existe usuário com mesmo login cadastrado na base de dados!");
		}
		
		if (Usuario.USUARIO_ADMINISTRADOR.equals(usuario.getTipo())) {
			usuario.setAdmin(true);
		} else {
			usuario.setAdmin(false);
		}

		return usuarioRepository.save(usuario);
	}

	public List<Usuario> getAll() throws Exception {
		return  (List<Usuario>) usuarioRepository.findAll();
	}

	public Usuario getById(long id) throws Exception {
		return usuarioRepository.findById(id).orElse(null);
	}
	
	public Usuario getUsuarioPorUsername(String username) throws Exception {
		return usuarioRepository.findByUsername(username);
	}
	
	public Usuario updateConta(Usuario usuario) throws Exception {
		Usuario usuarioConsulta = getUsuarioPorUsername(usuario.getUsername());
		if (usuarioConsulta != null && usuarioConsulta.getId() != usuario.getId()) {
			throw new Exception("Já existe usuário com mesmo login cadastrado na base de dados!");
		}
		
		usuarioConsulta.setNome(usuario.getNome());

		return usuarioRepository.save(usuarioConsulta);
	}
	
	public Usuario updateSenha(Usuario usuario) throws Exception {
		Usuario usuarioConsulta = getById(usuario.getId());
		if (usuarioConsulta == null) {
			throw new Exception("Usuário não encontrado na base de dados!");
		}
		
		usuarioConsulta.setPassword(Funcao.passwordEncoder(usuario.getPassword()));

		return usuarioRepository.save(usuarioConsulta);
	}
}
